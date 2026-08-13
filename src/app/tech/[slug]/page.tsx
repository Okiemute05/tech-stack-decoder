"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  PlayCircle,
  BookOpen,
  ExternalLink,
  Cpu,
  Layout,
  Server,
  Database,
  BarChart3,
  Loader2,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { TECH_FINGERPRINTS } from "@/lib/tech-fingerprints";

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

/** Curated free learning resources per technology */
const LEARNING_RESOURCES: Record<
  string,
  { type: "video" | "doc" | "course"; title: string; url: string; author: string }[]
> = {
  react: [
    { type: "video", title: "React in 100 Seconds", url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM", author: "Fireship" },
    { type: "doc", title: "Official Quick Start Guide", url: "https://react.dev/learn", author: "React Docs" },
    { type: "course", title: "Full React Course 2024", url: "https://www.youtube.com/watch?v=CgkZ7MvWUAA", author: "freeCodeCamp" },
  ],
  nextjs: [
    { type: "doc", title: "Next.js App Router Tutorial", url: "https://nextjs.org/learn", author: "Next.js Docs" },
    { type: "video", title: "Next.js in 100 Seconds", url: "https://www.youtube.com/watch?v=Sklc_fQBmcs", author: "Fireship" },
  ],
  vuejs: [
    { type: "doc", title: "Official Vue.js Tutorial", url: "https://vuejs.org/tutorial/", author: "Vue Docs" },
    { type: "video", title: "Vue.js in 100 Seconds", url: "https://www.youtube.com/watch?v=nhBVL41-_Cw", author: "Fireship" },
  ],
  angular: [
    { type: "doc", title: "Angular Getting Started", url: "https://angular.dev/tutorials", author: "Angular Docs" },
    { type: "video", title: "Angular in 100 Seconds", url: "https://www.youtube.com/watch?v=Ata9cSC2WpM", author: "Fireship" },
  ],
  svelte: [
    { type: "doc", title: "Svelte Interactive Tutorial", url: "https://learn.svelte.dev/", author: "Svelte Docs" },
    { type: "video", title: "Svelte in 100 Seconds", url: "https://www.youtube.com/watch?v=rv3Yq-B8qp4", author: "Fireship" },
  ],
  nodejs: [
    { type: "doc", title: "Node.js Introduction", url: "https://nodejs.org/en/learn/getting-started/introduction-to-nodejs", author: "Node.js Docs" },
    { type: "video", title: "Node.js in 100 Seconds", url: "https://www.youtube.com/watch?v=ENrzD9HAZK4", author: "Fireship" },
  ],
  tailwindcss: [
    { type: "doc", title: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs", author: "Tailwind Docs" },
    { type: "video", title: "Tailwind in 100 Seconds", url: "https://www.youtube.com/watch?v=mr15Xzb1Ook", author: "Fireship" },
  ],
  wordpress: [
    { type: "doc", title: "WordPress Developer Resources", url: "https://developer.wordpress.org/", author: "WordPress Docs" },
    { type: "course", title: "WordPress Full Course", url: "https://www.youtube.com/watch?v=kYY88h5J86A", author: "freeCodeCamp" },
  ],
  firebase: [
    { type: "doc", title: "Firebase Documentation", url: "https://firebase.google.com/docs", author: "Google" },
    { type: "video", title: "Firebase in 100 Seconds", url: "https://www.youtube.com/watch?v=vAoB4VbhRzM", author: "Fireship" },
  ],
  django: [
    { type: "doc", title: "Django Official Tutorial", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01/", author: "Django Docs" },
    { type: "video", title: "Django in 100 Seconds", url: "https://www.youtube.com/watch?v=0sMceGnxfqA", author: "Fireship" },
  ],
};

export default function TechPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [tech, setTech] = useState<Technology | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchTech = async () => {
      setLoading(true);

      // Try to fetch from Supabase first
      const { data, error } = await supabase
        .from("technologies")
        .select("*")
        .eq("slug", slug)
        .single();

      if (data && !error) {
        setTech(data);
      } else {
        // Fallback: try to find it in the fingerprints library
        const fingerprint = TECH_FINGERPRINTS.find((f) => f.slug === slug);
        if (fingerprint) {
          setTech({
            id: "",
            name: fingerprint.name,
            slug: fingerprint.slug,
            description: fingerprint.description,
            eli5_description: fingerprint.eli5_description,
            category: fingerprint.category,
            website_url: fingerprint.website_url,
            icon_url: null,
          });
        } else {
          setNotFound(true);
        }
      }

      setLoading(false);
    };

    fetchTech();
  }, [slug]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Layout className="w-10 h-10 text-primary" />;
      case "Backend":
        return <Server className="w-10 h-10 text-secondary" />;
      case "Database":
        return <Database className="w-10 h-10 text-accent" />;
      case "Analytics":
        return <BarChart3 className="w-10 h-10 text-amber-400" />;
      default:
        return <Cpu className="w-10 h-10 text-zinc-400" />;
    }
  };

  const resources = LEARNING_RESOURCES[slug] || [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (notFound || !tech) {
    return (
      <div className="container mx-auto px-4 py-12 flex-1 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Search
        </Link>
        <div className="flex flex-col items-center justify-center py-20">
          <Cpu className="w-16 h-16 text-zinc-600 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Technology Not Found</h1>
          <p className="text-zinc-400">
            We don&apos;t have information about &ldquo;{slug}&rdquo; yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 flex-1 max-w-4xl">
      <button
        onClick={() => window.history.back()}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-50 transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="glass-card p-8 md:p-12 mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-inner">
            {getCategoryIcon(tech.category)}
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2">
              {tech.name}
            </h1>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {tech.category}
            </span>
          </div>
        </div>

        <p className="text-xl text-zinc-300 leading-relaxed mb-8">
          {tech.description}
        </p>

        <a
          href={tech.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-zinc-100 text-zinc-950 font-semibold px-6 py-3 rounded-xl hover:bg-white transition-colors"
        >
          Official Website <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section className="glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold font-heading mb-4 text-secondary text-glow-secondary">
              Explain it like I&apos;m 5
            </h2>
            <p className="text-zinc-300 leading-relaxed text-lg">
              {tech.eli5_description}
            </p>
          </section>

          {resources.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold font-heading mb-6">
                Free Learning Resources
              </h2>
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass flex items-center justify-between p-4 rounded-xl hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-zinc-900 rounded-lg text-zinc-400 group-hover:text-primary transition-colors">
                        {resource.type === "video" ? (
                          <PlayCircle className="w-6 h-6" />
                        ) : (
                          <BookOpen className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-zinc-100 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-zinc-500">
                          {resource.author}
                        </p>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-bold font-heading mb-4 text-zinc-100">
              Why use {tech.name}?
            </h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> Huge community
                support
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> High
                performance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> Easy to learn
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 border-accent/30 bg-accent/5">
            <h3 className="font-bold font-heading mb-2 text-accent">
              Learn More
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              This page provides a high-level overview of {tech.name}. Visit the
              official website for comprehensive documentation, tutorials, and
              community resources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
