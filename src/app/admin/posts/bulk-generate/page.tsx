"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Sparkles, CheckCircle2, AlertCircle, Eye, Edit2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function BulkGeneratePage() {
  const [topics, setTopics] = useState('');
  const [autoPublish, setAutoPublish] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const handleBulkGenerate = async () => {
    // Using fromCharCode to avoid newline issues in the build environment
    const newline = String.fromCharCode(10);
    const topicList = topics.split(newline).map(t => t.trim()).filter(Boolean);
    if (topicList.length === 0) return toast.error('PROTOCOL ERROR: No topics provided');

    setIsGenerating(true);
    setProgress({ current: 0, total: topicList.length });
    setResults([]);

    for (let i = 0; i < topicList.length; i++) {
      const topic = topicList[i];
      setProgress(prev => ({ ...prev, current: i + 1 }));

      try {
        const genRes = await fetch('/api/admin/generate-post', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ topic, status: autoPublish ? 'published' : 'draft' }),
        });
        const postData = await genRes.json();
        if (!genRes.ok) throw new Error(postData.error || 'Generation failed');

        setResults(prev => [...prev, {
          title: postData.title,
          slug: postData.slug,
          template: postData.templateId,
          imageSource: postData.imageSource || 'Wikimedia',
          status: 'success'
        }]);

        if (i < topicList.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 3000));
        }
      } catch (error: any) {
        setResults(prev => [...prev, {
          title: topic,
          error: error.message,
          status: 'failed'
        }]);
      }
    }

    setIsGenerating(false);
    toast.success('BULK PROTOCOL COMPLETE');
  };

  const successCount = results.filter(r => r.status === 'success').length;
  const failedCount = results.filter(r => r.status === 'failed').length;

  return (
    <div className="min-h-screen bg-gray-50/50 pb-24 pt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-[#0066FF] p-3 shadow-xl"><Sparkles className="w-6 h-6 text-white" /></div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter">BULK <span className="text-[#FF6B00]">GENERATOR</span></h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <Card className="rounded-none border-t-8 border-[#0A0F1E]">
              <CardHeader><CardTitle className="text-lg font-black uppercase italic">TOPIC LIST</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">ENTER TOPICS (ONE PER LINE)</label>
                  <Textarea 
                    value={topics} 
                    onChange={e => setTopics(e.target.value)} 
                    placeholder="How to fix SEO..." 
                    className="h-64 rounded-none bg-gray-50 border-gray-100 font-bold uppercase"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100">
                  <div className="space-y-1">
                    <p className="font-black uppercase text-xs italic">PUBLISH IMMEDIATELY</p>
                    <p className="text-[9px] text-gray-400 font-black uppercase">AUTO-DEPLOY TO ARCHIVES</p>
                  </div>
                  <Switch checked={autoPublish} onCheckedChange={setAutoPublish} />
                </div>

                <Button 
                  onClick={handleBulkGenerate} 
                  disabled={isGenerating}
                  className="w-full h-16 bg-[#0066FF] hover:bg-[#0066FF]/90 font-black italic uppercase tracking-widest text-lg rounded-none shadow-2xl shadow-blue-500/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                      GENERATING {progress.current}/{progress.total}
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6 mr-3 fill-white" />
                      GENERATE & PUBLISH ALL
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {results.length > 0 && !isGenerating && (
              <Card className="rounded-none border-l-8 border-[#FF6B00] bg-[#0A0F1E] text-white">
                <CardHeader><CardTitle className="text-lg font-black uppercase italic">SUMMARY</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase tracking-widest text-gray-500">PROCESSED</span><span className="text-2xl font-black italic">{results.length}</span></div>
                   <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase tracking-widest text-[#0066FF]">PUBLISHED</span><span className="text-2xl font-black italic">{successCount}</span></div>
                   <div className="flex justify-between items-center"><span className="text-[10px] font-black uppercase tracking-widest text-[#FF6B00]">ATTENTION</span><span className="text-2xl font-black italic">{failedCount}</span></div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="rounded-none border-none shadow-xl min-h-[600px]">
              <CardHeader className="border-b px-8 py-6"><CardTitle className="text-lg font-black uppercase italic tracking-widest">RESULTS ENGINE</CardTitle></CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest">TITLE / STATUS</TableHead>
                      <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest">TEMPLATE</TableHead>
                      <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest">SOURCE</TableHead>
                      <TableHead className="px-8 text-right font-black uppercase text-[10px] tracking-widest">ACTION</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((res, i) => (
                      <TableRow key={i} className="group">
                        <TableCell className="px-8 py-6">
                          <div className="space-y-1">
                            <p className="font-black uppercase italic text-xs">{res.title}</p>
                            {res.status === 'success' ? (
                              <div className="flex items-center gap-1.5 text-[#0066FF] text-[9px] font-black uppercase"><CheckCircle2 className="w-3 h-3" /> DEPLOYED</div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-[#FF6B00] text-[9px] font-black uppercase"><AlertCircle className="w-3 h-3" /> ERROR: {res.error}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="px-8 py-6">
                          <Badge variant="outline" className="rounded-none border-gray-200 font-black uppercase text-[9px]">{res.template ? `ENGINE ${res.template}` : 'N/A'}</Badge>
                        </TableCell>
                        <TableCell className="px-8 py-6 font-mono text-[10px] text-gray-400">{res.imageSource || 'N/A'}</TableCell>
                        <TableCell className="px-8 py-6 text-right">
                           {res.status === 'success' && (
                             <div className="flex justify-end gap-2">
                               <Button asChild variant="ghost" size="icon" className="group-hover:text-[#0066FF]"><Link href={`/blog/${res.slug}`} target="_blank"><Eye className="w-4 h-4" /></Link></Button>
                               <Button asChild variant="ghost" size="icon" className="group-hover:text-[#FF6B00]"><Link href={`/admin?edit=${res.slug}`}><Edit2 className="w-4 h-4" /></Link></Button>
                             </div>
                           )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {results.length === 0 && (
                      <TableRow><TableCell colSpan={4} className="h-[400px] text-center">
                        <div className="flex flex-col items-center justify-center text-gray-200">
                           <Zap className="w-12 h-12 mb-4" />
                           <p className="font-black uppercase italic">ENGINE IDLE</p>
                        </div>
                      </TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}