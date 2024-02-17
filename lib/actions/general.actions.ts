'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/actions';
import { MessageError } from '@/types';
import { redirect } from 'next/navigation';

export const paperSearch = async (search: string): Promise<any[]> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  if (!search) {
    return [];
  }

  const { data, error } = await supabase
    .from('papers')
    .select('*')
    .ilike('title', `%${search}%`)
    .order('title', { ascending: true })
    .limit(5);

  if (error) throw new Error(error.message);

  return data;
};

export const enrollPaper = async (
  paperId: number,
  password: string,
  userId: string
): Promise<MessageError | void> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: passwordData, error: passwordError } = await supabase
      .from('paperPasswords')
      .select('password')
      .eq('paperId', paperId)
      .single();

    if (passwordError) throw new Error(passwordError.message);

    if (passwordData?.password !== password)
      return { error: 'Invalid password' };

    const { data: paperData, error: paperError } = await supabase
      .from('paperProfiles')
      .insert({
        paperId: paperId,
        userId: userId,
      })
      .select('*');

    if (paperError) throw new Error(paperError.message);

    revalidatePath('/dashboard');
    return { message: 'Enrolled successfully' };
  } catch (error) {
    return { error: 'Failed to enroll in paper' };
  }
};

export const createPaper = async (
  formData: FormData
): Promise<MessageError | void> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const fieldData = {
    title: formData.get('title') as string,
    abstract: formData.get('abstract') as string,
    track: formData.get('track') as string,
    url: formData.get('url') as string,
    doi: formData.get('doi') as string,
    pdf: formData.get('pdf') as File,
    password: formData.get('password') as string,
  };

  // UPLOAD THE FILE TO STORAGE
  const fileName = `${new Date(Date.now()).getFullYear()}/${
    fieldData.title
  }-${Date.now()}.pdf`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('papers')
    .upload(fileName, fieldData.pdf);

  if (uploadError) throw new Error(uploadError.message);

  // GET THE FILE URL
  const { data: fileUrlData } = await supabase.storage
    .from('papers')
    .getPublicUrl(fileName);

  if (!fileUrlData) throw new Error('Failed to get public URL for the file');

  const fileUrl = fileUrlData.publicUrl;

  // CREATE PAPER ENTRY IN DATABASE
  const { data: paperEntry, error: paperEntryError } = await supabase
    .from('papers')
    .insert({
      title: fieldData.title,
      abstract: fieldData.abstract,
      track: fieldData.track,
      url: fieldData.url,
      doi: fieldData.doi,
      fileUrl: fileUrl,
    })
    .select('*');

  if (paperEntryError) throw new Error(paperEntryError.message);

  const paperId = paperEntry[0].id;

  // CREATE PASSWORD ENTRY IN DATABASE
  const { data: passwordData, error: passwordError } = await supabase
    .from('paperPasswords')
    .insert({
      paperId: paperId,
      password: fieldData.password,
    });

  if (passwordError) throw new Error(passwordError.message);

  revalidatePath('/dashboard');

  redirect('/dashboard');
};
