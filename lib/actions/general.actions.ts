'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/actions';
import error from 'next/error';

export const paperSearch = async (search: string): Promise<any[]> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('papers')
    .select('*')
    .ilike('title', `%${search}%`)
    .order('title', { ascending: true });

  if (error) throw new Error(error.message);

  return data;
};
