"use client";

import React, { useState } from 'react';
import { PostEditor } from '@/components/admin/PostEditor';
import { AIPostGenerator } from '@/components/admin/AIPostGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles, Database, Plus, Search, Eye, Edit2, Trash2, LayoutDashboard, Settings, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminPage() {
  const [generatedData, setGeneratedData] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="bg-[#0066FF] p-3 shadow-xl"><div className="w-6 h-6 text-white font-black">GP</div></div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">ADMIN <span className="text-[#FF6B00]">PORTAL</span></h1>
          </div>
          <div className="flex gap-4">
            <Button asChild variant="outline" className="rounded-none font-black uppercase tracking-widest text-[10px] h-12 px-8">
              <Link href="/admin/dashboard"><LayoutDashboard className="w-4 h-4 mr-2" /> DASHBOARD</Link>
            </Button>
            <Button asChild className="bg-[#0066FF] rounded-none font-black uppercase tracking-widest text-[10px] h-12 px-8 shadow-xl shadow-blue-500/10">
              <Link href="/admin/posts/bulk-generate"><Sparkles className="w-4 h-4 mr-2" /> BULK GENERATE</Link>
            </Button>
          </div>
        </div>

        <AIPostGenerator onGenerated={(data) => setGeneratedData(data)} />
        
        <Card className="rounded-none border-none shadow-2xl">
          <CardHeader className="bg-white border-b-8 border-[#0A0F1E] p-8">
             <div className="flex items-center gap-4">
               <div className="bg-[#0A0F1E] p-2"><FileText className="w-5 h-5 text-white" /></div>
               <CardTitle className="text-xl font-black uppercase italic">PULSE ARCHITECT</CardTitle>
             </div>
          </CardHeader>
          <CardContent className="p-0">
             <PostEditor initialData={generatedData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}