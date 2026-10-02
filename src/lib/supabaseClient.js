import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration.
 * Reads public anonymous credentials from Vite environment variables.
 * Safe fallback is provided if credentials have not yet been supplied.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl.trim() && supabaseAnonKey.trim()
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
