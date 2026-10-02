import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { INITIAL_MEMORIES } from '../data/initialMemories';
import { APP_CONFIG } from '../config/appConfig';

/**
 * Custom hook to manage memory photographs.
 * Combines static curated memories with dynamic Supabase uploaded memories.
 * Gracefully operates in static-fallback mode if Supabase is not yet configured.
 */
export function useMemories() {
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch memories from Supabase if configured
  const fetchUploadedMemories = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from(APP_CONFIG.storage.tableName)
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      if (data && data.length > 0) {
        // Merge Supabase memories with initial static memories
        setMemories([...data, ...INITIAL_MEMORIES]);
      }
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
   * Removes optimistically from local state and deletes from Supabase if configured.
   */
  const deleteMemory = async (id) => {
    const target = memories.find((m) => m.id === id);
    if (!target) return null;

    // Optimistic local state removal
    setMemories((prev) => prev.filter((m) => m.id !== id));

    // Delete from Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from(APP_CONFIG.storage.tableName)
          .delete()
          .eq('id', id);

        if (target.storage_path) {
          await supabase.storage
            .from(APP_CONFIG.storage.bucketName)
            .remove([target.storage_path]);
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

    // Restore to local state
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
