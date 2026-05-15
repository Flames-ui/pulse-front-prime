import { Zap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1E] text-white">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-[#0066FF]/20 border-t-[#0066FF] rounded-full animate-spin" />
        <Zap className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 text-[#FF6B00] animate-pulse" />
      </div>
      <p className="mt-8 font-black uppercase italic tracking-[0.4em] text-[10px] animate-pulse">INITIALIZING ENGINE...</p>
    </div>
  );
}