import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://meppclqbvtjeslczpvdk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lcHBjbHFidnRqZXNsY3pwdmRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMzA3NzIsImV4cCI6MjA3MTcwNjc3Mn0.O0kVa9kVqKaITiiMGPBxAqqZEHBgXOpV59lUk-wMTkQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
