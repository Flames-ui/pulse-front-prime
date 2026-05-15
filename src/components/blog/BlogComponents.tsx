"use client";

import React, { useState, useEffect } from 'react';
import { 
  Send, Link2, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Share2, Globe, Link2 as LinkIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

// Social Share Component
export const SocialShare = ({ title, url }: { title: string; url: string }) => {
  const fullUrl = encodeURIComponent(url);
  const text = encodeURIComponent(title);

  const platforms = [
    { name: 'Twitter', icon: Send, color: 'hover:bg-[#1DA1F2]', href: `https://twitter.com/intent/tweet?text=${text}&url=${fullUrl}` },
    { name: 'Facebook', icon: Share2, color: 'hover:bg-[#4267B2]', href: `https://www.facebook.com/sharer/sharer.php?u=${fullUrl}` },
    { name: 'WhatsApp', icon: Send, color: 'hover:bg-[#25D366]', href: `https://wa.me/?text=${text}%20${fullUrl}` },
    { name: 'LinkedIn', icon: Globe, color: 'hover:bg-[#0077B5]', href: `https://www.linkedin.com/sharing/share-offsite/?url=${fullUrl}` },
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast.success('Link copied to clipboard!');
  };

  const openPopup = (href: string) => {
    window.open(href, 'share-window', 'width=600,height=400');
  };

  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((p) => (
        <Button
          key={p.name}
          onClick={() => openPopup(p.href)}
          variant="outline"
          size="icon"
          className={`h-10 w-10 border-2 rounded-none transition-all duration-300 group ${p.color} hover:text-white`}
        >
          <p.icon className="w-4 h-4" />
        </Button>
      ))}
      <Button
        onClick={copyLink}
        variant="outline"
        size="icon"
        className="h-10 w-10 border-2 rounded-none hover:bg-black hover:text-white transition-all duration-300"
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

// FAQ Section Component
export const PostFAQ = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="mt-20 border-t-8 border-[#0A0F1E] pt-16">
      <h2 className="text-3xl font-black uppercase italic mb-12 flex items-center gap-4">
        <span className="w-12 h-1 bg-[#FF6B00]" /> FREQUENTLY ASKED QUESTIONS
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-2 border-gray-100">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-black uppercase text-sm md:text-base tracking-tight">{faq.question}</span>
              {openIndex === idx ? <ChevronUp className="w-5 h-5 text-[#0066FF]" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {mounted && (
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-600 font-medium leading-relaxed border-t-2 border-gray-100 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
            {!mounted && openIndex === idx && (
              <div className="p-6 pt-0 text-gray-600 font-medium leading-relaxed border-t-2 border-gray-100 bg-gray-50/50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Helpful Widget
export const HelpfulWidget = ({ postId }: { postId: string }) => {
  const [responded, setResponded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleResponse = (helpful: boolean) => {
    setResponded(true);
    toast.success('Thank you for your feedback! Systems optimized.');
  };

  return (
    <div className="bg-gray-50 border-2 border-gray-100 p-8 md:p-12 mt-12 flex flex-col items-center text-center">
      {!responded ? (
        <>
          <h4 className="font-black uppercase italic text-xl mb-6">WAS THIS ARCHITECTURE HELPFUL?</h4>
          <div className="flex gap-4">
            <Button onClick={() => handleResponse(true)} className="bg-[#0066FF] hover:bg-[#0066FF]/90 rounded-none h-14 px-8 font-black uppercase italic flex gap-3">
              <ThumbsUp className="w-5 h-5" /> POSITIVE PULSE
            </Button>
            <Button onClick={() => handleResponse(false)} variant="outline" className="border-2 border-gray-200 hover:border-red-500 hover:text-red-500 rounded-none h-14 px-8 font-black uppercase italic flex gap-3">
              <ThumbsDown className="w-5 h-5" /> NEEDS TUNING
            </Button>
          </div>
        </>
      ) : (
        mounted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="font-black text-[#0066FF] uppercase tracking-[0.2em] italic">FEEDBACK RECEIVED. ARCHITECT IS TUNING THE ENGINE.</p>
          </motion.div>
        ) : (
          <p className="font-black text-[#0066FF] uppercase tracking-[0.2em] italic">FEEDBACK RECEIVED. ARCHITECT IS TUNING THE ENGINE.</p>
        )
      )}
    </div>
  );
};