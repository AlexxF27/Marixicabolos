import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase credentials are configured
const isSupabaseConfigured = supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key-here';

// Create Supabase client only if configured, otherwise null
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Mock OTP storage for development without Supabase
const mockOtpStore = new Map<string, { code: string; expiresAt: number; userData?: any }>();

// Helper to generate random 6-digit code
function generateOtpCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Mock authentication service that simulates Supabase behavior
export const authService = {
  async signInWithOtp(params: { email: string; options?: any }) {
    if (supabase) {
      // Use real Supabase
      return await supabase.auth.signInWithOtp(params);
    }

    // Mock implementation
    const code = generateOtpCode();
    const expiresAt = Date.now() + 60 * 60 * 1000; // 1 hour

    mockOtpStore.set(params.email, {
      code,
      expiresAt,
      userData: params.options?.data
    });

    // Log the code to console for development
    console.log('🔐 [MODO DESENVOLVIMENTO] Código OTP para', params.email, ':', code);
    console.log('💡 Usa este código na página de verificação');

    return {
      data: { user: null, session: null },
      error: null
    };
  },

  async verifyOtp(params: { email: string; token: string; type: string }) {
    if (supabase) {
      // Use real Supabase
      return await supabase.auth.verifyOtp(params);
    }

    // Mock implementation
    const stored = mockOtpStore.get(params.email);

    if (!stored) {
      return {
        data: { user: null, session: null },
        error: { message: 'No OTP found for this email' }
      };
    }

    if (Date.now() > stored.expiresAt) {
      mockOtpStore.delete(params.email);
      return {
        data: { user: null, session: null },
        error: { message: 'OTP has expired' }
      };
    }

    if (stored.code !== params.token) {
      return {
        data: { user: null, session: null },
        error: { message: 'Invalid OTP code' }
      };
    }

    // Valid OTP - clean up and return success
    mockOtpStore.delete(params.email);

    return {
      data: {
        user: {
          id: Math.random().toString(36).substr(2, 9),
          email: params.email,
          user_metadata: stored.userData || {}
        },
        session: {
          access_token: 'mock-token',
          refresh_token: 'mock-refresh'
        }
      },
      error: null
    };
  }
};
