"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';
import { 
  CommandDialog, 
  CommandInput, 
  CommandList, 
  CommandEmpty, 
  CommandGroup, 
  CommandItem 
} from '@/components/ui/command';
import { Search, History, Zap, ArrowRight, Loader2 } from 'lucide-react';
import { fullTextSearch } from '@/lib/supabase';
import { Post } from '@/lib/types';
import { toast } from 'sonner';

export function SearchModal({ 
  isOpen, 
  setIsOpen 
}: { 
  isOpen: boolean; 
  setIsOpen: (open: boolean) => void 
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  // Safe router access for dual environments
  let nextRouter: any = null;
  try {
    nextRouter = useNextRouter();
  } catch (e) {
    // Not in Next.js environment
  }

  useEffect(() => {
    const saved = localStorage.getItem('recent-searches');
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const saveRecent = useCallback((term: string) => {
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recent-searches', JSON.stringify(updated));
  }, [recentSearches]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const { data, error } = await fullTextSearch(query);
        if (error) throw error;
        setResults(data || []);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (slug: string, title: string) => {
    saveRecent(title);
    setIsOpen(false);
    toast.success(`ENGINE NAVIGATING TO: ${title.toUpperCase()}`);
    
    if (nextRouter) {
      nextRouter.push(`/blog/${slug}`);
    } else if (typeof window !== 'undefined') {
      window.location.href = `/blog/${slug}`;
    }
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="bg-[#0A0F1E] text-white border-b border-white/10 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">PULSE SEARCH ENGINE v5.0</span>
          </div>
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-[#0066FF]" />}
        </div>
      </div>
      <CommandInput 
        placeholder="ARCHITECT YOUR SEARCH..." 
        value={query}
        onValueChange={setQuery}
        className="h-16 text-lg font-black uppercase italic border-none focus:ring-0"
      />
      <CommandList className="max-h-[400px] bg-white dark:bg-[#0A0F1E]">
        <CommandEmpty className="py-12 text-center">
          <p className="text-gray-400 font-black uppercase italic text-xs">NO ARCHIVES MATCHED YOUR QUERY</p>
        </CommandEmpty>

        {results.length > 0 && (
          <CommandGroup heading="ACTIVE BLUEPRINTS" className="p-2">
            {results.map((post) => (
              <CommandItem
                key={post.id}
                onSelect={() => handleSelect(post.slug, post.title)}
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 group"
              >
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-[#FF6B00] uppercase mb-1">{post.category}</span>
                  <span className="font-black uppercase italic text-sm group-hover:text-[#0066FF] transition-colors">{post.title}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#0066FF]" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {recentSearches.length > 0 && query.length <= 1 && (
          <CommandGroup heading="RECENT QUERIES" className="p-2">
            {recentSearches.map((term, i) => (
              <CommandItem
                key={i}
                onSelect={() => setQuery(term)}
                className="flex items-center gap-3 p-4 cursor-pointer"
              >
                <History className="w-4 h-4 text-gray-400" />
                <span className="font-black uppercase text-xs">{term}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}