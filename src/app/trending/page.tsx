"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, Activity, Globe, Clock, ArrowRight, Layout, Server, Database, BarChart3, Cpu } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { TECH_FINGERPRINTS } from "@/lib/tech-fingerprints";

interface RecentAnalysis {
  id: string;
  domain: string;
  created_at: string;
}

export default function TrendingPage() {
  const [recentAnalyses, setRecentAnalyses] = useState<RecentAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  // We'll highlight some of the most popular tools in the industry right now
  const trendingSlugs = ["nextjs", "react", "tailwindcss", "supabase", "vercel", "stripe"];
  const trendingTech = TECH_FINGERPRINTS.filter(tech => trendingSlugs.includes(tech.slug));

  useEffect(() => {
    const fetchRecent = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("analyses")
        .select("id, domain, created_at")
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(8);

      if (data && !error) {
        // Filter out duplicate domains to make the feed look nicer
        const uniqueDomains = Array.from(new Set(data.map(a => a.domain)))
          .map(domain => data.find(a => a.domain === domain)!)
          .slice(0, 6);
          
        setRecentAnalyses(uniqueDomains);
      }
      setLoading(false);
    };

    fetchRecent();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend": return <Layout className="w-5 h-5 text-primary" />;
      case "Backend": return <Server className="w-5 h-5 text-secondary" />;
      case "Database": return <Database className="w-5 h-5 text-accent" />;
      case "Analytics": return <BarChart3 className="w-5 h-5 text-amber-400" />;
      default: return <Cpu className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend": return "text-primary";
      case "Backend": return "text-secondary";
      case "Database": return "text-accent";
      case "Analytics": return "text-amber-400";
      default: return "text-zinc-400";
    }
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="container mx-auto px-4 py-12 flex-1 max-w-6xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Trending</span> Now
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Discover the most popular technologies powering the modern web and see what other developers are analyzing right now.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Left Column: Trending Technologies */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold font-heading">Industry Leaders</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {trendingTech.map((tech, index) => (
              <motion.div
                key={tech.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/tech/${tech.slug}`}>
                  <div className="glass p-6 rounded-2xl hover:bg-zinc-800/50 transition-colors border hover:border-primary/30 group h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-2 bg-zinc-900 rounded-lg shrink-0 flex items-center justify-center w-12 h-12">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${tech.website_url.replace(/^https?:\/\//, '').split('/')[0]}&sz=128`}
                          alt={`${tech.name} logo`}
                          className="w-8 h-8 object-contain rounded-md"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {tech.name}
                        </h3>
                        <span className={`text-xs font-medium tracking-wider uppercase ${getCategoryColor(tech.category)}`}>
                          {tech.category}
                        </span>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-2">
                      {tech.description}
                    </p>
                    <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform mt-auto">
                      View Details <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="pt-6">
            <Link href="/catalog" className="inline-flex items-center justify-center w-full glass-card p-4 hover:border-primary/50 transition-colors text-zinc-300 hover:text-white font-medium group">
              View all 60+ technologies <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Column: Live Feed */}
        <div>
          <div className="glass-card p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/50 pb-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </div>
              <h2 className="text-xl font-bold font-heading">Live Feed</h2>
            </div>
            
            <p className="text-sm text-zinc-400 mb-6">
              Websites recently analyzed by the Teklyze community.
            </p>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4">
                    <div className="w-10 h-10 bg-zinc-800 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                      <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : recentAnalyses.length === 0 ? (
              <div className="text-center py-8 text-zinc-500 text-sm">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No recent searches found.
              </div>
            ) : (
              <div className="space-y-4">
                {recentAnalyses.map((analysis, index) => (
                  <motion.div 
                    key={analysis.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link href={`/analyze/${analysis.domain}`}>
                      <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors group">
                        <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center shrink-0 border border-zinc-800 group-hover:border-accent/30 transition-colors">
                          <Globe className="w-5 h-5 text-zinc-400 group-hover:text-accent transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-zinc-200 truncate group-hover:text-white transition-colors">
                            {analysis.domain}
                          </p>
                          <div className="flex items-center text-xs text-zinc-500 mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {timeAgo(analysis.created_at)}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-accent transition-transform -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
