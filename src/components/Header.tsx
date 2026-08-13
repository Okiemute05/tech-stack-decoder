import Link from "next/link";
import { Search, Code2 } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-zinc-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
            <Code2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight">
            Tek<span className="text-primary text-glow">lyze</span>
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <Link href="/catalog" className="hover:text-zinc-50 transition-colors">
            Catalog
          </Link>
          <Link href="/trending" className="hover:text-zinc-50 transition-colors">
            Trending
          </Link>
          <Link href="/about" className="hover:text-zinc-50 transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
            <Search className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
