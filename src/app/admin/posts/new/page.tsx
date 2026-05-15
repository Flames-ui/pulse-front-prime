"use client";

import React, { useState } from 'react';
import { PostEditor } from '@/components/admin/PostEditor';
import { AIPostGenerator } from '@/components/admin/AIPostGenerator';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function NewPostPage() {
  const [generatedPost, setGeneratedPost] = useState<any>(null);

  const handleGenerated = (data: any) => {
    setGeneratedPost(data);
    toast.success('PULSE ARCHITECTURE LOADED INTO EDITOR');
    // Scroll to editor
    setTimeout(() => {
      const editorElement = document.getElementById('post-editor-section');
      editorElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSave = async (data: any) => {
    try {
      const res = await fetch('/api/admin/save-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to save pulse');
      toast.success('BLUEPRINT PERMANENTLY ARCHIVED');
    } catch (error: any) {
      toast.error(`ARCHIVE FAILURE: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-[#0A0F1E] pb-24">
      <div className="bg-[#0A0F1E] text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF]/5 rounded-full blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#0066FF] p-2 shadow-xl"><Sparkles className="w-5 h-5 text-white" /></div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">CONTENT ENGINE</p>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">NEW <span className="text-[#FF6B00]">BLUEPRINT</span></h1>
            </div>
            <div className="flex gap-4">
              <Button asChild variant="outline" className="rounded-none border-white/10 text-white font-black uppercase italic h-12 px-8">
                <Link href="/admin"><LayoutDashboard className="w-4 h-4 mr-2" /> DASHBOARD</Link>
              </Button>
              <Button asChild className="rounded-none bg-[#0066FF] font-black uppercase italic h-12 px-8">
                <Link href="/admin/posts/bulk-generate"><FileText className="w-4 h-4 mr-2" /> BULK GENERATE</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <AIPostGenerator onGenerated={handleGenerated} />
        
        <div id="post-editor-section" className="mt-20 pt-20 border-t border-gray-200 dark:border-white/5">
          <div className="flex items-center gap-4 mb-12">
             <div className="w-12 h-1 bg-[#FF6B00]" />
             <h2 className="text-3xl font-black uppercase italic tracking-tighter">EDITOR <span className="text-gray-400">SUITE</span></h2>
          </div>
          <PostEditor initialData={generatedPost} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}