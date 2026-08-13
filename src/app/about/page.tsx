import { Code2, Zap, Shield, Search } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Teklyze — Demystifying the Web",
  description: "Learn how Teklyze analyzes websites to discover the frameworks, databases, and programming languages powering the modern internet.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex-1 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-primary/30 text-primary text-sm font-medium mb-6 relative z-10">
          <Code2 className="w-4 h-4" />
          <span>About Teklyze</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 relative z-10 leading-tight">
          Demystifying the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Modern Web.</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto relative z-10 leading-relaxed">
          Teklyze is a powerful developer utility designed to instantly reveal the technology stack behind any website. 
          We believe that understanding how great things are built is the first step to building great things yourself.
        </p>
      </div>

      {/* Grid of Values */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        <div className="glass p-8 rounded-2xl hover:border-primary/30 transition-colors">
          <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-xl font-bold mb-3">Our Mission</h3>
          <p className="text-zinc-400 leading-relaxed">
            The internet can feel like magic. When you see a beautiful, fast, and responsive website, the natural question for any developer is "How did they build that?". 
            Our mission is to answer that question instantly, providing you with the exact tools, frameworks, and languages used so you can learn them yourself.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl hover:border-secondary/30 transition-colors">
          <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-secondary" />
          </div>
          <h3 className="text-xl font-bold mb-3">How It Works</h3>
          <p className="text-zinc-400 leading-relaxed">
            When you search a domain, our custom analysis engine fetches the site and runs it through over 60+ unique technology fingerprints. 
            We analyze HTTP headers, script tags, meta tags, and DOM structures to identify the precise cocktail of technologies powering the experience—without running any heavy headless browsers.
          </p>
        </div>
      </div>

      {/* For Beginners Section */}
      <div className="glass-card p-8 md:p-12 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <Shield className="w-8 h-8 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold font-heading">Built for Beginners</h2>
        </div>
        
        <div className="space-y-4 text-zinc-300 leading-relaxed relative z-10 text-lg">
          <p>
            Unlike other technology profilers built strictly for enterprise sales teams or security researchers, Teklyze was built with <strong>learning</strong> in mind.
          </p>
          <p>
            For every technology we detect, we don't just give you a name—we provide an "Explain it like I'm 5" description, categorize its purpose, and immediately link you to free YouTube, Udemy, and edX courses so you can start learning it today.
          </p>
        </div>
        
        <div className="mt-8 relative z-10">
          <Link 
            href="/catalog" 
            className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
          >
            Browse our Technology Catalog &rarr;
          </Link>
        </div>
      </div>

      {/* Footer Contact */}
      <div className="text-center py-8 border-t border-zinc-800/50">
        <p className="text-zinc-400 mb-2">Have a question or want to suggest a new technology?</p>
        <a href="mailto:hello@teklyze.com" className="text-primary hover:underline font-medium">
          Contact Us at hello@teklyze.com
        </a>
      </div>
    </div>
  );
}
