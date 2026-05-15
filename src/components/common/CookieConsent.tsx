"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[100]"
        >
          <div className="bg-[#0A0F1E] border border-white/10 p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066FF]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FF6B00] p-2"><Cookie className="w-5 h-5 text-white" /></div>
                <h4 className="text-white font-black uppercase italic tracking-widest text-sm">COOKIE PROTOCOL</h4>
              </div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest leading-relaxed mb-8">
                WE USE DIGITAL COOKIES TO OPTIMIZE YOUR EXPERIENCE AND ARCHITECT BETTER PERFORMANCE. BY INITIALIZING, YOU ACCEPT OUR <Link href="/cookie-policy" className="text-[#0066FF] hover:underline">POLICIES</Link>.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={handleAccept} className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-none font-black uppercase italic text-[10px] h-12 tracking-widest">ACCEPT</Button>
                <Button onClick={handleDecline} variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none font-black uppercase italic text-[10px] h-12 tracking-widest">DECLINE</Button>
              </div>
            </div>
            <button onClick={() => setIsVisible(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};