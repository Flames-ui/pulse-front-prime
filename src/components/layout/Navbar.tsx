"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Zap, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SearchModal } from '@/components/common/SearchModal';

// Shared Link component that works in both Next.js and Vite
const UniversalLink = ({ href, children, ...props }: any) => {
  return <a href={href} {...props}>{children}</a>;
};

// Safe routing hook for dual environment support
const useSafePathname = () => {
  try {
    const pathname = usePathname();
    return pathname;
  } catch (e) {
    return typeof window !== 'undefined' ? window.location.pathname : '';
  }
};

export const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = useSafePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) setIsHidden(true);
    else setIsHidden(false);
  });

  const links = [
    { name: 'HOME', path: '/' },
    { name: 'ARCHIVES', path: '/blog' },
    { name: 'MISSION', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isAdmin = pathname?.startsWith('/admin');
  if (isAdmin) return null;

  const headerContent = (
    <nav className="container mx-auto px-4 h-20 md:h-24 flex items-center justify-between">
      <UniversalLink href="/" className="flex items-center gap-3 group shrink-0">
        <div className="bg-[#0066FF] p-2 shadow-xl"><Zap className="w-5 h-5 md:w-7 md:h-7 fill-white" /></div>
        <div className="flex flex-col">
          <span className="text-xl md:text-3xl font-black tracking-tighter uppercase italic leading-none">GIANT <span className="text-[#FF6B00]">PULSE</span></span>
          <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-gray-500 mt-1">MASTER YOUR DIGITAL ENGINE</span>
        </div>
      </UniversalLink>
      <div className="hidden lg:flex items-center gap-12">
        {links.map((link) => (
          <UniversalLink key={link.path} href={link.path} className={`text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:text-[#0066FF] relative group ${pathname === link.path ? 'text-[#0066FF]' : 'text-gray-400'}`}>
            {link.name}
            <span className={`absolute -bottom-2 left-0 h-0.5 bg-[#FF6B00] transition-all duration-300 ${pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </UniversalLink>
        ))}
        <div className="h-8 w-px bg-white/10 mx-2" />
        
        <button 
          onClick={() => setIsSearchOpen(true)}
          className="text-gray-400 hover:text-[#0066FF] transition-colors flex items-center gap-2 group"
        >
          <Search className="w-5 h-5" />
          <span className="text-[9px] font-black border border-white/10 px-2 py-0.5 rounded group-hover:border-[#0066FF] group-hover:text-[#0066FF] transition-all">⌘K</span>
        </button>

        <Button className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white font-black italic uppercase tracking-widest h-12 px-10 rounded-none text-[10px] shadow-xl shadow-blue-500/20">SUBSCRIBE</Button>
      </div>
      <div className="flex items-center gap-4 lg:hidden">
         <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10">
           {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </button>
      </div>
    </nav>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-[#0A0F1E] text-white border-b border-white/5 transition-transform duration-500 ease-in-out ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      {headerContent}
      
      <SearchModal isOpen={isSearchOpen} setIsOpen={setIsSearchOpen} />

      {mounted && (
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="lg:hidden fixed inset-0 z-50 bg-[#0A0F1E] flex flex-col p-8 pt-24">
              <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 w-10 h-10 border border-white/10 flex items-center justify-center"><X className="w-5 h-5" /></button>
              <div className="flex flex-col gap-8 mb-12">
                {links.map((link) => (
                  <UniversalLink key={link.path} href={link.path} onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase italic tracking-tighter hover:text-[#0066FF]">{link.name}</UniversalLink>
                ))}
                <button onClick={() => { setIsOpen(false); setIsSearchOpen(true); }} className="text-4xl font-black uppercase italic tracking-tighter hover:text-[#0066FF] text-left flex items-center gap-4"><Search className="w-8 h-8" /> SEARCH</button>
              </div>
              <Separator className="bg-white/10 mb-10" />
              <Button className="bg-[#0066FF] w-full h-16 font-black uppercase italic tracking-widest rounded-none text-lg">JOIN THE PULSE</Button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </header>
  );
};