'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
