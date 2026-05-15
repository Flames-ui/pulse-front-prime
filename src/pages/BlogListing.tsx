"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MOCK_POSTS, CATEGORIES } from '@/lib/data';
import { PostCard } from '@/components/blog/PostCard';
import { SEO } from '@/components/blog/SEO';
import { Search, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const BlogListing = () => {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  
  // Extract slug from pathname if it's a category or tag page
  const slug = pathname.split('/').pop() || '';
  const isCategoryPage = pathname.startsWith('/category');
  const isTagPage = pathname.startsWith('/tag');

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentCategory = useMemo(() => {
    if (isCategoryPage && slug) {
      return CATEGORIES.find(c => c.slug === slug)?.name || slug;
    }
    return 'All';
  }, [slug, isCategoryPage]);

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFilter = true;
      if (isCategoryPage && slug) {
        matchesFilter = post.category.toLowerCase() === slug.toLowerCase() || 
                        CATEGORIES.find(c => c.slug === slug)?.name === post.category;
      } else if (isTagPage && slug) {
        matchesFilter = post.tags.some(t => t.toLowerCase() === slug.toLowerCase());
      }
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, slug, isCategoryPage, isTagPage]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title={isCategoryPage ? `${currentCategory} Archives` : isTagPage ? `Posts tagged with #${slug}` : "The Vault | Content Strategy Archives"}
        description={`Explore our complete library of high-performance strategies ${isCategoryPage ? 'for ' + currentCategory : ''}.`}
      />

      {/* Header Section */}
      <div className="bg-[#0A0F1E] text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#FF6B00] font-black uppercase tracking-[0.4em] text-[10px] mb-4">
            {isCategoryPage ? 'CATEGORY ARCHIVE' : isTagPage ? 'TAG ARCHIVE' : 'THE VAULT'}
          </p>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">
            {isCategoryPage ? currentCategory : isTagPage ? `#${slug}` : 'ALL BLUEPRINTS'}
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl font-medium leading-relaxed">
            Complete library of strategies for bloggers, creators, and SEO professionals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Search & Filter Bar */}
        <div className="bg-white shadow-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-6 items-center border-b-8 border-[#0066FF]">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              placeholder="SEARCH ARCHIVES..." 
              className="pl-16 h-16 bg-gray-50 border-none text-xl font-black uppercase italic rounded-none focus-visible:ring-[#0066FF]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3 overflow-x-auto w-full lg:w-auto no-scrollbar">
            <Button
              asChild
              variant={!isCategoryPage ? 'default' : 'outline'}
              className={`rounded-none font-black uppercase text-[10px] tracking-widest h-16 px-8 ${!isCategoryPage ? 'bg-[#0A0F1E] text-white' : ''}`}
            >
              <Link to="/blog">ALL</Link>
            </Button>
            {CATEGORIES.map(cat => (
              <Button
                key={cat.slug}
                asChild
                variant={slug === cat.slug ? 'default' : 'outline'}
                className={`rounded-none font-black uppercase text-[10px] tracking-widest h-16 px-8 ${slug === cat.slug ? 'bg-[#0066FF] text-white' : ''}`}
              >
                <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="py-12 flex justify-between items-center border-b border-gray-100 mb-12">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            ACTIVE ARCHIVES: <span className="text-[#0A0F1E]">{filteredPosts.length}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">SORT ENGINE:</span>
            <select className="text-[10px] font-black uppercase bg-transparent outline-none cursor-pointer text-[#0A0F1E]">
              <option>CHRONOLOGICAL</option>
              <option>PERFORMANCE</option>
            </select>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-32 text-center bg-gray-50">
            <Zap className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase italic mb-4">NO ARCHIVES FOUND</h3>
            <p className="text-gray-400 font-medium">Systems could not locate blueprints matching your query.</p>
            <Button asChild variant="link" className="mt-8 font-black uppercase text-[#0066FF] italic">
              <Link to="/blog">REBOOT SEARCH</Link>
            </Button>
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="mt-24 flex justify-center items-center gap-4">
            <Button variant="outline" className="rounded-none w-14 h-14 border-2"><ChevronLeft className="w-5 h-5" /></Button>
            <div className="flex gap-3">
              <Button className="rounded-none w-14 h-14 bg-[#0A0F1E] text-white font-black">1</Button>
              <Button variant="outline" className="rounded-none w-14 h-14 border-2 font-black">2</Button>
            </div>
            <Button variant="outline" className="rounded-none w-14 h-14 border-2"><ChevronRight className="w-5 h-5" /></Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListing;