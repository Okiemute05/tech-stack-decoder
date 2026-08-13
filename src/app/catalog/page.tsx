"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Layout, Server, Database, BarChart3, Cpu, ArrowRight } from "lucide-react";
import { TECH_FINGERPRINTS } from "@/lib/tech-fingerprints";

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const categories = ["All", "Frontend", "Backend", "Database", "Analytics", "Other"];

  const filteredTech = TECH_FINGERPRINTS.filter((tech) => {
    const matchesSearch = tech.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tech.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || tech.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => a.name.localeCompare(b.name));

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
    <div className="container mx-auto px-4 py-12 flex-1 max-w-6xl">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
          Technology <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Catalog</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Browse the {TECH_FINGERPRINTS.length}+ frameworks, languages, and tools our engine can detect.
        </p>
      </div>

      <div className="glass-card p-6 mb-10 flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-xl leading-5 bg-zinc-900/50 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all sm:text-sm"
            placeholder="Search technologies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-zinc-100 text-zinc-900"
                  : "bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {filteredTech.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Cpu className="w-12 h-12 text-zinc-600 mb-4" />
          <h2 className="text-xl font-bold mb-2">No technologies found</h2>
          <p className="text-zinc-400 text-center">
            We couldn't find any technologies matching your search.
          </p>
          <button 
            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
            className="mt-6 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
            >
              <Link href={`/tech/${tech.slug}`}>
                <div className="glass p-6 rounded-2xl hover:bg-zinc-800/50 transition-colors border hover:border-primary/30 group h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 bg-zinc-900 rounded-lg shrink-0 flex items-center justify-center w-12 h-12">
                      {!imgErrors[tech.slug] ? (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${
                            tech.website_url.replace(/^https?:\/\//, '').split('/')[0]
                          }&sz=128`}
                          alt={`${tech.name} logo`}
                          className="w-8 h-8 object-contain rounded-md"
                          onError={() => setImgErrors((prev) => ({ ...prev, [tech.slug]: true }))}
                        />
                      ) : (
                        getCategoryIcon(tech.category)
                      )}
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
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
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
      )}

      <div className="mt-16 glass-card p-8 text-center border-dashed border-zinc-700 bg-transparent">
        <h3 className="text-xl font-bold mb-2">Missing your favorite tool?</h3>
        <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
          We are constantly updating our fingerprint engine to detect more technologies. If there's something you'd like us to add, let us know!
        </p>
        <a 
          href="mailto:hello@teklyze.com" 
          className="inline-block bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-2 rounded-xl transition-colors"
        >
          Suggest a Technology
        </a>
      </div>
    </div>
  );
}
