import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * Download external image and upload to Supabase Storage
 * Or upload base64 image data
 */
export async function POST(req: Request) {
  try {
    const { imageUrl, slug, isBase64 } = await req.json();

    if (!imageUrl || !slug) {
      return NextResponse.json({ error: 'Image URL and slug required' }, { status: 400 });
    }

    let buffer: Buffer;
    let contentType = 'image/png';

    if (isBase64) {
      const base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
      contentType = imageUrl.split(';')[0].split(':')[1] || 'image/png';
    } else {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image from source');
      const arrayBuffer = await response.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      contentType = response.headers.get('content-type') || 'image/jpeg';
    }

    const fileExt = contentType.split('/')[1] || 'png';
    const filePath = `blog-images/${slug}/featured.${fileExt}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('media')
      .upload(filePath, buffer, {
        contentType,
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return NextResponse.json({ publicUrl });

  } catch (error: any) {
    console.error('Image Processing Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}