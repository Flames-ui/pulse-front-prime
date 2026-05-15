"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_POSTS, CEO_NAME, CEO_AVATAR } from '@/lib/data';
import { SEO } from '@/components/blog/SEO';
import { 
  Calendar, Clock, Eye, ChevronRight, User, ArrowLeft, ArrowRight, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, useScroll, useSpring } from 'framer-motion';
import { InternalLinker } from '@/components/blog/InternalLinker';
import { CommentsSection } from '@/components/blog/Comments';
import { SocialShare, PostFAQ, HelpfulWidget } from '@/components/blog/BlogComponents';
import { incrementViewCount } from '@/lib/supabase';

const SinglePost = () => {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const slug = params?.slug as string;
  
  const post = useMemo(() => MOCK_POSTS.find(p => p.slug === slug), [slug]);
  
  const relatedPosts = useMemo(() => 
    MOCK_POSTS.filter(p => p.slug !== slug && p.category === post?.category).slice(0, 3),
    [slug, post]
  );

  const prevPost = useMemo(() => {
    const idx = MOCK_POSTS.findIndex(p => p.slug === slug);
    return idx > 0 ? MOCK_POSTS[idx - 1] : null;
  }, [slug]);

  const nextPost = useMemo(() => {
    const idx = MOCK_POSTS.findIndex(p => p.slug === slug);
    return idx < MOCK_POSTS.length - 1 ? MOCK_POSTS[idx + 1] : null;
  }, [slug]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    if (post) incrementViewCount(post.slug);
  }, [slug, post]);

  if (!mounted) return null;
  if (!post) return <NotFound />;

  const templateId = post.templateId ?? (parseInt(post.id) % 6);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#0066FF] selection:text-white pt-20 md:pt-24">
      <SEO 
        title={post.title} 
        description={post.excerpt}
        image={post.featuredImage}
        type="article"
        category={post.category}
        tags={post.tags}
        publishedTime={post.publishedDate}
        modifiedTime={post.updatedDate}
      />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#FF6B00] z-[100] origin-left shadow-[0_2px_8px_rgba(255,107,0,0.3)]"
        style={{ scaleX }}
      />

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-[#0066FF]">HOME</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to={`/category/${post.category.toLowerCase()}`} className="hover:text-[#0066FF]">{post.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="truncate">{post.title}</span>
        </div>
      </div>

      <RenderTemplate 
        post={post} 
        templateId={templateId} 
        relatedPosts={relatedPosts} 
        prevPost={prevPost} 
        nextPost={nextPost}
        currentUrl={currentUrl}
      />
    </div>
  );
};

const RenderTemplate = ({ post, templateId, relatedPosts, prevPost, nextPost, currentUrl }: any) => {
  const commonBottom = (
    <>
      <HelpfulWidget postId={post.id} />
      <div className="mt-12 flex flex-wrap gap-2">
        {post.tags.map((tag: string) => (
          <Link key={tag} to={`/tag/${tag.toLowerCase()}`}>
            <Badge variant="outline" className="rounded-none border-2 font-black uppercase text-[10px] h-8 px-4 hover:bg-black hover:text-white transition-all">#{tag}</Badge>
          </Link>
        ))}
      </div>
      <div className="mt-12 py-8 border-y-2 border-gray-100 flex justify-between items-center">
        <span className="font-black uppercase text-xs italic">SHARE THIS PULSE:</span>
        <SocialShare title={post.title} url={currentUrl} />
      </div>
      <BioSection bio={post.authorBio} />
      <NavigationSection prev={prevPost} next={nextPost} />
      <RelatedGrid posts={relatedPosts} />
      <CommentsSection postId={post.id} />
    </>
  );

  switch (templateId) {
    case 1: // Immersive
      return (
        <article className="pb-24">
          <header className="h-[70vh] relative flex items-end overflow-hidden mb-12">
            <img src={post.featuredImage} alt={post.altText} className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1E] via-[#0A0F1E]/60 to-transparent" />
            <div className="container mx-auto px-4 relative z-10 pb-12 md:pb-20">
              <div className="max-w-4xl">
                <Badge className="bg-[#FF6B00] text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-none mb-6">IMMERSIVE VIEW</Badge>
                <h1 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-white mb-8">{post.title}</h1>
                <MetaInfo post={post} dark />
              </div>
            </div>
          </header>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="blog-content"><InternalLinker content={post.content} posts={MOCK_POSTS} currentSlug={post.slug} /></div>
              <PostFAQ faqs={post.faqs} />
              {commonBottom}
            </div>
          </div>
        </article>
      );
    case 2: // Focus
      return (
        <article className="pb-24 bg-gray-50/50">
          <div className="container mx-auto px-4 pt-12 md:pt-20">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Badge className="bg-[#0A0F1E] text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-none mb-8">FOCUS ENGINE</Badge>
              <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-tight mb-8">{post.title}</h1>
              <div className="flex justify-center"><MetaInfo post={post} /></div>
            </div>
            <div className="max-w-5xl mx-auto mb-16 shadow-2xl"><img src={post.featuredImage} alt={post.altText} className="w-full h-auto" /></div>
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-16 border-2 border-gray-100">
              <div className="blog-content"><InternalLinker content={post.content} posts={MOCK_POSTS} currentSlug={post.slug} /></div>
              <PostFAQ faqs={post.faqs} />
              {commonBottom}
            </div>
          </div>
        </article>
      );
    case 3: // Magazine
      return (
        <article className="pb-24">
          <div className="container mx-auto px-4 pt-8">
            <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
              <div className="lg:col-span-7">
                <Badge className="bg-[#0066FF] text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-none mb-6">MAGAZINE LAYOUT</Badge>
                <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">{post.title}</h1>
                <MetaInfo post={post} />
              </div>
              <div className="lg:col-span-5 relative">
                 <img src={post.featuredImage} alt={post.altText} className="w-full aspect-square object-cover grayscale" />
                 <div className="absolute -bottom-6 -left-6 w-full h-full border-[12px] border-[#0066FF]/10 -z-10" />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-3/4">
                <div className="blog-content columns-1 md:columns-2 gap-12"><InternalLinker content={post.content} posts={MOCK_POSTS} currentSlug={post.slug} /></div>
                <PostFAQ faqs={post.faqs} />
                {commonBottom}
              </div>
              <Sidebar relatedPosts={relatedPosts} />
            </div>
          </div>
        </article>
      );
    default: // Standard
      return (
        <article className="pb-24">
          <div className="bg-[#0A0F1E] text-white pt-12 pb-24 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <Badge className="bg-[#0066FF] text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-none border-none mb-6">STANDARD ARCHITECTURE</Badge>
              <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9] mb-12">{post.title}</h1>
              <MetaInfo post={post} dark />
            </div>
          </div>
          <div className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-2/3">
                <div className="overflow-hidden border-[8px] border-white shadow-2xl mb-12"><img src={post.featuredImage} alt={post.altText} className="w-full h-auto" /></div>
                <div className="blog-content"><InternalLinker content={post.content} posts={MOCK_POSTS} currentSlug={post.slug} /></div>
                <PostFAQ faqs={post.faqs} />
                {commonBottom}
              </div>
              <Sidebar relatedPosts={relatedPosts} />
            </div>
          </div>
        </article>
      );
  }
};

const MetaInfo = ({ post, dark = false }: any) => (
  <div className={`flex flex-wrap gap-6 items-center font-black uppercase text-[9px] tracking-widest ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
    <span className="flex items-center gap-2"><User className="w-3 h-3 text-[#0066FF]" /> {post.author}</span>
    <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-[#FF6B00]" /> {post.publishedDate}</span>
    <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-[#0066FF]" /> {post.readTime}</span>
    <span className="flex items-center gap-2"><Eye className="w-3 h-3 text-[#FF6B00]" /> {post.viewCount.toLocaleString()} VIEWS</span>
  </div>
);

const BioSection = ({ bio }: { bio?: string }) => (
  <div className="bg-[#0A0F1E] text-white p-8 md:p-12 mt-20 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 rounded-full blur-3xl" />
    <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
      <img src={CEO_AVATAR} alt={CEO_NAME} className="w-24 h-24 md:w-40 md:h-40 object-cover border-4 border-white grayscale" />
      <div className="flex-1">
        <p className="text-[#FF6B00] font-black uppercase tracking-widest text-[8px] mb-2">THE ARCHITECT</p>
        <h3 className="text-2xl md:text-4xl font-black uppercase italic mb-4">{CEO_NAME}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{bio || CEO_NAME + " is a leader in digital strategy and high-performance content creation."}</p>
        <div className="flex gap-4 mt-6">
           <Button variant="outline" className="rounded-none border-white/20 h-10 font-black text-[9px] uppercase tracking-widest">X ENGINE</Button>
           <Button variant="outline" className="rounded-none border-white/20 h-10 font-black text-[9px] uppercase tracking-widest">LINKEDIN</Button>
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = ({ relatedPosts }: any) => (
  <aside className="lg:w-1/3">
    <div className="sticky top-32 space-y-12">
      <div className="bg-[#0A0F1E] p-10 text-white relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#FF6B00]/20 rounded-full blur-2xl" />
        <Zap className="w-10 h-10 text-[#FF6B00] mb-6" />
        <h4 className="text-2xl font-black uppercase italic mb-4 leading-none">JOIN THE <br/> PULSE</h4>
        <p className="text-[10px] text-gray-500 mb-8 font-black uppercase tracking-widest">WEEKLY BLUEPRINTS FOR GIANT GROWTH.</p>
        <div className="space-y-4">
          <input className="w-full bg-white/5 border border-white/10 p-4 text-[10px] font-black uppercase outline-none focus:border-[#0066FF] transition-colors" placeholder="ENGINE-ID@MAIL.COM" />
          <Button className="w-full bg-[#0066FF] hover:bg-[#0066FF]/90 text-white rounded-none font-black italic uppercase h-14 tracking-widest shadow-xl shadow-blue-500/20">ENGAGE ENGINE</Button>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-black uppercase tracking-widest mb-8 border-b-4 border-[#0A0F1E] pb-4">RELATED BLUEPRINTS</h4>
        <div className="space-y-8">
          {relatedPosts.map((p: any) => (
            <Link key={p.id} to={`/blog/${p.slug}`} className="flex gap-4 group">
              <div className="w-24 h-24 shrink-0 overflow-hidden border-2 border-gray-100">
                <img src={p.featuredImage} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[8px] font-black uppercase text-[#FF6B00] mb-1">{p.category}</p>
                <h5 className="font-black uppercase text-xs leading-tight group-hover:text-[#0066FF] transition-colors">{p.title}</h5>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div></aside>
);

const NavigationSection = ({ prev, next }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-gray-100 mt-20">
    <div className="p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-gray-100 group cursor-pointer hover:bg-gray-50 transition-colors">
      {prev && (
        <Link to={`/blog/${prev.slug}`}>
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2"><ArrowLeft className="w-3 h-3" /> PREVIOUS PULSE</p>
          <h4 className="text-lg font-black uppercase italic leading-none group-hover:text-[#0066FF] transition-colors">{prev.title}</h4>
        </Link>
      )}
    </div>
    <div className="p-8 md:p-12 group cursor-pointer hover:bg-gray-50 transition-colors text-right">
      {next && (
        <Link to={`/blog/${next.slug}`}>
          <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center justify-end gap-2">NEXT PULSE <ArrowRight className="w-3 h-3" /></p>
          <h4 className="text-lg font-black uppercase italic leading-none group-hover:text-[#FF6B00] transition-colors">{next.title}</h4>
        </Link>
      )}
    </div>
  </div>
);

const RelatedGrid = ({ posts }: { posts: any[] }) => (
  <div className="mt-20">
    <h3 className="text-2xl font-black uppercase italic mb-10 border-l-8 border-[#0066FF] pl-6">EXPLORE MORE BLUEPRINTS</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {posts.map(p => (
        <Link key={p.id} to={`/blog/${p.slug}`} className="group">
           <div className="aspect-video overflow-hidden mb-4 border-2 border-gray-100"><img src={p.featuredImage} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" /></div>
           <p className="text-[8px] font-black text-[#FF6B00] uppercase mb-2">{p.category}</p>
           <h4 className="font-black uppercase text-sm group-hover:text-[#0066FF] transition-colors">{p.title}</h4>
        </Link>
      ))}
    </div>
  </div>
);

const NotFound = () => (
  <div className="py-40 text-center flex flex-col items-center justify-center min-h-screen">
    <div className="w-24 h-24 bg-[#0A0F1E] flex items-center justify-center mb-8 rotate-12"><Zap className="w-12 h-12 text-[#FF6B00]" /></div>
    <h1 className="text-4xl md:text-7xl font-black uppercase italic mb-8 tracking-tighter">404: PULSE NOT FOUND</h1>
    <Button asChild className="bg-[#0066FF] hover:bg-[#0066FF]/90 rounded-none h-16 px-12 font-black italic uppercase"><Link to="/">RESTART SYSTEM</Link></Button>
  </div>
);

export default SinglePost;