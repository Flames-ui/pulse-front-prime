"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] text-white">
        <Loader2 className="w-12 h-12 animate-spin text-[#0066FF] mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em]">AUTHENTICATING ENGINE ACCESS...</p>
      </div>
    );
  }

  if (!authenticated) return null;

  return <>{children}</>;
}