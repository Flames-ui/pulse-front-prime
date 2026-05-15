import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');
  const slug = searchParams.get('slug');

  if (!query && !slug) return NextResponse.json({ error: 'Query or slug required' }, { status: 400 });

  const results: any[] = [];

  try {
    // 1. Wikimedia Commons
    if (query) {
      const wikiRes = await fetch(`https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url|size|mime&format=json&gsrlimit=6`);
      const wikiData = await wikiRes.json();
      if (wikiData.query?.pages) {
        Object.values(wikiData.query.pages).forEach((page: any) => {
          const info = page.imageinfo?.[0];
          if (info && info.width >= 1200 && (info.mime === 'image/jpeg' || info.mime === 'image/png')) {
            results.push({ url: info.url, source: 'Wikimedia' });
          }
        });
      }
    }

    // 2. OpenVerse (if results < 3)
    if (results.length < 3 && query) {
      const ovRes = await fetch(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&license_type=commercial&aspect_ratio=wide&size=large`);
      const ovData = await ovRes.json();
      if (ovData.results) {
        ovData.results.slice(0, 6 - results.length).forEach((img: any) => {
          results.push({ url: img.url, source: 'OpenVerse' });
        });
      }
    }

    // 3. Lorem Picsum (seed by slug)
    if (slug) {
      results.push({ 
        url: `https://picsum.photos/seed/${slug}/1200/630`, 
        source: 'Picsum (Seed)' 
      });
    }
    
    // Always add random picsum as ultimate fallback
    results.push({ 
      url: 'https://picsum.photos/1200/630', 
      source: 'Picsum (Random)' 
    });

    return NextResponse.json({ results: results.slice(0, 6) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}