'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/actions';
import { handleError } from '../utils';

interface Inputs {
  [key: string]: string;
}

export const updateUserProfile = async (
  formData: Inputs,
  userId: string
): Promise<any> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('profiles')
    .update({
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      linkedIn: formData.linkedin as string,
      university: formData.university as string,
      organization: formData.organization as string,
      onboarded: true,
    })
    .eq('id', userId)
    .select();

  if (error) throw new Error(error.message);

  redirect('/dashboard');
};

export async function getUserId() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/signin');
  }

  return data.user.id;
}

export async function checkOnboarded() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const userId = await getUserId();

  const { data, error } = await supabase
    .from('profiles')
    .select('onboarded')
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  if (data?.[0]?.onboarded) {
    redirect('/dashboard');
  }
}

export async function getUserDetails() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const userId = await getUserId();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
