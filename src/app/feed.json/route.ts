import { getLatestPosts } from '@/lib/supabase';

export async function GET() {
  const { data: posts } = await getLatestPosts(20);

  if (!posts) {
    return new Response('No posts found', { status: 404 });
  }

  const baseUrl = 'https://giantpulse.name.ng';
  
  const jsonFeed = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Giant Pulse",
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/feed.json`,
    description: "Master Your Digital Engine with High-Performance Blueprints.",
    items: posts.map(post => ({
      id: post.slug,
      url: `${baseUrl}/blog/${post.slug}`,
      title: post.title,
      content_html: post.content,
      summary: post.excerpt,
      date_published: new Date(post.published_date).toISOString(),
      author: {
        name: post.author
      }
    }))
  };

  return new Response(JSON.stringify(jsonFeed, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}