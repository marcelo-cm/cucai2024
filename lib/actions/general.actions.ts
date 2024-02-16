'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/actions';

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

interface EnrollPaperResponse {
  error?: string;
  message?: string;
}

export const enrollPaper = async (
  paperId: number,
  password: string,
  userId: string
): Promise<EnrollPaperResponse | void> => {
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

export const uploadPaper = async (formData: FormData): Promise<void> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const paperDetails = {
      title: formData.get('title') as string,
      abstract: formData.get('abstract') as string,
      paperFile: formData.get('file') as File,
    };
    if (!paperDetails.paperFile) throw new Error('No file provided');

    const fileName = `${paperDetails.title}-${Date.now()}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('papers')
      .upload(fileName, paperDetails.paperFile);

    const { data: fileUrlData } = await supabase.storage
      .from('papers')
      .getPublicUrl(fileName);

    if (!fileUrlData) throw new Error('Failed to get public URL for the file');

    const fileUrl = fileUrlData.publicUrl;

    const { data, error } = await supabase.from('papers').insert({
      title: paperDetails.title,
      abstract: paperDetails.abstract,
      fileUrl: uploadData,
    });

    // everything working, just need to clean this up and get the response to the user, redirecting them to the complete screen
  } catch (error) {
    console.error(error);
  }
};
