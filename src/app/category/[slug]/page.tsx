import React from 'react';
import { MOCK_POSTS, CATEGORIES } from '@/lib/data';
import { PostCard } from '@/components/blog/PostCard';
import { Zap, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find(c => c.slug === params.slug);
  if (!category) return {};
  return {
    title: `${category.name} Archives`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find(c => c.slug === params.slug);
  if (!category) notFound();

  const posts = MOCK_POSTS.filter(p => p.category.toLowerCase() === params.slug.toLowerCase() || p.category === category.name);

  return (
    <div className="min-h-screen pb-20 pt-24">
      <div className="bg-[#0A0F1E] text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#FF6B00] font-black uppercase tracking-[0.4em] text-[10px] mb-4">CATEGORY ARCHIVE</p>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">{category.name}</h1>
          <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-3xl">{category.description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white shadow-xl p-4 flex gap-2 overflow-x-auto no-scrollbar border-b-4 border-[#0066FF]">
          <Button asChild variant="outline" className="rounded-none font-black uppercase text-[10px] tracking-widest h-12 px-6 shrink-0">
            <Link href="/blog">ALL</Link>
          </Button>
          {CATEGORIES.map(cat => (
            <Button
              key={cat.slug}
              asChild
              variant={params.slug === cat.slug ? 'default' : 'outline'}
              className={`rounded-none font-black uppercase text-[10px] tracking-widest h-12 px-6 shrink-0 ${params.slug === cat.slug ? 'bg-[#0066FF] text-white' : ''}`}
            >
              <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
            </Button>
          ))}
        </div>

        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-32 text-center bg-gray-50">
            <Zap className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase italic mb-4">NO ARCHIVES FOUND</h3>
            <p className="text-gray-400 font-medium">Systems could not locate blueprints in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}