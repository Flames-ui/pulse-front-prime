import React from 'react';
import { Zap, Globe, Camera, Share2, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CEO_NAME } from '@/lib/data';

// Shared Link component that works in both Next.js and Vite
const UniversalLink = ({ href, children, ...props }: any) => {
  return <a href={href} {...props}>{children}</a>;
};

export const Footer = () => {
  return (
    <footer className="bg-[#0A0F1E] text-white pt-24 pb-12 mt-24 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5">
            <UniversalLink href="/" className="flex items-center gap-3 mb-10"><div className="bg-[#0066FF] p-2 shadow-xl"><Zap className="w-5 h-5 fill-white" /></div><span className="text-3xl font-black italic tracking-tighter uppercase">GIANT <span className="text-[#FF6B00]">PULSE</span></span></UniversalLink>
            <p className="text-gray-400 max-w-md mb-10 text-xs font-medium leading-relaxed uppercase tracking-widest">The world's leading engine for digital growth, strategy, and monetization.</p>
            <div className="flex gap-6">
               <a href="#" className="text-gray-500 hover:text-[#0066FF] transition-colors"><Share2 className="w-5 h-5" /></a>
               <a href="#" className="text-gray-500 hover:text-[#0066FF] transition-colors"><Globe className="w-5 h-5" /></a>
               <a href="#" className="text-gray-500 hover:text-[#0066FF] transition-colors"><Camera className="w-5 h-5" /></a>
               <a href="#" className="text-gray-500 hover:text-[#0066FF] transition-colors"><Play className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black mb-8 text-[#FF6B00] uppercase tracking-[0.3em] italic">RESOURCES</h4>
            <ul className="space-y-4 text-[9px] font-black uppercase tracking-widest text-gray-500">
              <li><UniversalLink href="/blog" className="hover:text-white">BLUEPRINTS</UniversalLink></li>
              <li><UniversalLink href="/category/monetization" className="hover:text-white">MONETIZATION</UniversalLink></li>
              <li><UniversalLink href="/feed.xml" className="hover:text-white">RSS FEED</UniversalLink></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black mb-8 text-[#FF6B00] uppercase tracking-[0.3em] italic">COMPANY</h4>
            <ul className="space-y-4 text-[9px] font-black uppercase tracking-widest text-gray-500">
              <li><UniversalLink href="/about" className="hover:text-white">THE CEO</UniversalLink></li>
              <li><UniversalLink href="/contact" className="hover:text-white">CONTACT HQ</UniversalLink></li>
            </ul>
          </div>
          <div className="lg:col-span-3 bg-white/5 p-8 border border-white/10">
             <h4 className="text-[10px] font-black mb-4 uppercase tracking-[0.2em] italic">THE NEWSLETTER</h4>
             <div className="space-y-3">
                <input className="w-full bg-white/5 border border-white/10 p-4 text-[10px] font-black uppercase outline-none" placeholder="ENGINE-ID@MAIL.COM" />
                <Button className="w-full bg-[#0066FF] hover:bg-[#0066FF]/90 rounded-none h-12 font-black uppercase italic text-[9px]">INITIALIZE</Button>
             </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-8 text-[8px] font-black uppercase tracking-[0.4em] text-gray-600">
          <p>&copy; 2026 GIANT PULSE. ARCHITECTED BY {CEO_NAME}.</p>
          <div className="flex gap-8">
            <UniversalLink href="/privacy-policy" className="hover:text-white">PRIVACY</UniversalLink>
            <UniversalLink href="/cookie-policy" className="hover:text-white">COOKIES</UniversalLink>
            <UniversalLink href="/admin" className="text-[#0066FF] hover:text-white flex items-center gap-2"><ChevronRight className="w-3 h-3" /> PORTAL</UniversalLink>
          </div>
        </div>
      </div>
    </footer>
  );
};