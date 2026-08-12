"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Terminal, Code2, Database } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      let domain = url;
      try {
        if (!url.startsWith('http')) {
          domain = `https://${url}`;
        }
        const urlObj = new URL(domain);
        domain = urlObj.hostname;
      } catch (err) {}
      router.push(`/analyze/${domain}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center">
      <section className="w-full relative flex flex-col items-center justify-center min-h-[60vh] px-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-secondary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center z-10 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-primary/30 text-primary text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Discover the tech behind your favorite websites</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Decode the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Web.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Instantly identify the framework, programming languages, and databases powering any website. Learn how to build it yourself.
          </p>

          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative flex items-center bg-zinc-950 border border-zinc-800 rounded-2xl p-2 shadow-2xl overflow-hidden">
              <div className="pl-4 pr-2 text-zinc-500">
                <Search className="w-6 h-6" />
              </div>
              <input
                type="text"
                placeholder="e.g., stripe.com or netflix.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-zinc-100 placeholder:text-zinc-600 px-2 py-4 text-lg"
              />
              <button
                type="submit"
                disabled={!url}
                className="bg-zinc-100 text-zinc-950 font-semibold px-8 py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Analyze
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      <section className="w-full bg-zinc-950 py-20 border-t border-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading mb-4">Trending Tech Stacks</h2>
            <p className="text-zinc-400">See what the world's most popular products are built with.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { domain: "stripe.com", icon: Code2, tech: ["Next.js", "React", "Node.js"] },
              { domain: "netflix.com", icon: Terminal, tech: ["React", "Java", "Python"] },
              { domain: "airbnb.com", icon: Database, tech: ["Next.js", "Ruby on Rails", "MySQL"] }
            ].map((site, i) => (
              <motion.div
                key={site.domain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => router.push(`/analyze/${site.domain}`)}
                className="glass-card p-6 cursor-pointer hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <site.icon className="w-6 h-6 text-zinc-400 group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{site.domain}</h3>
                    <p className="text-zinc-500 text-sm">Analyzed recently</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {site.tech.map((t) => (
                    <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
