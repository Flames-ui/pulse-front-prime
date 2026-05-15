import React from 'react';
import Link from 'next/link';
import { ShieldCheck, LayoutDashboard, FileText, MessageSquare, Settings, LogOut, Zap } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0A0F1E] text-white flex flex-col">
        <div className="p-8 border-b border-white/5 flex items-center gap-3">
          <Zap className="w-6 h-6 text-[#0066FF]" />
          <span className="font-black italic uppercase tracking-tighter text-xl">GP ADMIN</span>
        </div>
        <nav className="flex-1 p-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-4 p-3 bg-[#0066FF] font-black uppercase text-[10px] tracking-widest">
            <LayoutDashboard className="w-4 h-4" /> DASHBOARD
          </Link>
          <Link href="/admin/posts" className="flex items-center gap-4 p-3 text-gray-400 hover:text-white font-black uppercase text-[10px] tracking-widest">
            <FileText className="w-4 h-4" /> ARCHIVES
          </Link>
          <Link href="/admin/comments" className="flex items-center gap-4 p-3 text-gray-400 hover:text-white font-black uppercase text-[10px] tracking-widest">
            <MessageSquare className="w-4 h-4" /> FEEDBACK
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-4 p-3 text-gray-400 hover:text-white font-black uppercase text-[10px] tracking-widest">
            <Settings className="w-4 h-4" /> SYSTEM
          </Link>
        </nav>
        <div className="p-6 border-t border-white/5">
          <button className="flex items-center gap-4 p-3 text-red-500 font-black uppercase text-[10px] tracking-widest w-full">
            <LogOut className="w-4 h-4" /> LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-black/20">
        <header className="h-20 bg-white dark:bg-[#0A0F1E] border-b dark:border-white/5 flex items-center justify-between px-10">
          <h2 className="text-xl font-black uppercase italic">COMMAND CENTER</h2>
          <Link href="/admin/new" className="bg-[#FF6B00] text-white px-6 py-3 font-black uppercase italic text-xs">
            NEW BLUEPRINT
          </Link>
        </header>
        
        <div className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[ 
              { label: 'ACTIVE NODES', value: '120', color: 'text-blue-500' },
              { label: 'SYSTEM REACH', value: '45.2K', color: 'text-orange-500' },
              { label: 'ARCHIVE UPTIME', value: '99.9%', color: 'text-green-500' },
              { label: 'PENDING TASKS', value: '14', color: 'text-purple-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#0F1629] p-8 shadow-sm border-b-4 border-gray-100 dark:border-white/5">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">{stat.label}</p>
                <p className={`text-4xl font-black italic ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#0F1629] p-10 shadow-sm">
            <h3 className="text-lg font-black uppercase italic mb-8 pb-4 border-b">RECENT SYSTEM LOGS</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center justify-between py-4 border-b dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-[#0066FF] rounded-full" />
                    <p className="text-sm font-black uppercase italic">Blueprint #{i+100} Deployed Successfully</p>
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-400">2 HOURS AGO</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}