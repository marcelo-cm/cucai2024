import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { checkOnboarded } from './lib/actions/user.actions';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  const user = await supabase.auth.getUser();

  // ONLY REDIRECT IF USER IS LOGGED IN AND NOT ON ONBOARDING PAGE, OTHERWISE INFINITE REDIRECT LOOP
  if (user.data.user && request.nextUrl.pathname !== '/onboarding') {
    const onboarded = await checkOnboarded(user.data.user.id);

    if (!onboarded) {
      return NextResponse.redirect(new URL('/onboarding', request.nextUrl));
    }
  }

  // REDIRECT TO SIGN IN PAGE IF THE USER IS NOT LOGGED IN
  if (!user.data.user) {
    return NextResponse.redirect(new URL('/signin', request.nextUrl));
  }

  return response;
}

export const config = {
  matcher: ['/onboarding', '/dashboard', '/dashboard/(.*)', '/paper-upload'],
};
