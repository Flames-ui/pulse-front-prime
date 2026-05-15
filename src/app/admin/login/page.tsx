"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Access Granted');
      router.push('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1E]">
      <div className="w-full max-w-md p-12 bg-white dark:bg-[#0F1629] border-t-8 border-[#0066FF]\ shadow-2xl">
        <h1 className="text-3xl font-black uppercase italic mb-8 text-center">ENGINE LOGIN</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">ID@ENGINE.COM</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="h-14 bg-gray-50 border-none font-bold"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">KEY_PASS</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="h-14 bg-gray-50 border-none font-bold"
              required
            />
          </div>
          <Button disabled={loading} className="w-full h-16 bg-[#0066FF] font-black uppercase italic tracking-widest rounded-none text-lg">
            {loading ? 'INITIALIZING...' : 'AUTHORIZE'}
          </Button>
        </form>
      </div>
    </div>
  );
}