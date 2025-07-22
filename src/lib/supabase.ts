'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vvvlcyoexbsihppkcyzp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dmxjeW9leGJzaWhwcGtjenpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk4NTMwMTAsImV4cCI6MjAzNTQyOTAxMH0.2Yq3eTqte33sJ38ENu2oZJ1n-bQ26sS4a5vL5yKUyQs'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and anon key are required.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
