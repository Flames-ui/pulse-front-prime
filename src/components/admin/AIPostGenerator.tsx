"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Sparkles, Image as ImageIcon, Zap, AlertTriangle, CheckCircle2, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIPostGeneratorProps {
  onGenerated: (data: any) => void;
}

export const AIPostGenerator: React.FC<AIPostGeneratorProps> = ({ onGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [keyword, setKeyword] = useState('');
  const [wordCount, setWordCount] = useState('1200');
  const [template, setTemplate] = useState('auto');
  const [duplicateWarning, setDuplicateWarning] = useState<{ title: string; slug: string } | null>(null);

  const handleGenerate = async (force = false) => {
    if (!topic) return toast.error('PROTOCOL ERROR: Topic required');
    
    setLoading(true);
    setDuplicateWarning(null);

    try {
      const response = await fetch('/api/admin/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          topic, 
          keyword, 
          wordCount: parseInt(wordCount), 
          template,
          force
        }),
      });

      const data = await response.json();

      if (data.isDuplicate && !force) {
        setDuplicateWarning(data.duplicate);
        setLoading(false);
        return;
      }

      if (!response.ok) throw new Error(data.error || 'Generation failed');

      onGenerated(data);
      toast.success('PULSE GENERATED: ENGINE SYNCHRONIZED');
    } catch (error: any) {
      toast.error(`SYSTEM FAILURE: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-b-8 border-[#0066FF] rounded-none bg-[#0A0F1E] text-white overflow-hidden mb-12">
      <CardHeader className="border-b border-white/5 pb-8">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="bg-[#0066FF] p-3 shadow-xl"><Sparkles className="w-6 h-6 text-white" /></div>
              <CardTitle className="text-2xl font-black uppercase italic tracking-tighter">AI CONTENT <span className="text-[#FF6B00]">ARCHITECT</span></CardTitle>
           </div>
           <Badge variant="outline" className="border-white/20 text-gray-400 font-black uppercase tracking-widest text-[9px] px-3 py-1">V5.0 ENGINE ACTIVE</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          <div className="space-y-3 lg:col-span-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#0066FF]">PULSE_TOPIC</label>
            <Input 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
              placeholder="e.g., AdSense Approval 2026" 
              className="bg-white/5 border-white/10 h-14 rounded-none font-bold uppercase placeholder:font-normal placeholder:lowercase"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">FOCUS_KEYWORD</label>
            <Input 
              value={keyword} 
              onChange={(e) => setKeyword(e.target.value)} 
              placeholder="Primary SEO key" 
              className="bg-white/5 border-white/10 h-14 rounded-none"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">WORD_COUNT</label>
            <Select value={wordCount} onValueChange={setWordCount}>
              <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-none font-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0F1E] text-white border-white/10 rounded-none">
                <SelectItem value="800">800 WORDS</SelectItem>
                <SelectItem value="1200">1200 WORDS</SelectItem>
                <SelectItem value="1500">1500 WORDS</SelectItem>
                <SelectItem value="2000">2000 WORDS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">ENGINE_TEMPLATE</label>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger className="bg-white/5 border-white/10 h-14 rounded-none font-black">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#0A0F1E] text-white border-white/10 rounded-none">
                <SelectItem value="auto">AUTO-ROTATE</SelectItem>
                <SelectItem value="1">PERSONAL STORY</SelectItem>
                <SelectItem value="2">ULTIMATE GUIDE</SelectItem>
                <SelectItem value="3">LISTICLE</SelectItem>
                <SelectItem value="4">CASE STUDY</SelectItem>
                <SelectItem value="5">COMPARISON</SelectItem>
                <SelectItem value="6">PROBLEM SOLUTION</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            onClick={() => handleGenerate()} 
            disabled={loading}
            className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white font-black italic uppercase h-16 px-12 rounded-none tracking-widest text-lg shadow-2xl shadow-blue-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                WRITING PULSE...
              </>
            ) : (
              <>
                <Zap className="w-6 h-6 mr-3 fill-white" />
                INITIALIZE GENERATION
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {duplicateWarning && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }} 
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-8 overflow-hidden"
            >
              <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                 <div className="flex items-start gap-4">
                    <AlertTriangle className="w-8 h-8 text-[#FF6B00] shrink-0" />
                    <div className="space-y-1">
                      <p className="font-black uppercase italic text-lg">DUPLICATE DETECTED</p>
                      <p className="text-gray-400 text-sm">A similar blueprint exists: <span className="text-white font-bold">"{duplicateWarning.title}"</span></p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setDuplicateWarning(null)} className="rounded-none border-white/10 font-black uppercase italic">SKIP</Button>
                    <Button variant="secondary" onClick={() => handleGenerate(true)} className="rounded-none font-black uppercase italic">DIFFERENT ANGLE</Button>
                    <Button className="bg-[#0066FF] rounded-none font-black uppercase italic" onClick={() => handleGenerate(true)}>GENERATE ANYWAY</Button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};