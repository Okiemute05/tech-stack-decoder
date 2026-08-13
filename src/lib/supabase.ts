import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Public client — used on the client side (respects Row Level Security)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client — used in API routes only (bypasses RLS)
// Only works where SUPABASE_SERVICE_ROLE_KEY is available (server-side)
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : supabase;

export type TechCategory = "Frontend" | "Backend" | "Database" | "Analytics" | "Other";

// Define TypeScript interfaces for our database schema
export interface Database {
  public: {
    Tables: {
      technologies: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string;
          eli5_description: string;
          category: TechCategory;
          website_url: string;
          icon_url: string | null;
          created_at: string;
        };
        Insert: {
          name: string;
          slug: string;
          description: string;
          eli5_description: string;
          category: TechCategory;
          website_url: string;
          icon_url?: string | null;
        };
      };
      analyses: {
        Row: {
          id: string;
          domain: string;
          status: 'pending' | 'completed' | 'failed';
          created_at: string;
        };
        Insert: {
          domain: string;
          status?: 'pending' | 'completed' | 'failed';
        };
      };
      analysis_tech: {
        Row: {
          analysis_id: string;
          tech_id: string;
        };
        Insert: {
          analysis_id: string;
          tech_id: string;
        };
      };
    };
  };
}
