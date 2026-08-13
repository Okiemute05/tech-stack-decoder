/**
 * Technology Detection Engine
 *
 * Fetches a website's HTML and HTTP headers, then runs every fingerprint
 * against the response to identify the technologies in use.
 *
 * Also includes "structural inference" — detecting SPA frameworks from
 * build output patterns even when the framework itself isn't visible.
 */

import { TECH_FINGERPRINTS, type TechFingerprint } from "./tech-fingerprints";

export interface DetectedTech {
  slug: string;
  name: string;
  category: TechFingerprint["category"];
  confidence: "high" | "medium" | "low";
  /** Which signal matched (for debugging) */
  matchedOn: string;
}

interface FetchResult {
  html: string;
  headers: Record<string, string>;
}

/**
 * Fetch a website's HTML and response headers.
 * Tries HTTPS first, then falls back to HTTP.
 * Times out after 10 seconds. Follows redirects.
 */
export async function fetchWebsite(domain: string): Promise<FetchResult> {
  const fetchOptions: RequestInit = {
    headers: {
      // Pretend to be a real browser so sites don't block us
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
    redirect: "follow",
  };

  // Try HTTPS first, then HTTP
  for (const protocol of ["https", "http"]) {
    const url = `${protocol}://${domain}`;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      const html = await response.text();

      // Flatten response headers into a simple record
      const headers: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headers[key.toLowerCase()] = value;
      });

      return { html, headers };
    } catch (err) {
      // If HTTPS failed, try HTTP before throwing
      if (protocol === "https") continue;
      throw err;
    } finally {
      clearTimeout(timeout);
    }
  }

  // Should never reach here, but TypeScript needs it
  throw new Error(`Could not reach ${domain}`);
}

/**
 * Run all fingerprints against the fetched HTML and headers.
 * Then run structural inference to catch SPAs and build tools.
 * Returns a deduplicated list of detected technologies.
 */
export function detectTechnologies(
  html: string,
  headers: Record<string, string>
): DetectedTech[] {
  const detected = new Map<string, DetectedTech>();

  // ═══════════════════════════════════════════════════════════════
  // EXTRACT SIGNALS FROM HTML
  // ═══════════════════════════════════════════════════════════════

  // Extract all <script src="..."> values
  const scriptSrcs: string[] = [];
  const scriptRegex = /<script[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = scriptRegex.exec(html)) !== null) {
    scriptSrcs.push(match[1]);
  }

  // Extract all <script> inline content (for SPA detection)
  const inlineScripts: string[] = [];
  const inlineScriptRegex = /<script[^>]*>([^<]+)<\/script>/gi;
  while ((match = inlineScriptRegex.exec(html)) !== null) {
    // Skip empty scripts and external scripts
    if (match[1].trim().length > 0) {
      inlineScripts.push(match[1]);
    }
  }
  const allInlineContent = inlineScripts.join("\n");

  // Extract all <link href="..."> values
  const linkHrefs: string[] = [];
  const linkRegex = /<link[^>]+href=["']([^"']+)["']/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    linkHrefs.push(match[1]);
  }

  // Extract all <meta name="..." content="..."> pairs
  const metaTags: { name: string; content: string }[] = [];
  const metaRegex =
    /<meta[^>]+(?:name|property)=["']([^"']+)["'][^>]+content=["']([^"']+)["']/gi;
  while ((match = metaRegex.exec(html)) !== null) {
    metaTags.push({ name: match[1].toLowerCase(), content: match[2] });
  }
  // Also match reverse order (content before name)
  const metaRegexReverse =
    /<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']([^"']+)["']/gi;
  while ((match = metaRegexReverse.exec(html)) !== null) {
    metaTags.push({ name: match[2].toLowerCase(), content: match[1] });
  }

  // ═══════════════════════════════════════════════════════════════
  // RUN FINGERPRINT MATCHING
  // ═══════════════════════════════════════════════════════════════

  for (const fingerprint of TECH_FINGERPRINTS) {
    const { patterns, slug, name, category } = fingerprint;

    // ─── 1. Check HTTP Headers (highest confidence) ─────────────
    for (const headerPattern of patterns.headers) {
      const headerValue = headers[headerPattern.name.toLowerCase()];
      if (headerValue && headerPattern.value.test(headerValue)) {
        if (!detected.has(slug)) {
          detected.set(slug, {
            slug,
            name,
            category,
            confidence: "high",
            matchedOn: `header:${headerPattern.name}`,
          });
        }
      }
    }

    // ─── 2. Check Script Sources (high confidence) ──────────────
    for (const scriptPattern of patterns.scripts) {
      for (const src of scriptSrcs) {
        if (scriptPattern.test(src)) {
          if (!detected.has(slug)) {
            detected.set(slug, {
              slug,
              name,
              category,
              confidence: "high",
              matchedOn: `script:${src.substring(0, 60)}`,
            });
          }
          break;
        }
      }
    }

    // ─── 3. Check Meta Tags (high confidence) ───────────────────
    for (const metaPattern of patterns.meta) {
      for (const tag of metaTags) {
        if (
          tag.name === metaPattern.name.toLowerCase() &&
          metaPattern.content.test(tag.content)
        ) {
          if (!detected.has(slug)) {
            detected.set(slug, {
              slug,
              name,
              category,
              confidence: "high",
              matchedOn: `meta:${tag.name}=${tag.content.substring(0, 40)}`,
            });
          }
          break;
        }
      }
    }

    // ─── 4. Check Link Hrefs (medium confidence) ────────────────
    for (const linkPattern of patterns.links) {
      for (const href of linkHrefs) {
        if (linkPattern.test(href)) {
          if (!detected.has(slug)) {
            detected.set(slug, {
              slug,
              name,
              category,
              confidence: "medium",
              matchedOn: `link:${href.substring(0, 60)}`,
            });
          }
          break;
        }
      }
    }

    // ─── 5. Check HTML Body Patterns (medium confidence) ────────
    for (const htmlPattern of patterns.html) {
      if (htmlPattern.test(html)) {
        if (!detected.has(slug)) {
          detected.set(slug, {
            slug,
            name,
            category,
            confidence: "medium",
            matchedOn: `html-pattern`,
          });
        }
        break;
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // STRUCTURAL INFERENCE
  // Detect technologies from build output patterns even when
  // the framework itself isn't directly visible in the HTML.
  // ═══════════════════════════════════════════════════════════════

  const allScriptSrcStr = scriptSrcs.join(" ");
  const allLinkHrefStr = linkHrefs.join(" ");

  // --- Vite detection (production builds don't include @vite markers) ---
  // Vite builds use hashed filenames with a specific pattern
  const hasModuleScripts = /<script[^>]+type=["']module["'][^>]+crossorigin/i.test(html);
  const hasHashedAssets = /\/assets\/[a-zA-Z]+-[A-Za-z0-9_-]{6,10}\.(js|css)/i.test(allScriptSrcStr + " " + allLinkHrefStr);
  if (hasModuleScripts && hasHashedAssets && !detected.has("vite")) {
    detected.set("vite", {
      slug: "vite",
      name: "Vite",
      category: "Other",
      confidence: "medium",
      matchedOn: "structural:module-scripts+hashed-assets",
    });
  }

  // --- React SPA detection (when only <div id="root"> is present) ---
  const hasRootDiv = /<div id=["'](?:root|app|__app)["']>\s*<\/div>/i.test(html);
  const hasJsBundle = scriptSrcs.some(s => /\.js$/i.test(s));
  if (hasRootDiv && hasJsBundle && !detected.has("react")) {
    // Most SPAs with id="root" are React — it's the React convention
    detected.set("react", {
      slug: "react",
      name: "React",
      category: "Frontend",
      confidence: "medium",
      matchedOn: "structural:root-div+js-bundle",
    });
  }

  // --- SPA framework detection from mount points ---
  if (/<div id=["']__vue[^"']*["']/i.test(html) && !detected.has("vuejs")) {
    detected.set("vuejs", {
      slug: "vuejs",
      name: "Vue.js",
      category: "Frontend",
      confidence: "medium",
      matchedOn: "structural:vue-mount-point",
    });
  }

  // --- Boxicons detection ---
  if (/boxicons/i.test(allLinkHrefStr) || /boxicons/i.test(html)) {
    if (!detected.has("boxicons")) {
      detected.set("boxicons", {
        slug: "boxicons",
        name: "Boxicons",
        category: "Frontend",
        confidence: "high",
        matchedOn: "link:boxicons-cdn",
      });
    }
  }

  // --- LiteSpeed detection from headers ---
  if (headers["server"] && /litespeed/i.test(headers["server"])) {
    if (!detected.has("litespeed")) {
      detected.set("litespeed", {
        slug: "litespeed",
        name: "LiteSpeed",
        category: "Other",
        confidence: "high",
        matchedOn: "header:server",
      });
    }
  }

  // --- CDN detection from link tags (unpkg, cdnjs, jsdelivr) ---
  if (/unpkg\.com/i.test(allLinkHrefStr + " " + allScriptSrcStr)) {
    if (!detected.has("unpkg")) {
      detected.set("unpkg", {
        slug: "unpkg",
        name: "unpkg CDN",
        category: "Other",
        confidence: "high",
        matchedOn: "link:unpkg.com",
      });
    }
  }
  if (/cdnjs\.cloudflare\.com/i.test(allLinkHrefStr + " " + allScriptSrcStr)) {
    if (!detected.has("cdnjs")) {
      detected.set("cdnjs", {
        slug: "cdnjs",
        name: "cdnjs",
        category: "Other",
        confidence: "high",
        matchedOn: "link:cdnjs.cloudflare.com",
      });
    }
  }
  if (/cdn\.jsdelivr\.net/i.test(allLinkHrefStr + " " + allScriptSrcStr)) {
    if (!detected.has("jsdelivr")) {
      detected.set("jsdelivr", {
        slug: "jsdelivr",
        name: "jsDelivr CDN",
        category: "Other",
        confidence: "high",
        matchedOn: "link:cdn.jsdelivr.net",
      });
    }
  }

  // --- Dark mode / Theme detection ---
  if (/localStorage.*theme|dark.*mode|classList.*dark/i.test(allInlineContent) || /data-theme/i.test(html)) {
    if (!detected.has("dark-mode")) {
      detected.set("dark-mode", {
        slug: "dark-mode",
        name: "Dark Mode",
        category: "Frontend",
        confidence: "medium",
        matchedOn: "inline-script:theme-detection",
      });
    }
  }

  // --- Webflow detection ---
  if (/webflow/i.test(html) || /wf-/i.test(html) || /webflow\.com/i.test(allScriptSrcStr)) {
    if (!detected.has("webflow")) {
      detected.set("webflow", {
        slug: "webflow",
        name: "Webflow",
        category: "Other",
        confidence: "high",
        matchedOn: "structural:webflow-markers",
      });
    }
  }

  // --- HubSpot detection ---
  if (/hubspot/i.test(allScriptSrcStr) || /hs-scripts\.com/i.test(allScriptSrcStr) || /hbspt/i.test(html)) {
    if (!detected.has("hubspot")) {
      detected.set("hubspot", {
        slug: "hubspot",
        name: "HubSpot",
        category: "Analytics",
        confidence: "high",
        matchedOn: "script:hubspot",
      });
    }
  }

  // --- Ghost CMS detection ---
  if (/ghost\.io/i.test(allScriptSrcStr + allLinkHrefStr) || /ghost-/i.test(html) || (metaTags.some(m => m.name === "generator" && /ghost/i.test(m.content)))) {
    if (!detected.has("ghost")) {
      detected.set("ghost", {
        slug: "ghost",
        name: "Ghost",
        category: "Backend",
        confidence: "high",
        matchedOn: "structural:ghost-markers",
      });
    }
  }

  // --- Payload CMS detection ---
  if (headers["x-powered-by"] && /payload/i.test(headers["x-powered-by"])) {
    if (!detected.has("payload")) {
      detected.set("payload", {
        slug: "payload",
        name: "Payload CMS",
        category: "Backend",
        confidence: "high",
        matchedOn: "header:x-powered-by",
      });
    }
  }

  // --- Crisp chat detection ---
  if (/crisp\.chat/i.test(allScriptSrcStr) || /client\.crisp\.chat/i.test(html)) {
    if (!detected.has("crisp")) {
      detected.set("crisp", {
        slug: "crisp",
        name: "Crisp Chat",
        category: "Other",
        confidence: "high",
        matchedOn: "script:crisp",
      });
    }
  }

  // --- Drift chat detection ---
  if (/drift\.com/i.test(allScriptSrcStr) || /js\.driftt\.com/i.test(html)) {
    if (!detected.has("drift")) {
      detected.set("drift", {
        slug: "drift",
        name: "Drift",
        category: "Other",
        confidence: "high",
        matchedOn: "script:drift",
      });
    }
  }

  // --- Facebook Pixel detection ---
  if (/connect\.facebook\.net/i.test(allScriptSrcStr) || /fbq\(/i.test(html) || /fbevents\.js/i.test(html)) {
    if (!detected.has("facebook-pixel")) {
      detected.set("facebook-pixel", {
        slug: "facebook-pixel",
        name: "Facebook Pixel",
        category: "Analytics",
        confidence: "high",
        matchedOn: "script:facebook-pixel",
      });
    }
  }

  // --- Twitter/X Pixel detection ---
  if (/static\.ads-twitter\.com/i.test(allScriptSrcStr) || /twq\(/i.test(html)) {
    if (!detected.has("twitter-pixel")) {
      detected.set("twitter-pixel", {
        slug: "twitter-pixel",
        name: "X (Twitter) Pixel",
        category: "Analytics",
        confidence: "high",
        matchedOn: "script:twitter-pixel",
      });
    }
  }

  // --- LinkedIn Insight Tag ---
  if (/snap\.licdn\.com/i.test(allScriptSrcStr) || /linkedin/i.test(allScriptSrcStr)) {
    if (!detected.has("linkedin-insight")) {
      detected.set("linkedin-insight", {
        slug: "linkedin-insight",
        name: "LinkedIn Insight Tag",
        category: "Analytics",
        confidence: "high",
        matchedOn: "script:linkedin",
      });
    }
  }

  // --- Sentry error tracking ---
  if (/sentry/i.test(allScriptSrcStr) || /sentry\.io/i.test(html) || /Sentry\.init/i.test(html)) {
    if (!detected.has("sentry")) {
      detected.set("sentry", {
        slug: "sentry",
        name: "Sentry",
        category: "Other",
        confidence: "high",
        matchedOn: "script:sentry",
      });
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // SORT & RETURN
  // ═══════════════════════════════════════════════════════════════

  const categoryOrder = {
    Frontend: 0,
    Backend: 1,
    Database: 2,
    Analytics: 3,
    Other: 4,
  };
  const confidenceOrder = { high: 0, medium: 1, low: 2 };

  return Array.from(detected.values()).sort((a, b) => {
    const confDiff =
      confidenceOrder[a.confidence] - confidenceOrder[b.confidence];
    if (confDiff !== 0) return confDiff;
    return categoryOrder[a.category] - categoryOrder[b.category];
  });
}
