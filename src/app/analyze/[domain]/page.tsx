"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  ShieldCheck,
  Zap,
  ArrowLeft,
  ExternalLink,
  Cpu,
  Layout,
  Server,
  Database,
  AlertTriangle,
  BarChart3,
} from "lucide-react";

interface Technology {
  id: string;
  name: string;
  slug: string;
  description: string;
  eli5_description: string;
  category: "Frontend" | "Backend" | "Database" | "Analytics" | "Other";
  website_url: string;
  icon_url: string | null;
}

interface AnalysisResult {
  domain: string;
  cached: boolean;
  analyzed_at: string;
  technologies: Technology[];
  message?: string;
  error?: string;
}

export default function AnalyzePage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const resolvedParams = use(params);
  const domain = resolvedParams.domain;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyze = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Something went wrong.");
          return;
        }

        setResult(data);
      } catch {
        setError("Failed to connect to the analysis service. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    analyze();
  }, [domain]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Layout className="w-5 h-5 text-primary" />;
      case "Backend":
        return <Server className="w-5 h-5 text-secondary" />;
      case "Database":
        return <Database className="w-5 h-5 text-accent" />;
      case "Analytics":
        return <BarChart3 className="w-5 h-5 text-amber-400" />;
      default:
        return <Cpu className="w-5 h-5 text-zinc-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Frontend":
        return "text-primary";
      case "Backend":
        return "text-secondary";
      case "Database":
        return "text-accent";
      case "Analytics":
        return "text-amber-400";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Search
      </Link>

      <div className="glass-card p-6 md:p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
        <div className="min-w-0 w-full">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-primary flex-shrink-0" />
            <h1 className="text-2xl md:text-3xl font-bold font-heading break-all">{domain}</h1>
            {!loading && result && !error && (
              <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0" />
            )}
          </div>
          <p className="text-zinc-400">
            {loading
              ? "Analyzing technology stack..."
              : error
                ? "Analysis failed."
                : result?.cached
                  ? "Showing cached results (analyzed recently)."
                  : "Analysis complete. Here is what's under the hood."}
          </p>
        </div>

        {!loading && !error && (
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
            <div
              className="absolute inset-2 rounded-full border-r-2 border-secondary animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
            <div
              className="absolute inset-4 rounded-full border-b-2 border-accent animate-spin"
              style={{ animationDuration: "2s" }}
            ></div>
            <Zap className="w-6 h-6 text-zinc-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-lg text-zinc-400 animate-pulse">
            Running deep scan on {domain}...
          </p>
          <p className="text-sm text-zinc-600 mt-2">
            Fetching HTML, analyzing headers, and matching patterns...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="p-4 bg-red-500/10 rounded-2xl mb-6">
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-red-400">
            Analysis Failed
          </h2>
          <p className="text-zinc-400 text-center max-w-md">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl transition-colors text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      ) : result && result.technologies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="p-4 bg-amber-500/10 rounded-2xl mb-6">
            <Cpu className="w-12 h-12 text-amber-400" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Technologies Detected</h2>
          <p className="text-zinc-400 text-center max-w-md">
            {result.message ||
              "We couldn't identify any technologies. The site may use uncommon tools or block automated requests."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {result?.technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Link href={`/tech/${tech.slug}`}>
                <div className="glass p-6 rounded-2xl hover:bg-zinc-800/50 transition-colors border hover:border-primary/30 group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-zinc-900 rounded-lg">
                        {getCategoryIcon(tech.category)}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {tech.name}
                        </h3>
                        <span
                          className={`text-xs font-medium tracking-wider uppercase ${getCategoryColor(tech.category)}`}
                        >
                          {tech.category}
                        </span>
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
