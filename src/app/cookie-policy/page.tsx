import React from 'react';

export const metadata = {
  title: 'Cookie Protocol | Giant Pulse',
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-[#0A0F1E]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto prose dark:prose-invert prose-slate">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">COOKIE PROTOCOL</h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0066FF] mb-12">SYSTEM UPDATED: MAY 2026</p>
          
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-black uppercase">1. DATA INITIALIZATION</h2>
              <p>We use cookies to enhance your experience, serve personalized content, and analyze our traffic. By using our digital architecture, you consent to our use of cookies.</p>
            </div>
            
            <div>
              <h2 className="text-2xl font-black uppercase">2. CORE FUNCTIONALITY</h2>
              <p>Essential cookies are required for the system to operate. These include security protocols, authentication states, and preference persistence (like Dark Mode).</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase">3. PERFORMANCE ANALYTICS</h2>
              <p>We use tracking technologies to understand how users interact with our blueprints. This data helps us optimize LCP, CLS, and overall system response times.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase">4. MANAGING PROTOCOLS</h2>
              <p>You can adjust your browser settings to refuse or delete cookies. However, some modules of the Giant Pulse engine may not function optimally without them.</p>
            </div>
          </section>
          
          <div className="mt-20 p-8 border-4 border-dashed border-gray-100 dark:border-white/5">
            <p className="text-[10px] font-black uppercase tracking-widest text-center text-gray-400">FOR FURTHER QUERIES: SYSTEMS@GIANTPULSE.NAME.NG</p>
          </div>
        </div>
      </div>
    </div>
  );
}