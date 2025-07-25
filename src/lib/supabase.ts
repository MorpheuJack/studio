'use client';

import { createClient } from '@supabase/supabase-js';

// As chaves de acesso ao Supabase foram movidas para variáveis de ambiente
// para garantir a segurança e a correta configuração.
const supabaseUrl = 'https://zgfurgyefeosqcgmjfeu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnZnVyZ3llZmVvc3FjZ21qZmV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MTIxOTQsImV4cCI6MjA2NDM4ODE5NH0.LQ2iJVwVTJdMZnIYLKJGMywts5ZRrlDo09Hdnlw9MCs';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('As variáveis de ambiente NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY são obrigatórias.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
