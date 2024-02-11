'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/actions';

// Sign-in function
export async function signin(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) throw new Error(error.message);

  revalidatePath('/', 'layout');
  redirect('/');
}

// Sign-up function
export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  console.log(error?.message);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/', 'layout');
  redirect('/onboarding');
}

// Sign-out function
export async function signout() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  await supabase.auth.signOut();

  revalidatePath('/', 'layout');
  redirect('/');
}

// Check if user is authenticated
export async function checkAuth() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/signin');
  }
}
