"use client";

import React, { useState, useEffect } from 'react';
import { SEO } from '@/components/blog/SEO';
import { CEO_NAME, CEO_BIO, CEO_AVATAR } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Mail, Zap } from 'lucide-react';

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="bg-[#0A0F1E] text-white pt-24 pb-20 md:pt-40 md:pb-32 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10 text-center">
      <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">{title}</h1>
      <p className="text-gray-400 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">{subtitle}</p>
    </div>
  </div>
);

export const About = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  
  return (
    <div className="min-h-screen">
      <SEO title="CEO Vision" description="Learn about Agbasionwe Emmanuel Chiemelie and the mission behind Giant Pulse." />
      <PageHeader title="THE VISION" subtitle="ARCHITECTING THE DIGITAL FUTURE" />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/3"><img src={CEO_AVATAR} className="w-full border-[12px] border-gray-100 grayscale" alt={CEO_NAME} /></div>
          <div className="md:w-2/3 space-y-8">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">{CEO_NAME}</h2>
            <p className="text-xl font-medium text-gray-600 leading-relaxed">{CEO_BIO}</p>
            <p className="text-gray-500 leading-relaxed">Giant Pulse was born from a simple observation: the digital economy is being over-complicated by jargon and noise.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Contact = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen">
      <SEO title="Contact HQ" description="Get in touch with the Giant Pulse team for strategy inquiries." />
      <PageHeader title="CONTACT HQ" subtitle="ESTABLISH UPLINK PROTOCOL" />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase italic">SYSTEMS ARE GO.</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest"><Mail className="w-5 h-5 text-[#0066FF]" /> anointedflamestv@gmail.com</div>
              <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest"><Zap className="w-5 h-5 text-[#FF6B00]" /> RESPONSE TIME: &lt; 24H</div>
            </div>
          </div>
          <form className="space-y-6 bg-gray-50 p-10 border-2 border-gray-100">
             <input placeholder="NAME" className="w-full bg-white border-2 p-5 text-xs font-black uppercase outline-none focus:border-[#0066FF]" />
             <Button className="w-full bg-[#0A0F1E] text-white h-16 font-black italic uppercase tracking-widest rounded-none">SEND TRANSMISSION</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;