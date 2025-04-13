import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

type Cookie = {
  name: string;
  value: string;
  options: {
    path?: string;
    maxAge?: number;
    domain?: string;
    sameSite?: 'lax' | 'strict' | 'none';
    secure?: boolean;
    httpOnly?: boolean;
  };
};

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: Cookie['options']) {
          cookieStore.set(name, value, options)
        },
        remove(name: string, options: Cookie['options']) {
          cookieStore.set(name, '', { ...options, maxAge: 0 })
        }
      }
    }
  )
}