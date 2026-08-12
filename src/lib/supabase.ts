import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
