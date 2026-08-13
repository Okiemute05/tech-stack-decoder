import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-primary" />
              <span className="font-heading font-bold text-lg tracking-tight">
                Teklyze
              </span>
            </Link>
            <p className="text-zinc-400 text-sm max-w-sm">
              Discover the technologies powering the web. We analyze websites to help you learn and understand the modern tech landscape.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4 text-zinc-100">Legal</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold mb-4 text-zinc-100">Explore</h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li>
                <Link href="/catalog" className="hover:text-primary transition-colors">
                  Tech Catalog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} Teklyze. All rights reserved.</p>
          <p>Built for educational purposes.</p>
        </div>
      </div>
    </footer>
  );
}
