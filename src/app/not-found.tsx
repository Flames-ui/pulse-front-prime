import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1E] text-white p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="inline-flex bg-[#0066FF] p-6 shadow-2xl animate-pulse">
          <Zap className="w-12 h-12" />
        </div>
        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">
          404 <br/>
          <span className="text-[#FF6B00]">LOST PULSE</span>
        </h1>
        <p className="text-gray-400 font-medium uppercase tracking-widest text-sm">
          The blueprint you are looking for has been moved to a classified archive or deleted from the main engine.
        </p>
        <Button asChild className="bg-[#0066FF] hover:bg-[#0066FF]/90 text-white font-black italic uppercase tracking-widest h-16 px-12 rounded-none text-base">
          <Link href="/">RETURN TO COMMAND</Link>
        </Button>
      </div>
    </div>
  );
}