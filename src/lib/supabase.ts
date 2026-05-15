import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fuxhogfuletxfuidlizv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1eGhvZ2Z1bGV0eGZ1aWRsaXp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMDY4NDIsImV4cCI6MjA4NTc4Mjg0Mn0.0JcTr3OT5SKAyXIFmRGwl6rkS2S1CgvVxwrK8-Sg16o';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fullTextSearch(query: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .eq('status', 'published')
    .order('published_date', { ascending: false });

  return { data, error };
}

export async function incrementViewCount(slug: string) {
  try {
    const { data } = await supabase.from('posts').select('viewCount').eq('slug', slug).single();
    if (data) {
       await supabase.from('posts').update({ viewCount: data.viewCount + 1 }).eq('slug', slug);
    }
    return data;
  } catch (e) {
    console.error('View tracking failed:', e);
  }
}

export async function getLatestPosts(limit = 20) {
  return await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false })
    .limit(limit);
}