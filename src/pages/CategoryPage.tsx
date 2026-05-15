"use client";

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCategoryBySlug, getPostsByCategory, CATEGORIES } from '@/lib/data';
import { Post, Category } from '@/lib/types';
import { PostCard } from '@/components/blog/PostCard';
import { SEO } from '@/components/blog/SEO';
import { ChevronLeft, ChevronRight, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CategoryPage = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const [mounted, setMounted] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);
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
        const catData = await getCategoryBySlug(slug);
        if (catData) {
          setCategory(catData);
          // FIXED: getPostsByCategory only accepts categoryName, returns { posts, total }
          const { posts: fetchedPosts, total } = await getPostsByCategory(catData.name);
          
          // Apply pagination locally
          const startIndex = (page - 1) * postsPerPage;
          const paginatedPosts = fetchedPosts.slice(startIndex, startIndex + postsPerPage);
          
          setPosts(paginatedPosts);
          setTotalPosts(total);
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
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

  if (!category) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Zap className="w-16 h-16 text-gray-200 mb-6" />
        <h1 className="text-4xl font-black uppercase italic mb-4">CATEGORY NOT FOUND</h1>
        <p className="text-gray-500 mb-8">The category you are looking for does not exist or has been moved.</p>
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
        title={`${category.name} Archives`}
        description={category.description || `Explore our complete library of high-performance strategies for ${category.name}.`}
        type="collection"
        category={category.name}
      />

      {/* Hero Header */}
      <div className="bg-[#0A0F1E] text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-[100px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <p className="text-[#FF6B00] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                CATEGORY ARCHIVE
              </p>
              <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">
                {category.name}
              </h1>
              <p className="text-gray-400 text-xl font-medium leading-relaxed">
                {category.description}
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 border border-white/10 shrink-0 hidden md:block">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6B00] mb-2">BLUEPRINTS IN STOCK</p>
              <p className="text-4xl font-black italic">{totalPosts}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Category Navigation Bar */}
        <div className="bg-white shadow-xl -mt-8 p-4 flex gap-2 overflow-x-auto no-scrollbar border-b-4 border-[#0066FF]">
          <Button
            asChild
            variant="outline"
            className="rounded-none font-black uppercase text-[10px] tracking-widest h-12 px-6 shrink-0"
          >
            <Link to="/blog">ALL</Link>
          </Button>
          {CATEGORIES.map(cat => (
            <Button
              key={cat.slug}
              asChild
              variant={slug === cat.slug ? 'default' : 'outline'}
              className={`rounded-none font-black uppercase text-[10px] tracking-widest h-12 px-6 shrink-0 ${slug === cat.slug ? 'bg-[#0066FF] text-white' : ''}`}
            >
              <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
            </Button>
          ))}
        </div>

        {/* Results Info */}
        <div className="py-12 flex justify-between items-center border-b border-gray-100 mb-12">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            DISPLAYING <span className="text-[#0A0F1E]">{posts.length}</span> OF <span className="text-[#0A0F1E]">{totalPosts}</span> RESULTS
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
            <h3 className="text-3xl font-black uppercase italic mb-4">NO ARCHIVES FOUND</h3>
            <p className="text-gray-400 font-medium">Systems could not locate blueprints in this category yet.</p>
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

export default CategoryPage;
