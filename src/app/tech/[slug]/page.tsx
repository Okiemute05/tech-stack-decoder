"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, PlayCircle, BookOpen, ExternalLink, Cpu } from "lucide-react";

export default function TechPage({ params }: { params: Promise<{ slug: string }> }) {
  // Use `use()` to unwrap params in Next.js 15
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  
  // In a real app, we would fetch data from the database using the slug
  const mockData = {
    name: slug === "react" ? "React" : slug.charAt(0).toUpperCase() + slug.slice(1),
    category: "Frontend Framework",
    description: "React is a free and open-source front-end JavaScript library for building user interfaces based on components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies.",
    eli5: "Imagine you're building a Lego house. Instead of building the whole house at once, you build individual pieces (like a window, a door, a wall) and snap them together. React lets programmers build websites exactly like that—by creating small, reusable blocks called 'components' and putting them together to make a full app.",
    website: "https://react.dev",
    resources: [
      { type: 'video', title: "React in 100 Seconds", url: "https://youtube.com", author: "Fireship" },
      { type: 'doc', title: "Official Quick Start Guide", url: "https://react.dev/learn", author: "React Docs" },
      { type: 'course', title: "Full React Course 2024", url: "https://youtube.com", author: "FreeCodeCamp" }
    ]
  };

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
            <Cpu className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2">{mockData.name}</h1>
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {mockData.category}
            </span>
          </div>
        </div>
        
        <p className="text-xl text-zinc-300 leading-relaxed mb-8">
          {mockData.description}
        </p>

        <a 
          href={mockData.website} 
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
            <h2 className="text-2xl font-bold font-heading mb-4 text-secondary text-glow-secondary">Explain it like I'm 5</h2>
            <p className="text-zinc-300 leading-relaxed text-lg">
              {mockData.eli5}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-heading mb-6">Free Learning Resources</h2>
            <div className="space-y-4">
              {mockData.resources.map((resource, index) => (
                <a 
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center justify-between p-4 rounded-xl hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-zinc-900 rounded-lg text-zinc-400 group-hover:text-primary transition-colors">
                      {resource.type === 'video' ? <PlayCircle className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-100 group-hover:text-primary transition-colors">{resource.title}</h3>
                      <p className="text-sm text-zinc-500">{resource.author}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-bold font-heading mb-4 text-zinc-100">Why use {mockData.name}?</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> Huge community support
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> High performance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span> Easy to learn
              </li>
            </ul>
          </div>
          
          <div className="glass-card p-6 border-accent/30 bg-accent/5">
            <h3 className="font-bold font-heading mb-2 text-accent">AdSense Content Notice</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              This page is dynamically generated with unique, high-quality content designed to rank well in search engines and provide massive value to users learning about tech stacks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
