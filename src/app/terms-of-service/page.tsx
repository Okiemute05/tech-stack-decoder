import { FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-16 flex-1 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-secondary/10 rounded-xl">
          <FileText className="w-8 h-8 text-secondary" />
        </div>
        <h1 className="text-4xl font-bold font-heading">Terms of Service</h1>
      </div>
      
      <div className="prose prose-invert prose-zinc max-w-none">
        <p className="text-zinc-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">
          By accessing and using Teklyze, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
        </p>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">2. Use License</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">
          Permission is granted to temporarily use the materials and analysis tools on Teklyze for personal, non-commercial viewing and educational purposes only. You may not:
        </p>
        <ul className="list-disc pl-6 text-zinc-300 mb-6 space-y-2">
          <li>Modify or copy the materials for commercial purposes</li>
          <li>Attempt to decompile or reverse engineer any software contained on the site</li>
          <li>Use the service for automated scraping or malicious intent</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">3. Disclaimer</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">
          The materials on Teklyze's web site are provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
        </p>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">4. Accuracy of Materials</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">
          The technologies identified by our service are based on external indicators and may not be 100% accurate. We do not warrant that any of the analysis results on the website are entirely accurate, complete, or current.
        </p>
      </div>
    </div>
  );
}
