import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { INITIAL_MEMORIES } from '../data/initialMemories';
import { APP_CONFIG } from '../config/appConfig';

const DELETED_STORAGE_KEY = 'abhimanyu_deleted_memory_ids';

function getDeletedIds() {
  try {
    const raw = localStorage.getItem(DELETED_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addDeletedId(id) {
  try {
    const list = getDeletedIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(list));
    }
  } catch (e) {
    console.warn('Could not save deleted memory id to localStorage:', e);
  }
}

function removeDeletedId(id) {
  try {
    const list = getDeletedIds().filter((existingId) => existingId !== id);
    localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Could not update deleted memory ids in localStorage:', e);
  }
}

/**
 * Custom hook to manage memory photographs.
 * Combines static curated memories with dynamic Supabase uploaded memories.
 * Gracefully operates in static-fallback mode if Supabase is not yet configured.
 * Persists deletions locally so deleted memories never return upon page refresh.
 */
export function useMemories() {
  const [memories, setMemories] = useState(() => {
    const deleted = getDeletedIds();
    return INITIAL_MEMORIES.filter((m) => !deleted.includes(m.id));
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch memories from Supabase if configured
  const fetchUploadedMemories = useCallback(async () => {
    const deleted = getDeletedIds();

    if (!isSupabaseConfigured || !supabase) {
      setMemories(INITIAL_MEMORIES.filter((m) => !deleted.includes(m.id)));
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from(APP_CONFIG.storage.tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      const combined = data && data.length > 0 ? [...data, ...INITIAL_MEMORIES] : [...INITIAL_MEMORIES];

      // Deduplicate by id and filter out any deleted memories
      const seen = new Set();
      const filtered = [];
      for (const item of combined) {
        if (item && item.id && !seen.has(item.id) && !deleted.includes(item.id)) {
          seen.add(item.id);
          filtered.push(item);
        }
      }

      setMemories(filtered);
    } catch (err) {
      console.error('Error fetching memories from Supabase:', err);
      setError(err.message || 'Failed to load uploaded memories');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUploadedMemories();
  }, [fetchUploadedMemories]);

  /**
   * Upload an image to Supabase Storage and insert metadata row
   * Validates file size and MIME type strictly on client before sending.
   */
  const uploadMemory = async (file, caption = '') => {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error(
        'Supabase is not configured yet. Please configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.'
      );
    }

    // 1. Client-side MIME type validation
    if (!APP_CONFIG.storage.allowedMimeTypes.includes(file.type)) {
      throw new Error(
        `Invalid file type (${file.type}). Allowed formats: JPEG, PNG, WebP.`
      );
    }

    // 2. Client-side File size validation
    if (file.size > APP_CONFIG.storage.maxFileSizeBytes) {
      const maxMb = APP_CONFIG.storage.maxFileSizeBytes / (1024 * 1024);
      throw new Error(
        `File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed is ${maxMb}MB.`
      );
    }

    // 3. Generate sanitized unique storage path
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const storagePath = `memories/${uniqueId}.${fileExt}`;

    // 4. Upload to storage bucket
    const { error: uploadError } = await supabase.storage
      .from(APP_CONFIG.storage.bucketName)
      .upload(storagePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) throw uploadError;

    // 5. Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(APP_CONFIG.storage.bucketName)
      .getPublicUrl(storagePath);

    const publicUrl = publicUrlData?.publicUrl || '';

    // 6. Insert metadata row into public.memories
    const { data: insertData, error: insertError } = await supabase
      .from(APP_CONFIG.storage.tableName)
      .insert([
        {
          storage_path: storagePath,
          public_url: publicUrl,
          caption: caption.trim() || null,
        },
      ])
      .select()
      .single();

    if (insertError) throw insertError;

    // 7. Refresh memories list
    await fetchUploadedMemories();
    return insertData;
  };

  /**
   * Delete a memory photograph by id.
   * Persists immediately to localStorage and removes from local state,
   * then deletes from Supabase if configured.
   */
  const deleteMemory = async (id) => {
    const target = memories.find((m) => m.id === id);
    if (!target) return null;

    // 1. Persist immediately to localStorage so refresh never restores it
    addDeletedId(id);

    // 2. Remove optimistically from local state
    setMemories((prev) => prev.filter((m) => m.id !== id));

    // 3. Delete from Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error: dbError } = await supabase
          .from(APP_CONFIG.storage.tableName)
          .delete()
          .eq('id', id);

        if (dbError) {
          console.warn('Supabase DB delete warning (check RLS policy):', dbError);
        }

        if (target.storage_path) {
          const { error: storageError } = await supabase.storage
            .from(APP_CONFIG.storage.bucketName)
            .remove([target.storage_path]);

          if (storageError) {
            console.warn('Supabase Storage delete warning (check RLS policy):', storageError);
          }
        }
      } catch (err) {
        console.error('Error deleting memory from Supabase:', err);
      }
    }

    return target;
  };

  /**
   * Restore a previously deleted memory (undo functionality).
   */
  const restoreMemory = async (memory) => {
    if (!memory) return;

    // 1. Remove from localStorage deletion blacklist
    removeDeletedId(memory.id);

    // 2. Restore to local state
    setMemories((prev) => [memory, ...prev]);

    // Restore to Supabase if configured
    if (isSupabaseConfigured && supabase && memory.storage_path) {
      try {
        await supabase
          .from(APP_CONFIG.storage.tableName)
          .insert([
            {
              id: memory.id,
              storage_path: memory.storage_path,
              public_url: memory.public_url,
              caption: memory.caption,
              created_at: memory.created_at,
            },
          ]);
      } catch (err) {
        console.error('Error restoring memory to Supabase:', err);
      }
    }
  };

  return {
    memories,
    loading,
    error,
    uploadMemory,
    deleteMemory,
    restoreMemory,
    refreshMemories: fetchUploadedMemories,
    isConfigured: isSupabaseConfigured,
  };
}

export default useMemories;
