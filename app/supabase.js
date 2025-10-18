import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uizxwrbuvfqrafmcfnak.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpenh3cmJ1dmZxcmFmbWNmbmFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA3OTAxNTUsImV4cCI6MjA3NjM2NjE1NX0.1DQjhyS36rSwS5-Wq__KehefSLxz77YqkVfleaWVFQY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
