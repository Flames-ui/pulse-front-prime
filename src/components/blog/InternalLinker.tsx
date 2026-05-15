"use client";

import React, { useMemo } from 'react';
import { Post } from '@/lib/types';
import { CEO_NAME } from '@/lib/data';

interface InternalLinkerProps {
  content: string;
  posts: Post[];
  currentSlug?: string;
}

export const InternalLinker: React.FC<InternalLinkerProps> = ({ content, posts, currentSlug }) => {
  const processedContent = useMemo(() => {
    let result = content;
    const filteredPosts = currentSlug ? posts.filter(p => p.slug !== currentSlug) : posts;

    const targets = [
      ...filteredPosts.map(p => ({ keyword: p.title, url: `/blog/${p.slug}`, priority: 1 })),
      ...filteredPosts.map(p => ({ keyword: p.category, url: `/category/${p.slug}`, priority: 2 })),
      { keyword: CEO_NAME, url: '/about', priority: 0 },
      { keyword: 'Giant Pulse', url: '/', priority: 0 },
      { keyword: 'Blogging', url: '/category/blogging', priority: 3 },
      { keyword: 'SEO', url: '/category/seo', priority: 3 },
      { keyword: 'Monetization', url: '/category/monetization', priority: 3 },
    ];

    const sortedTargets = targets.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.keyword.length - a.keyword.length;
    });

    const usedKeywords = new Set<string>();

    sortedTargets.forEach(target => {
      if (!target.keyword) return;
      if (usedKeywords.has(target.keyword.toLowerCase())) return;

      const regex = new RegExp(`(?<!<a[^>]*>)\\\\b(${target.keyword})\\\\b(?![^<]*</a>)`, 'gi');
      
      let matchCount = 0;
      result = result.replace(regex, (match) => {
        if (matchCount < 2) {
          matchCount++;
          usedKeywords.add(target.keyword.toLowerCase());
          return `<a href="${target.url}" class="text-[#0066FF] font-black underline decoration-[#FF6B00] decoration-2 underline-offset-4 hover:bg-[#0066FF]/5 transition-all">${match}</a>`;
        }
        return match;
      });
    });

    return result;
  }, [content, posts, currentSlug]);

  return (
    <div 
      className="prose prose-2xl max-w-none 
        prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-headings:text-[#0A0F1E] prose-headings:mt-20 prose-headings:mb-10
        prose-p:leading-[1.8] prose-p:text-gray-600 prose-p:font-medium prose-p:mb-10 prose-p:text-xl md:prose-p:text-2xl
        prose-strong:text-[#0A0F1E] prose-strong:font-black
        prose-blockquote:border-l-[12px] prose-blockquote:border-[#FF6B00] prose-blockquote:bg-gray-50 prose-blockquote:p-12 prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:font-black prose-blockquote:uppercase prose-blockquote:tracking-tight prose-blockquote:my-20
        prose-ul:list-none prose-ul:pl-0 prose-li:pl-10 prose-li:relative prose-li:mb-4
        prose-li:before:content-[''] prose-li:before:absolute prose-li:before:left-0 prose-li:before:top-4 prose-li:before:w-4 prose-li:before:h-4 prose-li:before:bg-[#0066FF]
        prose-img:border-[12px] prose-img:border-white prose-img:shadow-2xl"
      dangerouslySetInnerHTML={{ __html: processedContent }} 
    />
  );
};