/**
 * POST /api/analyze
 *
 * Receives { domain: "stripe.com" }, detects the tech stack,
 * caches results in Supabase, and returns the detected technologies.
 */

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { fetchWebsite, detectTechnologies } from "@/lib/detector";
import { TECH_FINGERPRINTS } from "@/lib/tech-fingerprints";

/** How long a cached analysis stays valid (in hours) */
const CACHE_TTL_HOURS = 24;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const domain: string = body.domain?.trim()?.toLowerCase();

    if (!domain) {
      return NextResponse.json(
        { error: "Missing 'domain' in request body." },
        { status: 400 }
      );
    }

    // ─── 1. Check for a cached analysis ─────────────────────────
    const cacheThreshold = new Date(
      Date.now() - CACHE_TTL_HOURS * 60 * 60 * 1000
    ).toISOString();

    const { data: existingAnalysis } = await supabaseAdmin
      .from("analyses")
      .select("id, created_at")
      .eq("domain", domain)
      .eq("status", "completed")
      .gte("created_at", cacheThreshold)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existingAnalysis) {
      // Fetch the cached technologies for this analysis
      const { data: cachedTechLinks } = await supabaseAdmin
        .from("analysis_tech")
        .select("tech_id")
        .eq("analysis_id", existingAnalysis.id);

      if (cachedTechLinks && cachedTechLinks.length > 0) {
        const techIds = cachedTechLinks.map((link) => link.tech_id);

        const { data: technologies } = await supabaseAdmin
          .from("technologies")
          .select("*")
          .in("id", techIds);

        return NextResponse.json({
          domain,
          cached: true,
          analyzed_at: existingAnalysis.created_at,
          technologies: technologies || [],
        });
      }
    }

    // ─── 2. No cache — run a fresh scan ─────────────────────────
    let fetchResult;
    try {
      fetchResult = await fetchWebsite(domain);
    } catch (fetchError) {
      console.error(`Failed to fetch ${domain}:`, fetchError);
      return NextResponse.json(
        {
          error: `Could not reach ${domain}. The site may be down, blocking requests, or the domain may be invalid.`,
        },
        { status: 422 }
      );
    }

    const detectedTechs = detectTechnologies(
      fetchResult.html,
      fetchResult.headers
    );

    if (detectedTechs.length === 0) {
      return NextResponse.json({
        domain,
        cached: false,
        technologies: [],
        message:
          "No technologies could be detected. The site may use uncommon tools or block automated requests.",
      });
    }

    // ─── 3. Save the analysis to Supabase ───────────────────────
    // First, ensure all detected technologies exist in the DB
    const techRecords = [];
    for (const detected of detectedTechs) {
      // Check if this tech already exists
      const { data: existingTech } = await supabaseAdmin
        .from("technologies")
        .select("id")
        .eq("slug", detected.slug)
        .single();

      if (existingTech) {
        techRecords.push(existingTech);
      } else {
        // Find the full fingerprint data to insert
        const fingerprint = TECH_FINGERPRINTS.find(
          (f) => f.slug === detected.slug
        );
        if (fingerprint) {
          const { data: newTech } = await supabaseAdmin
            .from("technologies")
            .insert({
              name: fingerprint.name,
              slug: fingerprint.slug,
              description: fingerprint.description,
              eli5_description: fingerprint.eli5_description,
              category: fingerprint.category,
              website_url: fingerprint.website_url,
            })
            .select("id")
            .single();

          if (newTech) {
            techRecords.push(newTech);
          }
        }
      }
    }

    // Create the analysis record
    const { data: analysis } = await supabaseAdmin
      .from("analyses")
      .insert({ domain, status: "completed" })
      .select("id")
      .single();

    if (analysis && techRecords.length > 0) {
      // Link technologies to the analysis
      const links = techRecords.map((tech) => ({
        analysis_id: analysis.id,
        tech_id: tech.id,
      }));

      await supabaseAdmin.from("analysis_tech").insert(links);
    }

    // ─── 4. Return the full technology data ─────────────────────
    const techSlugs = detectedTechs.map((d) => d.slug);
    const { data: fullTechnologies } = await supabaseAdmin
      .from("technologies")
      .select("*")
      .in("slug", techSlugs);

    return NextResponse.json({
      domain,
      cached: false,
      analyzed_at: new Date().toISOString(),
      technologies: fullTechnologies || [],
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during analysis." },
      { status: 500 }
    );
  }
}
