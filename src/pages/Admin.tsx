"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, FileText, MessageSquare, Settings, LogOut, 
  Plus, Search, Eye, Edit2, Trash2, TrendingUp, Users, 
  BarChart3, Image as ImageIcon, Globe, CheckCircle2, 
  ChevronRight, Hash, ShieldCheck, Mail, ArrowRight, Loader2, Calendar, Clock,
  PlusCircle, Layout, Share2, AlertTriangle, Filter, MoreHorizontal
} from 'lucide-react';
import { MOCK_POSTS, CEO_NAME, CEO_AVATAR, CATEGORIES } from '@/lib/data';
import { Post, Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

export const Admin = () => {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Editor State
  const [postData, setPostData] = useState<Partial<Post>>({
    title: '', slug: '', category: CATEGORIES[0].name, excerpt: '', templateId: 0, faqs: [{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: 'START ARCHITECTING HIGH-PERFORMANCE CONTENT...' }),
    ],
    content: '',
  });

  const stats = useMemo(() => ({
    totalViews: posts.reduce((acc, p) => acc + p.viewCount, 0),
    avgReadTime: '12 min',
    activePosts: posts.filter(p => p.status === 'published').length,
    pendingComments: 14,
  }), [posts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      if (loginForm.email === 'admin@giantpulse.com' && loginForm.password === 'admin123') {
        setIsAuthenticated(true);
        toast.success('ACCESS GRANTED: SYSTEM SYNCHRONIZED');
      } else {
        toast.error('ACCESS DENIED: INVALID KEY');
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleOpenEditor = (post: Post | null = null) => {
    if (post) {
      setEditingPost(post);
      setPostData(post);
      editor?.commands.setContent(post.content);
    } else {
      setEditingPost(null);
      setPostData({ title: '', slug: '', category: CATEGORIES[0].name, excerpt: '', templateId: 0, faqs: [{ question: '', answer: '' }, { question: '', answer: '' }, { question: '', answer: '' }] });
      editor?.commands.setContent('');
    }
    setIsEditorOpen(true);
  };

  const handleSave = () => {
    const content = editor?.getHTML() || '';
    if (!postData.title) return toast.error('TITLE REQUIRED');
    
    const finalPost: Post = {
      ...editingPost as Post,
      ...postData,
      content,
      id: editingPost?.id || Math.random().toString(36).substr(2, 9),
      publishedDate: editingPost?.publishedDate || new Date().toISOString().split('T')[0],
      updatedDate: new Date().toISOString().split('T')[0],
      viewCount: editingPost?.viewCount || 0,
      reactions: editingPost?.reactions || { helpful: 0, notHelpful: 0, like: 0, heart: 0, insightful: 0 },
      status: 'published',
      author: CEO_NAME,
      authorAvatar: CEO_AVATAR,
      readTime: '10 min',
    } as Post;

    if (editingPost) {
      setPosts(posts.map(p => p.id === editingPost.id ? finalPost : p));
    } else {
      setPosts([finalPost, ...posts]);
    }
    setIsEditorOpen(false);
    toast.success('PULSE DEPLOYED SUCCESSFULLY');
  };

  if (!isAuthenticated) return <LoginScreen form={loginForm} setForm={setLoginForm} onSubmit={handleLogin} loading={isLoggingIn} />;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b h-20 flex items-center justify-between px-12 sticky top-0 z-40">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter">{activeTab.replace('-', ' ')}</h2>
          <Button onClick={() => handleOpenEditor()} className="bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white rounded-none font-black italic uppercase px-8">
            <Plus className="w-5 h-5 mr-2" /> NEW PULSE
          </Button>
        </header>

        <div className="p-12 max-w-7xl mx-auto">
          {activeTab === 'dashboard' && <DashboardView stats={stats} posts={posts} onEdit={handleOpenEditor} />}
          {activeTab === 'posts' && <PostsView posts={posts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onEdit={handleOpenEditor} onDelete={(id) => setPosts(posts.filter(p => p.id !== id))} />}
          {activeTab === 'comments' && <PlaceholderView title="FEEDBACK MODERATION" />}
          {activeTab === 'analytics' && <PlaceholderView title="CORE METRICS" />}
          {activeTab === 'settings' && <PlaceholderView title="SYSTEM CONFIG" />}
        </div>
      </main>

      {mounted && (
        <AnimatePresence>
          {isEditorOpen && (
            <EditorModal 
              data={postData} 
              setData={setPostData} 
              editor={editor} 
              onClose={() => setIsEditorOpen(false)} 
              onSave={handleSave} 
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const LoginScreen = ({ form, setForm, onSubmit, loading }: any) => (
  <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center p-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#0066FF]/10 rounded-full blur-[160px]" />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 shadow-2xl space-y-12 border-b-8 border-[#FF6B00]">
        <div className="text-center space-y-4">
          <div className="inline-flex bg-[#0066FF] p-4 shadow-xl mb-4"><ShieldCheck className="w-10 h-10 text-white" /></div>
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">COMMAND CENTER</h1>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">RESTRICTED ACCESS</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          <input 
            type="email" placeholder="ADMIN@GIANTPULSE.COM" required
            className="w-full bg-white/5 border-2 border-white/10 p-5 text-white font-black uppercase text-xs focus:border-[#0066FF] outline-none"
            value={form.email} onChange={e => setForm({...form, email: e.target.value})}
          />
          <input 
            type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" required
            className="w-full bg-white/5 border-2 border-white/10 p-5 text-white font-black uppercase text-xs focus:border-[#FF6B00] outline-none"
            value={form.password} onChange={e => setForm({...form, password: e.target.value})}
          />
          <Button disabled={loading} className="w-full bg-[#0066FF] h-16 font-black italic uppercase tracking-widest">
            {loading ? <Loader2 className="animate-spin" /> : 'INITIALIZE PROTOCOL'}
          </Button>
        </form>
        <p className="text-center text-[8px] font-black text-gray-600 uppercase tracking-widest">Hint: admin@giantpulse.com / admin123</p>
      </div>
    </motion.div>
  </div>
);

const AdminSidebar = ({ activeTab, setActiveTab, onLogout }: any) => (
  <aside className="w-80 bg-[#0A0F1E] text-white flex flex-col sticky top-0 h-screen z-50 border-r border-white/5">
    <div className="p-10 border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="bg-[#0066FF] w-12 h-12 flex items-center justify-center"><BarChart3 className="w-7 h-7" /></div>
        <div>
          <span className="font-black italic uppercase tracking-tighter text-2xl">PULSE</span>
          <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gray-500 block">CONTROL</span>
        </div>
      </div>
    </div>
    <nav className="flex-1 p-8 space-y-2">
      {[
        { id: 'dashboard', icon: LayoutDashboard, label: 'DASHBOARD' },
        { id: 'posts', icon: FileText, label: 'POSTS' },
        { id: 'comments', icon: MessageSquare, label: 'COMMENTS' },
        { id: 'analytics', icon: TrendingUp, label: 'ANALYTICS' },
        { id: 'settings', icon: Settings, label: 'SETTINGS' },
      ].map(item => (
        <button
          key={item.id} onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center gap-5 px-6 py-4 font-black text-[11px] uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-[#0066FF] text-white translate-x-2 shadow-xl' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
        >
          <item.icon className="w-5 h-5" /> {item.label}
        </button>
      ))}
    </nav>
    <div className="p-10 border-t border-white/5 bg-black/20">
      <div className="flex items-center gap-4 mb-8"><img src={CEO_AVATAR} className="w-10 h-10 border-2 border-[#0066FF] grayscale" alt="" /><div><p className="text-[10px] font-black uppercase">{CEO_NAME}</p><p className="text-[8px] text-[#FF6B00] font-black italic">ADMIN</p></div></div>
      <button onClick={onLogout} className="flex items-center gap-3 text-red-400 font-black text-[11px] uppercase tracking-widest hover:bg-red-500/10 w-full p-4 border-2 border-red-400/20"><LogOut className="w-4 h-4" /> LOGOUT</button>
    </div>
  </aside>
);

const DashboardView = ({ stats, posts, onEdit }: any) => (
  <div className="space-y-12">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {[
        { label: 'TOTAL VIEWS', value: stats.totalViews.toLocaleString(), icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'ACTIVE PULSES', value: stats.activePosts, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
        { label: 'AVG READ', value: stats.avgReadTime, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'PENDING', value: stats.pendingComments, icon: MessageSquare, color: 'text-green-600', bg: 'bg-green-50' },
      ].map((s, i) => (
        <Card key={i} className="border-none shadow-sm rounded-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{s.label}</CardTitle><s.icon className={`w-5 h-5 ${s.color}`} /></CardHeader>
          <CardContent><div className="text-4xl font-black italic">{s.value}</div></CardContent>
        </Card>
      ))}
    </div>
    <Card className="border-none shadow-sm rounded-none">
      <CardHeader className="border-b px-10 py-6"><CardTitle className="text-sm font-black uppercase italic tracking-widest">RECENT ARCHITECTURE</CardTitle></CardHeader>
      <CardContent className="p-0">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 border-b">
            <tr><th className="px-10 py-5">TITLE</th><th className="px-10 py-5">METRICS</th><th className="px-10 py-5 text-right">ACTION</th></tr>
          </thead>
          <tbody className="divide-y">
            {posts.slice(0, 5).map((p: Post) => (
              <tr key={p.id} className="hover:bg-gray-50/50">
                <td className="px-10 py-5 font-black uppercase text-xs italic">{p.title}</td>
                <td className="px-10 py-5 font-mono text-xs">{p.viewCount.toLocaleString()} VIEWS</td>
                <td className="px-10 py-5 text-right"><Button variant="ghost" size="icon" onClick={() => onEdit(p)}><Edit2 className="w-4 h-4" /></Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
);

const PostsView = ({ posts, searchQuery, setSearchQuery, onEdit, onDelete }: any) => (
  <div className="space-y-8">
    <div className="bg-white p-6 border-l-8 border-[#0066FF] shadow-sm flex flex-col md:row gap-4 items-center">
      <div className="relative flex-1 w-full"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><Input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="SEARCH ARCHIVES..." className="pl-12 h-14 rounded-none" /></div>
      <Button variant="outline" className="h-14 rounded-none font-black uppercase text-[10px]"><Filter className="w-4 h-4 mr-2" /> FILTERS</Button>
    </div>
    <Card className="border-none shadow-sm rounded-none"><CardContent className="p-0">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-[10px] font-black uppercase text-gray-400 border-b">
          <tr><th className="px-10 py-6">TITLE</th><th className="px-10 py-6">CATEGORY</th><th className="px-10 py-6">VIEWS</th><th className="px-10 py-6 text-right">ACTIONS</th></tr>
        </thead>
        <tbody className="divide-y">
          {posts.filter((p: any) => p.title.toLowerCase().includes(searchQuery.toLowerCase())).map((p: Post) => (
            <tr key={p.id} className="hover:bg-gray-50/50">
              <td className="px-10 py-6 font-black uppercase text-sm italic">{p.title}</td>
              <td className="px-10 py-6"><Badge className="bg-gray-100 text-gray-600 rounded-none">{p.category}</Badge></td>
              <td className="px-10 py-6 font-mono text-xs">{p.viewCount}</td>
              <td className="px-10 py-6 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(p)}><Edit2 className="w-4 h-4 text-blue-600" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(p.id)}><Trash2 className="w-4 h-4 text-red-600" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </CardContent></Card>
  </div>
);

const EditorModal = ({ data, setData, editor, onClose, onSave }: any) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-8">
    <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white w-full max-w-[1400px] h-full flex flex-col overflow-hidden">
      <header className="bg-gray-50 border-b p-8 flex justify-between items-center">
        <h3 className="text-2xl font-black uppercase italic">PULSE ARCHITECT <span className="text-[#0066FF] ml-2">v5.0</span></h3>
        <div className="flex gap-4">
          <Button variant="ghost" onClick={onClose} className="font-black uppercase text-xs">CANCEL</Button>
          <Button onClick={onSave} className="bg-[#0066FF] text-white rounded-none px-12 font-black italic uppercase">DEPLOY ENGINE</Button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-12 md:p-20">
           <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-4"><label className="text-[10px] font-black uppercase text-[#0066FF]">HEADLINE</label><input value={data.title} onChange={e => setData({...data, title: e.target.value})} className="w-full text-5xl font-black uppercase italic border-none focus:outline-none placeholder:text-gray-100" placeholder="DEFINE HEADLINE..." /></div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4"><label className="text-[10px] font-black uppercase">CATEGORY</label><select value={data.category} onChange={e => setData({...data, category: e.target.value})} className="w-full p-4 border-2 font-black uppercase text-xs outline-none">{CATEGORIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}</select></div>
                <div className="space-y-4"><label className="text-[10px] font-black uppercase">TEMPLATE</label><select value={data.templateId} onChange={e => setData({...data, templateId: parseInt(e.target.value)})} className="w-full p-4 border-2 font-black uppercase text-xs outline-none">{[0,1,2,3,4,5].map(i => <option key={i} value={i}>TEMPLATE ENGINE {i+1}</option>)}</select></div>
              </div>
              <div className="border-2 min-h-[500px] flex flex-col">
                <EditorContent editor={editor} className="prose prose-xl max-w-none p-10 focus:outline-none flex-1" />
              </div>
              <div className="space-y-6">
                 <h4 className="font-black uppercase italic border-b-4 border-black pb-2">FAQ MODULE (MIN 3)</h4>
                 {data.faqs?.map((f: any, i: number) => (
                   <div key={i} className="space-y-2">
                     <Input placeholder="QUESTION" value={f.question} onChange={e => { const newFaqs = [...data.faqs]; newFaqs[i].question = e.target.value; setData({...data, faqs: newFaqs}); }} />
                     <Input placeholder="ANSWER" value={f.answer} onChange={e => { const newFaqs = [...data.faqs]; newFaqs[i].answer = e.target.value; setData({...data, faqs: newFaqs}); }} />
                   </div>
                 ))}
              </div>
           </div>
        </div>
        <aside className="w-[400px] bg-gray-50 border-l p-10 space-y-10 overflow-y-auto">
           <div className="space-y-4"><h5 className="font-black uppercase italic border-b-2 pb-2">SEO CORE</h5><Input placeholder="FOCUS KEYWORD" /><textarea value={data.excerpt} onChange={e => setData({...data, excerpt: e.target.value})} placeholder="META DESCRIPTION (160 CHARS)" className="w-full p-4 border-2 text-xs h-32 outline-none" /></div>
           <div className="space-y-4"><h5 className="font-black uppercase italic border-b-2 pb-2">MEDIA ASSETS</h5><div className="aspect-video bg-white border-4 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#0066FF] transition-all"><ImageIcon className="w-10 h-10 text-gray-200" /><span className="text-[9px] font-black uppercase text-gray-400 mt-4">UPLOAD VISUAL</span></div></div>
        </aside>
      </div>
    </motion.div>
  </motion.div>
);

const PlaceholderView = ({ title }: { title: string }) => (
  <div className="h-96 flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-100">
    <BarChart3 className="w-12 h-12 text-gray-100 mb-4" />
    <h3 className="text-2xl font-black uppercase italic text-gray-300">{title} MODULE INERT</h3>
    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mt-2">CONTACT SYSTEM ADMINISTRATOR FOR UPLINK</p>
  </div>
);

export default Admin;