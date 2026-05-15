"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ThumbsUp, Heart, Send, Reply as ReplyIcon, MessageSquare, 
  ShieldCheck, ImageIcon, X, Zap, Award, Loader2, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CEO_AVATAR, CEO_NAME } from '@/lib/data';
import { Comment, Reply } from '@/lib/types';
import { toast } from 'sonner';

const INITIAL_COMMENTS: Comment[] = [
  {
    id: '1',
    postId: 'all',
    author: 'Sarah Jenkins',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    content: `This guide is exactly what I needed for 2026. The shift from keyword architecture to the Pulse Protocol is something I've been noticing but couldn't quite implement. Thanks Emmanuel!`,
    createdAt: new Date(2026, 0, 15).toISOString(),
    status: 'approved',
    reactions: { like: 42, heart: 28, insightful: 15 },
    replies: [
      {
        id: 'r1',
        commentId: '1',
        author: CEO_NAME,
        avatar: CEO_AVATAR,
        content: `Glad you found resonance, Sarah! Intent Architecture is the bedrock of digital survival now. Keep pulsing!`,
        createdAt: new Date(2026, 0, 15, 2).toISOString(),
        reactions: { like: 12, heart: 5, insightful: 3 }
      }
    ]
  },
  {
    id: '2',
    postId: 'all',
    author: 'David Okoro',
    avatar: 'https://i.pravatar.cc/150?u=david',
    content: `Building a trust reservoir is a powerful metaphor. I've started implementing the internal linking strategy you mentioned and engagement is up 30%.`,
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/e2ece76b-b86a-4302-8d56-503f7b107d3b/intent-architecture-c01e26b9-1778791945236.webp',
    createdAt: new Date(2026, 0, 16).toISOString(),
    status: 'approved',
    reactions: { like: 31, heart: 12, insightful: 22 },
    replies: []
  }
];

export const CommentsSection: React.FC<{ postId: string }> = ({ postId }) => {
  const [mounted, setMounted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [replyImage, setReplyImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const replyFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setComments(INITIAL_COMMENTS.filter(c => c.postId === 'all' || c.postId === postId));
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [postId]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isReply = false) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Visual asset too large (Max 5MB)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isReply) setReplyImage(reader.result as string);
        else setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() && !selectedImage) return;

    const comment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      postId,
      author: 'Strategy Analyst',
      avatar: `https://i.pravatar.cc/150?u=guest${Math.random()}`,
      content: newComment,
      image: selectedImage || undefined,
      createdAt: new Date().toISOString(),
      status: 'approved',
      reactions: { like: 0, heart: 0, insightful: 0 },
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setSelectedImage(null);
    toast.success('Your pulse has been synchronized with the network!');
  };

  const handleReply = (commentId: string) => {
    if (!replyText.trim() && !replyImage) return;

    const newReply: Reply = {
      id: Math.random().toString(36).substr(2, 9),
      commentId,
      author: 'Strategy Analyst',
      avatar: `https://i.pravatar.cc/150?u=guest${Math.random()}`,
      content: replyText,
      image: replyImage || undefined,
      createdAt: new Date().toISOString(),
      reactions: { like: 0, heart: 0, insightful: 0 }
    };

    setComments(comments.map(c => 
      c.id === commentId ? { ...c, replies: [...c.replies, newReply] } : c
    ));
    setReplyText('');
    setReplyImage(null);
    setReplyingTo(null);
    toast.success('Reply deployed to the engine!');
  };

  const handleReaction = (commentId: string, type: 'like' | 'heart' | 'insightful', isReply = false, replyId?: string) => {
    setComments(comments.map(c => {
      if (isReply && replyId) {
        if (c.id === commentId) {
          return {
            ...c,
            replies: c.replies.map(r => 
              r.id === replyId ? { ...r, reactions: { ...r.reactions, [type]: (r.reactions as any)[type] + 1 } } : r
            )
          };
        }
      } else if (c.id === commentId) {
        return { ...c, reactions: { ...c.reactions, [type]: (c.reactions as any)[type] + 1 } };
      }
      return c;
    }));
  };

  return (
    <div className="mt-32 border-t-[12px] border-[#0A0F1E] pt-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div>
          <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter flex items-center gap-4 leading-none">
            <MessageSquare className="w-12 h-12 text-[#0066FF]" /> THE FEEDBACK LOOP
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mt-2">Collaborative Intelligence Interface</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] bg-[#FF6B00] text-white px-6 py-3 shadow-[8px_8px_0px_0px_rgba(255,107,0,0.2)]">
            {comments.length} NODES CONNECTED
          </span>
        </div>
      </div>

      <div className="bg-gray-50 p-8 md:p-12 border-2 border-[#0A0F1E] mb-20 relative group overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/5 -mr-32 -mt-32 rounded-full blur-3xl group-hover:bg-[#0066FF]/10 transition-colors" />
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          <div className="flex items-center gap-4 mb-8"><div className="w-12 h-12 bg-[#0A0F1E] flex items-center justify-center"><Zap className="w-6 h-6 text-[#FF6B00]" /></div><h4 className="text-xl font-black uppercase italic tracking-tight">Deploy Your Strategy Pulse</h4></div>
          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="w-full p-8 bg-white border-2 border-gray-100 font-bold text-lg tracking-wide focus:border-[#0066FF] outline-none min-h-[180px] transition-all placeholder:text-gray-300" placeholder="WHAT'S YOUR PULSE ON THIS ARCHITECTURE?" />
          {selectedImage && (
            <div className="relative inline-block mt-4 group"><img src={selectedImage} alt="Preview" className="h-48 w-auto object-cover border-4 border-white shadow-xl" /><button type="button" onClick={() => setSelectedImage(null)} className="absolute -top-4 -right-4 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition-colors"><X className="w-5 h-5" /></button></div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-8"><button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-[#0066FF] hover:text-[#FF6B00] transition-all"><Camera className="w-6 h-6" /> ATTACH VISUAL ASSET</button><input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e)} className="hidden" accept="image/*" /><div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400"><ShieldCheck className="w-4 h-4 text-green-500" /> SECURE PROTOCOL</div></div>
            <Button type="submit" disabled={!newComment.trim() && !selectedImage} className="bg-[#0A0F1E] hover:bg-[#0066FF] text-white rounded-none h-16 px-16 font-black uppercase italic tracking-[0.2em] transition-all group w-full sm:w-auto shadow-[12px_12px_0px_0px_rgba(0,102,255,0.2)] disabled:opacity-50">TRANSMIT PULSE <Send className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" /></Button>
          </div>
        </form>
      </div>

      <div className="space-y-20">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4"><Loader2 className="w-12 h-12 animate-spin text-[#0066FF]" /><span className="text-[10px] font-black uppercase tracking-[0.4em]">Synchronizing Content Archive...</span></div>
        ) : (
          mounted ? (
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div key={comment.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="shrink-0"><div className="relative"><img src={comment.avatar} alt={comment.author} className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-xl grayscale hover:grayscale-0 transition-all duration-700" />{comment.author === CEO_NAME && <div className="absolute -bottom-3 -right-3 bg-[#FF6B00] p-2 shadow-xl rotate-12"><Award className="w-5 h-5 text-white" /></div>}</div></div>
                    <div className="flex-1 border-b-2 border-gray-50 pb-20">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6"><div><h5 className="font-black uppercase italic tracking-widest text-xl flex items-center gap-3">{comment.author}{comment.author === CEO_NAME && <Badge className="bg-[#0066FF] text-[10px] rounded-none py-1 px-3 border-none shadow-lg">FOUNDER</Badge>}</h5><span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">SYSTEM ID: {comment.id} // DEPLOYED: {new Date(comment.createdAt).toLocaleDateString()}</span></div></div>
                      <p className="text-gray-600 font-medium leading-[1.8] mb-8 text-lg md:text-xl">{comment.content}</p>
                      {comment.image && <div className="mb-10 overflow-hidden border-[12px] border-white shadow-2xl max-w-2xl relative group"><img src={comment.image} alt="User strategy asset" className="w-full h-auto hover:scale-105 transition-transform duration-1000" /><div className="absolute bottom-6 right-6 bg-black/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 group-hover:bg-[#FF6B00] transition-colors">VISUAL STRATEGY ASSET</div></div>}
                      <div className="flex flex-wrap items-center gap-10">
                        <div className="flex gap-8">
                           <button onClick={() => handleReaction(comment.id, 'like')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest hover:text-[#0066FF] transition-all group"><ThumbsUp className={`w-5 h-5 group-hover:-translate-y-1 transition-transform ${comment.reactions.like > 0 ? 'text-[#0066FF]' : ''}`} /> {comment.reactions.like} <span className="text-gray-300">RESONATE</span></button>
                           <button onClick={() => handleReaction(comment.id, 'heart')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest hover:text-red-500 transition-all group"><Heart className={`w-5 h-5 group-hover:scale-125 transition-transform ${comment.reactions.heart > 0 ? 'text-red-500' : ''}`} /> {comment.reactions.heart} <span className="text-gray-300">PULSE</span></button>
                           <button onClick={() => handleReaction(comment.id, 'insightful')} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest hover:text-[#FF6B00] transition-all group"><Zap className={`w-5 h-5 group-hover:rotate-12 transition-transform ${comment.reactions.insightful > 0 ? 'text-[#FF6B00]' : ''}`} /> {comment.reactions.insightful} <span className="text-gray-300">INSIGHT</span></button>
                        </div>
                        <button onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-[#0066FF] hover:text-[#FF6B00] transition-all underline decoration-2 underline-offset-8"><ReplyIcon className="w-5 h-5" /> {comment.replies.length} REPLIES</button>
                      </div>
                      <AnimatePresence>
                        {replyingTo === comment.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-12 overflow-hidden border-l-[10px] border-[#0066FF] bg-white"><div className="p-8 md:p-10 shadow-inner flex flex-col gap-6"><textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="DEPLOY SYSTEM REPLY..." className="w-full bg-gray-50 p-8 font-black uppercase text-xs tracking-widest outline-none border-2 border-gray-100 focus:bg-white focus:border-[#0066FF] transition-all min-h-[140px]" />{replyImage && (<div className="relative inline-block mt-2 group"><img src={replyImage} alt="Reply preview" className="h-32 w-auto object-cover border-4 border-white shadow-lg" /><button onClick={() => setReplyImage(null)} className="absolute -top-3 -right-3 bg-red-600 text-white p-2 rounded-full"><X className="w-4 h-4" /></button></div>)}<div className="flex items-center justify-between"><button onClick={() => replyFileInputRef.current?.click()} className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#0066FF] transition-all"><ImageIcon className="w-5 h-5" /> ATTACH MEDIA</button><input type="file" ref={replyFileInputRef} onChange={(e) => handleImageUpload(e, true)} className="hidden" accept="image/*" /><div className="flex gap-4"><Button variant="ghost" onClick={() => setReplyingTo(null)} className="text-xs font-black uppercase h-14 px-8">ABORT</Button><Button onClick={() => handleReply(comment.id)} className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-none font-black uppercase text-xs h-14 px-12 italic shadow-lg">TRANSMIT</Button></div></div></div></motion.div>
                        )}
                      </AnimatePresence>
                      {comment.replies.length > 0 && (
                        <div className="mt-16 space-y-12 pl-12 md:pl-20 border-l-4 border-gray-100">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex flex-col md:flex-row gap-6 md:gap-10 group">
                              <div className="shrink-0"><img src={reply.avatar} alt={reply.author} className="w-16 h-16 md:w-20 md:h-20 border-2 border-[#0066FF] grayscale group-hover:grayscale-0 transition-all duration-500 shadow-lg" /></div>
                              <div className="flex-1"><div className="flex items-center gap-4 mb-3"><h6 className="font-black uppercase italic text-sm flex items-center gap-3">{reply.author}{reply.author === CEO_NAME && <Badge className="bg-[#FF6B00] text-[8px] rounded-none py-0.5 px-2 border-none shadow-md">CEO</Badge>}</h6><span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{new Date(reply.createdAt).toLocaleTimeString()}</span></div><p className="text-base text-gray-600 font-medium leading-[1.8] mb-6">{reply.content}</p>{reply.image && <div className="mb-6 overflow-hidden border-4 border-white shadow-xl max-w-sm"><img src={reply.image} alt="Reply asset" className="w-full h-auto" /></div>}<div className="flex gap-6"><button onClick={() => handleReaction(comment.id, 'like', true, reply.id)} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0066FF] transition-colors">RESONATE ({reply.reactions.like})</button><button onClick={() => handleReaction(comment.id, 'insightful', true, reply.id)} className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#FF6B00] transition-colors">ANALYZE ({reply.reactions.insightful})</button></div></div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <div className="space-y-20">
              {comments.map((comment) => (
                <div key={comment.id} className="relative">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="shrink-0"><div className="relative"><img src={comment.avatar} alt={comment.author} className="w-20 h-20 md:w-24 md:h-24 border-4 border-white shadow-xl grayscale" /></div></div>
                    <div className="flex-1 border-b-2 border-gray-50 pb-20">
                      <h5 className="font-black uppercase italic tracking-widest text-xl">{comment.author}</h5>
                      <p className="text-gray-600 font-medium leading-[1.8] mb-8 text-lg md:text-xl">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};