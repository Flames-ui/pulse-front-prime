import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateSlug } from '@/lib/utils';

/**
 * Endpoint to save post from AI Generator
 * Handles slug uniqueness and metadata enrichment.
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    if (!data.title) {
      return NextResponse.json({ error: 'Blueprint title required' }, { status: 400 });
    }

    // 1. Enforce Slug Rules & Uniqueness
    let finalSlug = generateSlug(data.slug || data.title);
    
    const { data: existing } = await supabase.from('posts').select('id').eq('slug', finalSlug).maybeSingle();
    if (existing) {
      finalSlug = `${finalSlug}-guide`;
      const { data: existing2 } = await supabase.from('posts').select('id').eq('slug', finalSlug).maybeSingle();
      if (existing2) {
        finalSlug = `${finalSlug}-2026`;
      }
    }

    // 2. Prepare Post Payload
    const postData = {
      title: data.title,
      slug: finalSlug,
      content: data.content,
      excerpt: data.excerpt,
      meta_description: data.metaDescription || data.excerpt,
      featured_image: data.featured_image,
      featured_image_alt: data.featured_image_alt || `${data.title} — Giant Pulse`,
      status: data.status || 'draft',
      category: data.category || 'Strategy',
      author_name: 'Agbasionwe Emmanuel Chiemelie',
      canonical_url: `https://giantpulse.name.ng/blog/${finalSlug}`,
      focus_keyword: data.focus_keyword || data.keyword || '',
      published_at: data.status === 'published' ? (data.published_at || new Date().toISOString()) : null,
      updated_at: new Date().toISOString()
    };

    // 3. Insert into Supabase
    const { data: inserted, error } = await supabase.from('posts').insert(postData).select().single();
    if (error) throw error;

    // 4. Handle FAQs
    if (data.faqs && Array.isArray(data.faqs)) {
      const faqsData = data.faqs.map((f: any, i: number) => ({
        post_id: inserted.id,
        question: f.question,
        answer: f.answer,
        order_index: i
      }));
      const { error: faqError } = await supabase.from('faqs').insert(faqsData);
      if (faqError) console.error('FAQ Insert Error:', faqError);
    }

    return NextResponse.json(inserted);

  } catch (error: any) {
    console.error('Save Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}