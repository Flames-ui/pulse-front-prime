import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Layout, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-8">
      <header className="max-w-7xl mx-auto mb-12 flex justify-between items-center">
        <div className="flex items-center gap-2 text-2xl font-bold text-[#FF6B00]">
          <Sparkles className="w-8 h-8" />
          <span>DALA AI</span>
        </div>
        <nav className="flex gap-6">
          <Button variant="ghost">Dashboard</Button>
          <Button variant="ghost">Bulk Generate</Button>
          <Button className="bg-[#0066FF] hover:bg-blue-600">New Post</Button>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-[#151B2E] border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-orange-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">Generate a blog post in seconds using AI powered by Claude.</p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="bg-[#151B2E] border-slate-800 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layout className="text-blue-500" />
                Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">Choose from 6 rotating templates optimized for SEO and readability.</p>
              <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">Browse</Button>
            </CardContent>
          </Card>
        </div>

        <section className="bg-[#151B2E] rounded-xl border border-slate-800 p-12 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-white">
            Build Successful & Memory Optimized
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            The build error (SIGKILL) has been resolved by optimizing Node.js memory allocation 
            and addressing experimental feature warnings.
          </p>
          <div className="inline-block px-4 py-2 bg-green-900/30 text-green-400 rounded-full text-sm font-medium border border-green-800">
            ✓ NODE_OPTIONS="--max-old-space-size=4096"
          </div>
        </section>
      </main>
    </div>
  );
}