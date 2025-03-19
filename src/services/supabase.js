import { createClient } from "@supabase/supabase-js";

/* Supabase project URL */
export const supabaseUrl = import.meta.env.VITE_APP_URL;

/* Supabase Anon Key */
const supabaseKey = import.meta.env.VITE_APP_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
