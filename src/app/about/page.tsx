import React from 'react';
import Image from 'next/image';
import { CEO_NAME, CEO_AVATAR, CEO_BIO } from '@/lib/data';
import { Shield, Zap, Target, BarChart3, Mail, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'The Architect | Our Mission',
  description: 'Meet Agbasionwe Emmanuel Chiemelie, the visionary behind Giant Pulse.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-white dark:bg-[#0A0F1E]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="relative">
              <div className="aspect-[4/5] relative overflow-hidden border-8 border-white dark:border-[#1E293B] shadow-2xl z-10">
                <Image 
                  src={CEO_AVATAR} 
                  alt={CEO_NAME} 
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#0066FF] flex flex-col items-center justify-center text-white p-8 z-20">
                <Zap className="w-16 h-16 mb-4" />
                <p className="text-4xl font-black italic uppercase text-center leading-none">CORE<br/>ARCHITECTURE</p>
              </div>
            </div>
            <div className="space-y-8">
              <Badge className="bg-[#FF6B00] text-[10px] font-black uppercase tracking-[0.3em] px-4 py-1 rounded-none border-none">
                SYSTEM ARCHITECT
              </Badge>
              <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                {CEO_NAME.split(' ')[0]} <br/>
                <span className="text-[#0066FF]">{CEO_NAME.split(' ').slice(1).join(' ')}</span>
              </h1>
              <div className="space-y-6 text-lg text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                <p>Digital growth is not a mystery; it is an engineering problem. My mission is to provide the blueprints for creators and entrepreneurs to scale their vision without the fluff.</p>
                <p>With a background in strategic content architecture and SEO optimization, I founded Giant Pulse to bridge the gap between creative passion and commercial performance.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#0066FF] h-14 px-10 rounded-none font-black uppercase italic">CONTACT OFFICE</Button>
                <Button variant="outline" className="h-14 px-10 rounded-none font-black uppercase italic border-2">VIEW ARCHIVES</Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Target, title: 'PRECISION', desc: 'Every blueprint is data-driven and stress-tested in the real-world digital economy.' },
              { icon: BarChart3, title: 'SCALE', desc: 'We build systems that grow with you, ensuring long-term sustainability and performance.' },
              { icon: Shield, title: 'INTEGRITY', desc: 'No black-hat tactics. We focus on E-E-A-T standards that Google and readers trust.' }
            ].map((feature, i) => (
              <div key={i} className="bg-gray-50 dark:bg-white/5 p-12 border-b-8 border-[#0066FF]">
                <feature.icon className="w-12 h-12 text-[#FF6B00] mb-8" />
                <h3 className="text-2xl font-black uppercase italic mb-4">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}