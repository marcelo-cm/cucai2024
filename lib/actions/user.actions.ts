'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/actions';
import { Inputs, MessageError, User } from '@/types';
import { revalidatePath } from 'next/cache';

export async function getUserId() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect('/signin');
  }

  return data.user.id;
}

export async function checkOnboarded(userId: string): Promise<boolean> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('profiles')
    .select('onboarded')
    .eq('id', userId);

  return data?.[0]?.onboarded;
}

export async function getUserDetails(): Promise<User> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const userId = await getUserId();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId);

  if (error) throw new Error(error.message);

  return data[0];
}

// FUNCTION USED DURING ONBOARDING AND PROFILE EDITING TO UPDATE USER DETAILS ON THE PROFILE TABLE
export async function updateUserDetails(
  formData: FormData
): Promise<MessageError> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // FUNCTION TO GET USER ID & EMAIL
  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (!userData || userError) return { error: 'User not found' };

  const userId = userData.session?.user.id;
  const email = userData.session?.user?.email;

  // EXTRACTING FORM DATA
  const fieldData = Array.from(formData.entries()).reduce(
    (acc, [key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        acc[key] = value;
      }
      return acc;
    },
    { id: userId, email, onboarded: true } as any
  );

  // UPDATING USER PROFILE
  const { data, error } = await supabase
    .from('profiles')
    .upsert(fieldData)
    .eq('id', userId)
    .select('*');

  if (error) return { error: error.message };

  revalidatePath('/onboarding');

  return { message: 'Profile updated successfully' };
}

export const deleteUser = async (): Promise<void> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // FUNCTION TO GET USER ID
  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (!userData || userError) throw new Error('User not found');

  const userId = userData.session?.user.id;

  // DELETING USER
  const { error } = await supabase.from('profiles').delete().eq('id', userId);

  if (error) throw new Error(error.message);

  // SIGN OUT USER

  await supabase.auth.signOut();

  redirect('/signin');
};
