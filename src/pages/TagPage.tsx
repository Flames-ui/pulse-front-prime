"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTagBySlug, getPostsByTag, CATEGORIES } from '@/lib/data';
import { Post } from '@/lib/types';
import { PostCard } from '@/components/blog/PostCard';
import { SEO } from '@/components/blog/SEO';
import { ChevronLeft, ChevronRight, Zap, Loader2, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TagPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [mounted, setMounted] = useState(false);
  const [tag, setTag] = useState<{ name: string; slug: string } | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 9;

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const tagData = await getTagBySlug(slug);
        if (tagData) {
          setTag(tagData);
          // FIXED: getPostsByTag only accepts tagSlug, returns { posts, total }
          const { posts: fetchedPosts, total } = await getPostsByTag(slug);
          
          // Apply pagination locally
          const startIndex = (page - 1) * postsPerPage;
          const paginatedPosts = fetchedPosts.slice(startIndex, startIndex + postsPerPage);
          
          setPosts(paginatedPosts);
          setTotalPosts(total);
        }
      } catch (error) {
        console.error('Error fetching tag data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, page]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#0066FF] animate-spin" />
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Zap className="w-16 h-16 text-gray-200 mb-6" />
        <h1 className="text-4xl font-black uppercase italic mb-4">TAG NOT FOUND</h1>
        <p className="text-gray-500 mb-8">The tag you are looking for does not exist or has been removed.</p>
        <Button asChild>
          <Link href="/blog">BACK TO ALL BLUEPRINTS</Link>
        </Button>
      </div>
    );
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title={`#${tag.name} Articles`}
        description={`Explore all articles tagged with #${tag.name}. High-performance content strategies and digital growth insights.`}
        type="collection"
      />

      {/* Hero Header */}
      <div className="bg-[#0A0F1E] text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-[#FF6B00] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                TAG ARCHIVE
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Hash className="w-12 h-12 text-[#FF6B00]" />
                <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                  {tag.name}
                </h1>
              </div>
              <p className="text-gray-400 text-xl font-medium leading-relaxed">
                Exploring everything related to #{tag.name} — strategies, insights, and actionable guides.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 border border-white/10 shrink-0 hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6B00] mb-2">ARTICLES TAGGED</p>
              <p className="text-4xl font-black italic">{totalPosts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Results Info */}
        <div className="py-12 flex justify-between items-center border-b border-gray-100 mb-12">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            DISPLAYING <span className="text-[#0A0F1E]">{posts.length}</span> OF <span className="text-[#0A0F1E]">{totalPosts}</span> RESULTS FOR <span className="text-[#FF6B00]">#{tag.name}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">SORT:</span>
            <span className="text-[10px] font-black uppercase text-[#0A0F1E]">LATEST FIRST</span>
          </div>
        </div>

        {/* Post Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-gray-50">
            <Zap className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase italic mb-4">NO ARTICLES FOUND</h3>
            <p className="text-gray-400 font-medium">No blueprints tagged with #{tag.name} yet.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-4">
            <Button 
              variant="outline" 
              className="rounded-none w-14 h-14 border-2"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-3">
              {[...Array(totalPages)].map((_, i) => (
                <Button 
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`rounded-none w-14 h-14 font-black ${page === i + 1 ? 'bg-[#0A0F1E] text-white' : 'bg-transparent border-2 text-[#0A0F1E] hover:bg-gray-50'}`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="rounded-none w-14 h-14 border-2"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagPage;
