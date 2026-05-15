"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { 
  Bold, Italic, List, ListOrdered, Quote, Save, Image as ImageIcon, AlertTriangle, 
  CheckCircle2, Search, Info, XIcon, Globe, MessageCircle, Share2, Sparkles, Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface PostEditorProps {
  initialData?: any;
  onSave?: (data: any) => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({ initialData, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [featuredImage, setFeaturedImage] = useState(initialData?.featuredImage || '');
  const [imageWidth, setImageWidth] = useState<number | null>(null);
  const [suggestedImages, setSuggestedImages] = useState<any[]>([]);
  const [isFetchingImages, setIsFetchingImages] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false }),
      Youtube.configure({ width: 480, height: 270 }),
    ],
    content: initialData?.content || '<p>Initialize your pulse architecture here...</p>',
  });

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setSlug(initialData.slug || '');
      setExcerpt(initialData.excerpt || initialData.metaDescription || '');
      setCategory(initialData.category || '');
      editor?.commands.setContent(initialData.content || '');
      if (initialData.title) fetchImages(initialData.title, initialData.slug);
    }
  }, [initialData]);

  const fetchImages = async (query: string, postSlug: string) => {
    setIsFetchingImages(true);
    try {
      const res = await fetch(`/api/admin/fetch-images?query=${encodeURIComponent(query)}&slug=${postSlug}`);
      const data = await res.json();
      setSuggestedImages(data.results || []);
      if (!featuredImage && data.results?.length > 0) {
        setFeaturedImage(data.results[0].url);
      }
    } catch (e) {
      console.error('Image fetch failed', e);
    } finally {
      setIsFetchingImages(false);
    }
  };

  const validateImage = (url: string) => {
    if (!url) return;
    const img = new globalThis.Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setImageWidth(img.width);
    };
    img.src = url;
  };

  useEffect(() => {
    if (featuredImage) validateImage(featuredImage);
  }, [featuredImage]);

  const generateBrandedCover = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Background
    ctx.fillStyle = '#0A0F1E';
    ctx.fillRect(0, 0, 1200, 630);

    // 2. Pulse Wave Graphic
    ctx.strokeStyle = '#0066FF';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.2;
    ctx.beginPath();
    for (let i = 0; i < 1200; i += 5) {
      ctx.lineTo(i, 315 + Math.sin(i * 0.05) * 50);
    }
    ctx.stroke();
    ctx.globalAlpha = 1.0;

    // 3. Logo
    ctx.fillStyle = '#0066FF';
    ctx.fillRect(50, 50, 60, 60);
    ctx.fillStyle = 'white';
    ctx.font = '900 30px Arial';
    ctx.fillText('GP', 62, 92);

    // 4. Category Badge
    ctx.fillStyle = '#FF6B00';
    const badgeText = (category || 'SYSTEM').toUpperCase();
    ctx.font = '900 12px Arial';
    const badgeWidth = ctx.measureText(badgeText).width + 30;
    ctx.fillRect(50, 140, badgeWidth, 30);
    ctx.fillStyle = 'white';
    ctx.fillText(badgeText, 65, 160);

    // 5. Title
    ctx.fillStyle = 'white';
    ctx.font = '900 64px Arial';
    ctx.textAlign = 'center';
    const words = title.toUpperCase().split(' ');
    let line = '';
    let y = 300;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      if (ctx.measureText(testLine).width > 1000 && n > 0) {
        ctx.fillText(line, 600, y);
        line = words[n] + ' ';
        y += 80;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 600, y);

    // Convert to URL
    const dataUrl = canvas.toDataURL('image/png');
    setFeaturedImage(dataUrl);
    toast.success('BRANDED COVER GENERATED');
  };

  const calculateSEO = () => {
    const text = editor?.getText() || '';
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const keywordCount = initialData?.focus_keyword
      ? (text.toLowerCase().match(new RegExp(initialData.focus_keyword.toLowerCase(), 'g')) || []).length
      : 0;
    const keywordDensity = wordCount > 0 ? (keywordCount / wordCount) * 100 : 0;

    return {
      wordCount,
      keywordDensity: keywordDensity.toFixed(1),
      titleLength: title.length,
      descriptionLength: excerpt.length,
      readability: wordCount > 300 ? 'EXCELLENT' : 'NEEDS DEPTH',
    };
  };

  const seo = calculateSEO();

  const handleSave = () => {
    if (!title) return toast.error('PROTOCOL ERROR: Title missing');
    if (!featuredImage) return toast.error('PROTOCOL ERROR: Featured image missing');

    onSave?.({
      title,
      slug,
      excerpt,
      category,
      featuredImage,
      content: editor?.getHTML() || '',
      status: 'published',
      updatedAt: new Date().toISOString(),
    });

    toast.success('BLUEPRINT DEPLOYED TO ARCHIVES');
  };

  return (
    <div className="p-8 md:p-12 space-y-12 bg-white">
      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#0066FF]">ARCHIVE_TITLE</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-20 text-3xl font-black uppercase italic border-2 border-[#0A0F1E] focus-visible:ring-0"
              placeholder="ENTER BLUEPRINT TITLE..."
            />
          </div>

          <div className="border-2 border-[#0A0F1E]">
            <div className="border-b-2 border-[#0A0F1E] bg-gray-50 p-4 flex flex-wrap gap-2">
              <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleBold().run()} className="hover:bg-[#0066FF] hover:text-white">
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleItalic().run()} className="hover:bg-[#0066FF] hover:text-white">
                <Italic className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="hover:bg-[#0066FF] hover:text-white">
                <List className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => editor?.chain().focus().toggleBlockquote().run()} className="hover:bg-[#0066FF] hover:text-white">
                <Quote className="w-4 h-4" />
              </Button>
              <div className="flex-1" />
              <Badge variant="outline" className="border-[#0A0F1E] font-black">{seo.wordCount} WORDS</Badge>
            </div>
            <EditorContent editor={editor} className="p-10 min-h-[600px] prose max-w-none focus:outline-none blog-content" />
          </div>

          {/* Image Selection Grid */}
          <Card className="rounded-none border-t-8 border-[#0066FF]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-black uppercase italic">VISUAL ENGINE</CardTitle>
              <Button variant="outline" size="sm" onClick={() => generateBrandedCover()} className="rounded-none border-2 font-black text-[10px] uppercase italic">
                <Sparkles className="w-4 h-4 mr-2 text-[#FF6B00]" /> GENERATE BRANDED COVER
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {isFetchingImages ? (
                  <div className="col-span-4 h-32 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#0066FF]" />
                  </div>
                ) : (
                  <>
                    {suggestedImages.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setFeaturedImage(img.url)}
                        className={`relative aspect-video cursor-pointer border-4 group overflow-hidden ${
                          featuredImage === img.url ? 'border-[#0066FF]' : 'border-transparent hover:border-gray-200'
                        }`}
                      >
                        <img src={img.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        <Badge className="absolute bottom-2 right-2 bg-black/60 text-[7px] font-black uppercase border-none">
                          {img.source}
                        </Badge>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-8">
          <div className="bg-[#0A0F1E] text-white p-8 space-y-6 border-b-8 border-[#FF6B00] sticky top-32">
            <h3 className="text-xl font-black uppercase italic">ENGINE SETTINGS</h3>

            <div className="space-y-4">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">FEATURED_VISUAL</label>
              <div className="aspect-video bg-white/5 border border-white/10 relative overflow-hidden group">
                {featuredImage ? (
                  <img src={featuredImage} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-gray-700" />
                  </div>
                )}
              </div>
              <Input
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className="bg-white/5 border-white/10 text-[10px]"
                placeholder="MANUAL URL..."
              />
              {imageWidth && imageWidth < 1200 && (
                <div className="bg-[#FF6B00]/10 border border-[#FF6B00]/30 p-3 flex gap-3 items-start">
                  <AlertTriangle className="w-4 h-4 text-[#FF6B00] shrink-0" />
                  <p className="text-[8px] font-black uppercase text-[#FF6B00]">
                    QUALITY ALERT: {imageWidth}px. MIN 1200px REQUIRED.
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">SLUG_ID</label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} className="bg-white/5 border-white/10 h-10 text-xs font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">CATEGORY</label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} className="bg-white/5 border-white/10 h-10 text-xs font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-widest text-gray-500">EXCERPT / META</label>
              <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="bg-white/5 border-white/10 h-32 text-xs" />
            </div>

            <Button onClick={handleSave} className="w-full h-16 bg-[#0066FF] hover:bg-[#0066FF]/90 font-black italic uppercase tracking-widest rounded-none text-lg">
              <Save className="w-6 h-6 mr-3" /> DEPLOY PULSE
            </Button>
          </div>

          {/* SEO PANEL */}
          <Card className="rounded-none border-l-8 border-[#0066FF]">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase italic tracking-widest">SEO ANALYTICS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-gray-400 uppercase">TITLE LENGTH</span>
                <Badge className={seo.titleLength < 60 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                  {seo.titleLength} CHARS
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-gray-400 uppercase">KEYWORD DENSITY</span>
                <Badge className="bg-[#0A0F1E] text-white">{seo.keywordDensity}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-gray-400 uppercase">READABILITY</span>
                <Badge className="bg-[#FF6B00] text-white">{seo.readability}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* SOCIAL PREVIEW */}
          <Card className="rounded-none border-l-8 border-[#FF6B00]">
            <CardHeader>
              <CardTitle className="text-xs font-black uppercase italic tracking-widest">SOCIAL PREVIEW</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                {/* X (formerly Twitter) */}
                <XIcon className="w-5 h-5 text-[#0A0F1E]" />
                {/* Facebook replaced with Globe since lucide-react removed Facebook icon */}
                <Globe className="w-5 h-5 text-[#4267B2]" />
                {/* WhatsApp */}
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
              </div>
              <div className="bg-gray-50 border p-4 space-y-3">
                <img src={featuredImage || '/placeholder.png'} className="w-full aspect-[1.91/1] object-cover" />
                <p className="font-bold text-xs truncate">{title || 'TITLE PREVIEW'}</p>
                <p className="text-[9px] text-gray-400 line-clamp-2">{excerpt || 'Meta description preview...'}</p>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
      <canvas ref={canvasRef} width={1200} height={630} className="hidden" />
    </div>
  );
};
