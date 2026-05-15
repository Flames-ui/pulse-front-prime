import React from 'react';
import { MOCK_POSTS } from '@/lib/data';
import { PostCard } from '@/components/blog/PostCard';
import { Zap, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  return {
    title: `Posts Tagged with #${params.slug}`,
    description: `Explore all high-performance strategies tagged with ${params.slug} on Giant Pulse.`,
  };
}

export default function TagPage({ params }: { params: { slug: string } }) {
  const tag = params.slug;
  const posts = MOCK_POSTS.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));

  return (
    <div className="min-h-screen pb-20 pt-24">
      <div className="bg-[#0A0F1E] text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#0066FF] font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2">
            <Hash className="w-3 h-3" /> TAG ARCHIVE
          </p>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">#{tag}</h1>
          <p className="text-gray-400 text-xl font-medium leading-relaxed">Aggregated blueprints covering <span className="text-white">{tag}</span>. Optimized for growth.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="py-8 flex justify-between items-center border-b border-gray-100 mb-12">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">FILTERED RESULTS: <span className="text-[#0A0F1E]">{posts.length}</span></p>
          <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest h-auto p-0 hover:bg-transparent hover:text-[#0066FF]">
             <Link href="/blog">CLEAR FILTERS \u00d7</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-32 text-center bg-gray-50">
            <Zap className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase italic mb-4">NO ARCHIVES FOUND</h3>
          </div>
        )}
      </div>
    </div>
  );
}