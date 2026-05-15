"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '@/lib/types';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Eye, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface PostCardProps {
  post: Post;
  horizontal?: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, horizontal = false }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const content = (
    <Card className={`overflow-hidden border-none shadow-sm hover:shadow-2xl transition-all duration-500 group rounded-none h-full flex flex-col ${horizontal ? 'md:flex-row' : ''} dark:bg-[#0F1629]`}>
      <div className={`relative overflow-hidden shrink-0 ${horizontal ? 'md:w-[40%] aspect-[4/3] md:aspect-auto' : 'aspect-video'}`}>
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Badge className="absolute top-4 left-4 bg-[#0066FF] text-white rounded-none uppercase font-black italic tracking-widest text-[8px] px-3 py-1.5 border-none">
          {post.category}
        </Badge>
        
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
           <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-white">
             <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5 text-[#FF6B00]" /> {post.viewCount.toLocaleString()}</span>
             <span className="flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5 text-[#FF6B00]" /> Helpful</span>
           </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-1">
        <div className="p-6 md:p-8 flex-1">
          <div className="flex items-center gap-3 text-[9px] text-[#FF6B00] mb-4 font-black uppercase tracking-[0.2em] italic">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.publishedDate}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          </div>
          
          <Link href={`/blog/${post.slug}`}>
            <h3 className={`font-black uppercase tracking-tighter leading-[0.9] group-hover:text-[#0066FF] transition-colors mb-4 dark:text-white ${horizontal ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
              {post.title}
            </h3>
          </Link>
          
          <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm font-medium leading-relaxed mb-6">
            {post.excerpt}
          </p>
        </div>
        
        <CardFooter className="px-6 py-4 md:px-8 md:py-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 shrink-0 overflow-hidden border-2 border-gray-100 dark:border-white/10">
              <img src={post.authorAvatar} alt={post.author} className="w-full h-full object-cover grayscale" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black uppercase tracking-widest leading-none mb-1 dark:text-white">{post.author.split(' ')[0]}</span>
              <span className="text-[8px] text-gray-400 uppercase font-bold">Author</span>
            </div>
          </div>
          <Link href={`/blog/${post.slug}`} className="text-[#0066FF] font-black flex items-center gap-2 group/btn text-[10px] uppercase italic tracking-[0.2em]">
            Read Guide <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2 text-[#FF6B00]" />
          </Link>
        </CardFooter>
      </div>
    </Card>
  );

  if (!mounted) {
    return <div className="h-full">{content}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      {content}
    </motion.div>
  );
};
