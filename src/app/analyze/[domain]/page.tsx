"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Zap, ArrowLeft, ExternalLink, Cpu, Layout, Server, Database } from "lucide-react";

interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "Other";
  description: string;
  slug: string;
}

export default function AnalyzePage({ params }: { params: Promise<{ domain: string }> }) {
  // Use `use()` to unwrap params in Next.js 15
  const resolvedParams = use(params);
  const domain = resolvedParams.domain;
  
  const [loading, setLoading] = useState(true);
  const [techStack, setTechStack] = useState<TechItem[]>([]);

  useEffect(() => {
    // Simulate API call to fetch tech stack
    const timer = setTimeout(() => {
      setTechStack([
        { name: "React", category: "Frontend", description: "A JavaScript library for building user interfaces.", slug: "react" },
        { name: "Tailwind CSS", category: "Frontend", description: "A utility-first CSS framework.", slug: "tailwind-css" },
        { name: "Node.js", category: "Backend", description: "JavaScript runtime built on Chrome's V8 JavaScript engine.", slug: "node-js" },
        { name: "PostgreSQL", category: "Database", description: "Open source object-relational database system.", slug: "postgresql" },
      ]);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [domain]);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Frontend': return <Layout className="w-5 h-5 text-primary" />;
      case 'Backend': return <Server className="w-5 h-5 text-secondary" />;
      case 'Database': return <Database className="w-5 h-5 text-accent" />;
      default: return <Cpu className="w-5 h-5 text-zinc-400" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Search
      </Link>

      <div className="glass-card p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold font-heading">{domain}</h1>
            {!loading && <ShieldCheck className="w-5 h-5 text-accent ml-2" />}
          </div>
          <p className="text-zinc-400">
            {loading ? "Analyzing technology stack..." : "Analysis complete. Here is what's under the hood."}
          </p>
        </div>
        
        {!loading && (
          <a 
            href={`https://${domain}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            Visit Website <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
            <div className="absolute inset-2 rounded-full border-r-2 border-secondary animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            <div className="absolute inset-4 rounded-full border-b-2 border-accent animate-spin" style={{ animationDuration: '2s' }}></div>
            <Zap className="w-6 h-6 text-zinc-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-lg text-zinc-400 animate-pulse">Running deep scan on {domain}...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/tech/${tech.slug}`}>
                <div className="glass p-6 rounded-2xl hover:bg-zinc-800/50 transition-colors border hover:border-primary/30 group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-900 rounded-lg">
                        {getCategoryIcon(tech.category)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{tech.name}</h3>
                        <span className="text-xs text-zinc-500 font-medium tracking-wider uppercase">{tech.category}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {tech.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Learn more &rarr;
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
