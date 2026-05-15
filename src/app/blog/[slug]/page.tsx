import React from 'react';
import { MOCK_POSTS } from '@/lib/data';
import { SEO } from '@/components/blog/SEO';
import { BlogContent } from '@/components/blog/BlogComponents';
import { CommentsSection } from '@/components/blog/Comments';
import { InternalLinker } from '@/components/blog/InternalLinker';
import { CEO_NAME, CEO_AVATAR } from '@/lib/data';
import { Calendar, Clock, User, Eye, ArrowLeft, ArrowRight, Zap, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = MOCK_POSTS.find(p => p.slug === params.slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.featuredImage }],
      type: 'article',
    },
  };
}

export default function SinglePostPage({ params }: { params: { slug: string } }) {
  const post = MOCK_POSTS.find(p => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = MOCK_POSTS.filter(p => p.slug !== params.slug && p.category === post.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans pt-24">
      {/* Progress Bar (Client Component would be better, but we keep it simple here) */}
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <Link href="/" className="hover:text-[#0066FF]">HOME</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-[#0066FF]">ARCHIVES</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="truncate text-[#0066FF]">{post.title}</span>
        </div>
      </div>

      <article className="pb-24">
        <header className="bg-[#0A0F1E] text-white pt-12 pb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <Badge className="bg-[#0066FF] text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-none border-none mb-6">HIGH PERFORMANCE ENGINE</Badge>
            <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-12">{post.title}</h1>
            
            <div className="flex flex-wrap gap-6 items-center font-black uppercase text-[9px] tracking-widest text-gray-400">
              <span className="flex items-center gap-2"><User className="w-3 h-3 text-[#0066FF]" /> {post.author}</span>
              <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-[#FF6B00]" /> {post.publishedDate}</span>
              <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-[#0066FF]" /> {post.readTime}</span>
              <span className="flex items-center gap-2"><Eye className="w-3 h-3 text-[#FF6B00]" /> {post.viewCount.toLocaleString()} VIEWS</span>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="overflow-hidden border-[8px] border-white shadow-2xl mb-12">
                <img src={post.featuredImage} alt={post.altText} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              
              <div className="blog-content">
                <InternalLinker content={post.content} posts={MOCK_POSTS} currentSlug={post.slug} />
              </div>

              <div className="mt-20 border-t-8 border-[#0A0F1E] pt-12">
                <h3 className="text-2xl font-black uppercase italic mb-8">COMMENTS MODERATION</h3>
                <CommentsSection postId={post.id} />
              </div>
            </div>

            <aside className="lg:w-1/3">
              <div className="sticky top-32 space-y-12">
                <div className="bg-[#0A0F1E] p-10 text-white border-b-8 border-[#FF6B00]">
                  <Zap className="w-10 h-10 text-[#FF6B00] mb-6" />
                  <h4 className="text-2xl font-black uppercase italic mb-4">JOIN THE PULSE</h4>
                  <p className="text-[10px] text-gray-500 mb-8 font-black uppercase tracking-widest">WEEKLY BLUEPRINTS FOR GIANT GROWTH.</p>
                  <Button className="w-full bg-[#0066FF] h-14 rounded-none font-black italic uppercase">ENGAGE ENGINE</Button>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-widest mb-8 border-b-4 border-[#0A0F1E] pb-4">RELATED BLUEPRINTS</h4>
                  <div className="space-y-8">
                    {relatedPosts.map(p => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="flex gap-4 group">
                        <div className="w-20 h-20 shrink-0 border-2 border-gray-100 overflow-hidden">
                          <img src={p.featuredImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="text-[8px] font-black uppercase text-[#FF6B00] mb-1">{p.category}</p>
                          <h5 className="font-black uppercase text-xs leading-tight group-hover:text-[#0066FF] transition-colors">{p.title}</h5>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}