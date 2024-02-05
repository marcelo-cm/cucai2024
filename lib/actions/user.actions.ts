'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/actions';

const updateUserProfile = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from('profile').select('*');

  if (error) throw new Error(error.message);

  redirect('/projects');
};
