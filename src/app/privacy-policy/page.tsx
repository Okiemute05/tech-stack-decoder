import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-16 flex-1 max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold font-heading">Privacy Policy</h1>
      </div>
      
      <div className="prose prose-invert prose-zinc max-w-none">
        <p className="text-zinc-400">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">
          When you use Tech Stack Decoder, we may collect information that you provide to us directly, such as the URLs you submit for analysis. We also automatically collect standard analytics data including IP addresses, browser types, and usage patterns to improve our service.
        </p>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">2. How We Use Information</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">
          The information we collect is used to:
        </p>
        <ul className="list-disc pl-6 text-zinc-300 mb-6 space-y-2">
          <li>Provide and maintain the Service</li>
          <li>Analyze and aggregate technology trends</li>
          <li>Improve user experience and website functionality</li>
          <li>Display relevant advertisements via Google AdSense</li>
        </ul>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">3. Third-Party Services</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">
          We use third-party services including Google AdSense to serve ads. These services may use cookies and web beacons to collect information about your visits to this and other websites in order to provide targeted advertisements.
        </p>

        <h2 className="text-2xl font-bold text-zinc-100 mt-8 mb-4">4. Data Security</h2>
        <p className="text-zinc-300 leading-relaxed mb-6">
          We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>
      </div>
    </div>
  );
}
