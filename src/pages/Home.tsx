"use client";

import React, { useState, useEffect } from 'react';
import { MOCK_POSTS, CEO_NAME, CEO_AVATAR } from '@/lib/data';
import { PostCard } from '@/components/blog/PostCard';
import { SEO } from '@/components/blog/SEO';
import { Zap, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Home = () => {
  const [mounted, setMounted] = useState(false);
  const featuredPost = MOCK_POSTS.find(p => p.featured) || MOCK_POSTS[0];
  const latestPosts = MOCK_POSTS.slice(0, 6);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center">
        <Zap className="w-12 h-12 text-[#0066FF] animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <SEO 
        title="Giant Pulse | High-Performance Content Strategy & Monetization" 
        description="The ultimate resource for digital entrepreneurs looking to build, grow, and monetize their high-performance content engine."
      />

      <section className="bg-[#0A0F1E] text-white py-12 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0066FF]/20 rounded-full blur-[160px] -mr-400 -mt-400" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:w-1/2 space-y-8">
              <Badge className="bg-[#FF6B00] text-white font-black italic uppercase tracking-widest px-4 py-1.5 rounded-none border-none">STRATEGY V1.0</Badge>
              <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85]">BUILD YOUR <br/> <span className="text-[#0066FF]">DIGITAL</span> ENGINE.</h1>
              <p className="text-gray-400 text-lg md:text-2xl font-medium max-w-xl leading-relaxed">The world's leading blueprints for content monetization, SEO mastery, and high-performance growth by <span className="text-white">{CEO_NAME}</span>.</p>
              <div className="flex flex-wrap gap-6 pt-6">
                <Button asChild className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white font-black italic uppercase h-16 px-12 rounded-none tracking-widest shadow-2xl">
                  <Link href="/blog">ACCESS ARCHIVES</Link>
                </Button>
                <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500 border-l-4 border-gray-800 pl-6"><span className="text-white">128K+</span> OPERATIONAL <br/> SUBSCRIBERS</div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="lg:w-1/2 relative group">
               <div className="relative z-10 border-[12px] border-white/5 shadow-2xl overflow-hidden aspect-video">
                  <img src={featuredPost.featuredImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                  <div className="absolute bottom-8 left-8 right-8"><h3 className="text-2xl font-black uppercase italic leading-none mb-2">{featuredPost.title}</h3><p className="text-[10px] font-black uppercase tracking-widest text-[#FF6B00]">FEATURED BLUEPRINT</p></div>
               </div>
               <div className="absolute -bottom-8 -right-8 w-full h-full border-8 border-[#0066FF]/20 -z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-16 border-b-8 border-[#0A0F1E] pb-6">
              <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">LATEST <span className="text-[#0066FF]">BLUEPRINTS</span></h2>
              <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">ALL POSTS <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">{latestPosts.map(post => <PostCard key={post.id} post={post} />)}</div>
          </div>
          <aside className="lg:w-1/3 space-y-16">
            <div className="bg-[#0A0F1E] text-white p-12 relative overflow-hidden">
               <Mail className="w-10 h-10 text-[#FF6B00] mb-8" />
               <h3 className="text-3xl font-black uppercase italic mb-6">THE PULSE DISPATCH</h3>
               <div className="space-y-4">
                  <Input placeholder="ENGINE-ID@MAIL.COM" className="bg-white/5 border-white/10 text-white h-14 rounded-none" />
                  <Button className="w-full bg-[#0066FF] hover:bg-[#0066FF]/90 text-white font-black h-16 rounded-none">INITIALIZE</Button>
               </div>
            </div>
            <div className="bg-gray-50 p-10 border-2 border-gray-100">
               <img src={CEO_AVATAR} className="w-24 h-24 grayscale border-4 border-white mb-6" alt="" />
               <h4 className="font-black uppercase italic text-xl">{CEO_NAME}</h4>
               <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-4">FOUNDER & CHIEF ARCHITECT</p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Home;
