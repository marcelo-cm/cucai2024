'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/actions';
import { handleError } from '../utils';
import { Inputs, MessageError, User } from '@/types';

export const updateUserProfile = async (formData: Inputs): Promise<any> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (!userData || userError) throw new Error('User not found');

  const userId = userData.session?.user.id;

  const { data, error } = await supabase
    .from('profiles')
    .update({
      firstName: formData.firstName as string,
      lastName: formData.lastName as string,
      linkedIn: formData.linkedIn as string,
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

export async function checkOnboarded(): Promise<boolean> {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (!userData || userError) throw new Error('User not found');

  const userId = userData.session?.user.id;

  const { data, error } = await supabase
    .from('profiles')
    .select('onboarded')
    .eq('id', userId);

  return data?.[0].onboarded;
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

export async function updateUserDetails(
  formData: FormData
): Promise<MessageError> {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // FUNCTION TO GET USER ID
    const { data: userData, error: userError } =
      await supabase.auth.getSession();

    if (!userData || userError) throw new Error('User not found');

    const userId = userData.session?.user.id;

    // EXTRACTING FORM DATA
    const userFormData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      linkedIn: formData.get('linkedIn') as string,
      university: formData.get('university') as string,
      organization: formData.get('organization') as string,
    };

    // UPDATING USER PROFILE
    const { data, error } = await supabase
      .from('profiles')
      .update(userFormData)
      .eq('id', userId)
      .select('*');

    if (error) throw new Error(error.message);

    return { message: 'Profile updated successfully' };
  } catch (error: any) {
    handleError(error);
    return { message: error.message };
  }
}
