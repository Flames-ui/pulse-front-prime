import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ADMIN COMMAND CENTER | Giant Pulse',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0A0F1E]">
      {children}
    </div>
  );
}