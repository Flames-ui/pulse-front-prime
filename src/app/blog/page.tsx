"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_POSTS, CATEGORIES } from '@/lib/data';
import { PostCard } from '@/components/blog/PostCard';
import { Search, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Renamed component to avoid any potential conflict with legacy routes
export default function BlogListingPage({ searchParams }: { searchParams: { page?: string, q?: string } }) {
  const page = parseInt(searchParams.page || '1');
  const query = searchParams.q || '';
  const limit = 9;
  
  const filteredPosts = MOCK_POSTS.filter(post => 
    post.title.toLowerCase().includes(query.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / limit);
  const paginatedPosts = filteredPosts.slice((page - 1) * limit, page * limit);

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <div className="bg-[#0A0F1E] text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <p className="text-[#FF6B00] font-black uppercase tracking-[0.4em] text-[10px] mb-4">THE VAULT</p>
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-8">ALL BLUEPRINTS</h1>
          <p className="text-gray-400 text-xl max-w-2xl font-medium leading-relaxed">Complete library of strategies for bloggers, creators, and SEO professionals.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-[#0F1629] shadow-2xl p-6 md:p-10 flex flex-col lg:flex-row gap-6 items-center border-b-8 border-[#0066FF]">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <form action="/blog" method="GET" className="w-full">
              <Input 
                name="q"
                placeholder="SEARCH ARCHIVES..." 
                defaultValue={query}
                className="pl-16 h-16 bg-gray-50 dark:bg-[#0A0F1E] border-none text-xl font-black uppercase italic rounded-none focus-visible:ring-[#0066FF]"
              />
            </form>
          </div>
          <div className="flex gap-3 overflow-x-auto w-full lg:w-auto no-scrollbar">
            <Button asChild className={`rounded-none font-black uppercase text-[10px] tracking-widest h-16 px-8 ${!query ? 'bg-[#0066FF] text-white' : 'bg-[#0A0F1E] dark:bg-white dark:text-[#0A0F1E]'}`}>
              <Link href="/blog">ALL</Link>
            </Button>
            {CATEGORIES.map(cat => (
              <Button key={cat.slug} asChild variant="outline" className="rounded-none font-black uppercase text-[10px] tracking-widest h-16 px-8">
                <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="py-12 flex justify-between items-center border-b border-gray-100 dark:border-white/5 mb-12">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            ACTIVE ARCHIVES: <span className="text-[#0A0F1E] dark:text-white">{filteredPosts.length}</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">PAGE: {page} OF {totalPages || 1}</span>
          </div>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {paginatedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Empty State */}
        {paginatedPosts.length === 0 && (
          <div className="py-32 text-center bg-gray-50 dark:bg-white/5">
            <Zap className="w-16 h-16 text-gray-200 dark:text-white/10 mx-auto mb-6" />
            <h3 className="text-3xl font-black uppercase italic mb-4">NO ARCHIVES FOUND</h3>
            <p className="text-gray-400 font-medium">Systems could not locate blueprints matching your query.</p>
            <Button asChild variant="link" className="mt-8 font-black uppercase text-[#0066FF] italic">
              <Link href="/blog">REBOOT SEARCH</Link>
            </Button>
          </div>
        )}

        {/* Numbered Pagination */}
        {totalPages > 1 && (
          <div className="mt-24 flex justify-center items-center gap-4">
            <Button asChild variant="outline" className="rounded-none w-14 h-14 border-2 p-0 transition-all hover:border-[#0066FF]" disabled={page <= 1}>
              <Link href={`/blog?page=${Math.max(1, page - 1)}${query ? `&q=${query}` : ''}`}><ChevronLeft className="w-5 h-5" /></Link>
            </Button>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <Button 
                  key={pageNum}
                  asChild
                  className={`rounded-none w-14 h-14 font-black transition-all ${page === pageNum ? 'bg-[#0066FF] scale-110 shadow-lg shadow-blue-500/20' : 'bg-[#0A0F1E] hover:bg-[#0066FF]'}`}
                >
                  <Link href={`/blog?page=${pageNum}${query ? `&q=${query}` : ''}`}>{pageNum}</Link>
                </Button>
              ))}
            </div>

            <Button asChild variant="outline" className="rounded-none w-14 h-14 border-2 p-0 transition-all hover:border-[#FF6B00]" disabled={page >= totalPages}>
              <Link href={`/blog?page=${Math.min(totalPages, page + 1)}${query ? `&q=${query}` : ''}`}><ChevronRight className="w-5 h-5" /></Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}