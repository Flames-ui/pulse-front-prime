"use client";

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTagBySlug, getPostsByTag } from '@/lib/data';
import { Post, Tag } from '@/lib/types';
import { PostCard } from '@/components/blog/PostCard';
import { SEO } from '@/components/blog/SEO';
import { ChevronLeft, ChevronRight, Hash, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TagPage = () => {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const slug = params?.slug as string;
  const [tag, setTag] = useState<Tag | null>(null);
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
          const { posts: fetchedPosts, total } = await getPostsByTag(slug, page, postsPerPage);
          setPosts(fetchedPosts);
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
        <p className="text-gray-500 mb-8">The tag you are looking for does not exist or has no posts.</p>
        <Button asChild>
          <Link to="/blog">BACK TO ALL BLUEPRINTS</Link>
        </Button>
      </div>
    );
  }

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title={`Posts Tagged with #${tag.name}`}
        description={`Explore all high-performance strategies tagged with ${tag.name} on Giant Pulse.`}
        type="collection"
      />

      {/* Hero Header */}
      <div className="bg-[#0A0F1E] text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/5 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-[#0066FF] font-black uppercase tracking-[0.4em] text-[10px] mb-4 flex items-center gap-2">
                <Hash className="w-3 h-3" /> TAG ARCHIVE
              </p>
              <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">
                #{tag.name}
              </h1>
              <p className="text-gray-400 text-xl font-medium leading-relaxed">
                Aggregated blueprints and strategies covering <span className="text-white">{tag.name}</span>. Optimized for giant growth and digital mastery.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 border border-white/10 shrink-0 hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0066FF] mb-2">TAGGED GUIDES</p>
              <p className="text-4xl font-black italic">{totalPosts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Results Info */}
        <div className="py-8 flex justify-between items-center border-b border-gray-100 mb-12">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            FILTERED RESULTS: <span className="text-[#0A0F1E]">{totalPosts}</span>
          </p>
          <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest h-auto p-0 hover:bg-transparent hover:text-[#0066FF]">
             <Link to="/blog">CLEAR FILTERS ×</Link>
          </Button>
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
            <h3 className="text-3xl font-black uppercase italic mb-4">NO ARCHIVES FOUND</h3>
            <p className="text-gray-400 font-medium">No blueprints have been tagged with this keyword yet.</p>
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