import React from 'react';

export const metadata = {
  title: "Contact HQ | Giant Pulse",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl md:text-8xl font-black uppercase italic mb-12">CONTACT HQ</h1>
        <p className="text-xl text-gray-500 mb-16 uppercase font-black tracking-widest">SYSTEMS ONLINE. READY FOR INPUT.</p>
        
        <div className="grid md:grid-cols-2 gap-12 text-left">
          <div className="bg-[#0A0F1E] text-white p-12">
            <h3 className="text-2xl font-black uppercase italic mb-6">GENERAL INQUIRIES</h3>
            <p className="text-[#FF6B00] font-black uppercase tracking-widest">anointedflamestv@gmail.com</p>
          </div>
          <div className="bg-[#0066FF] text-white p-12">
            <h3 className="text-2xl font-black uppercase italic mb-6">URGENT COMMS</h3>
            <p className="font-black uppercase tracking-widest">Response time: 24-48 HOURS</p>
          </div>
        </div>
      </div>
    </div>
  );
}