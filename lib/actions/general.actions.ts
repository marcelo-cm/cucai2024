'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/actions';
import { Inputs, MessageError, Paper } from '@/types';
import { redirect } from 'next/navigation';

// FUNCTION USED TO SEARCH FOR PAPERS DURING ENROLMENT
export const paperSearch = async (search: string): Promise<Paper[]> => {
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

// FUNCTION USED TO ENROLL IN EXISTING PAPER
export const enrollPaper = async (
  paperId: number,
  password: string
): Promise<MessageError | void> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: userData, error: userError } =
      await supabase.auth.getSession();

    if (!userData || userError) throw new Error('User not found');

    const userId = userData.session?.user.id;

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

// FUNCTION USED TO CREATE THE PAPER
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

  // GET USER ID

  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (!userData || userError) throw new Error('User not found');

  const userId = userData.session?.user.id;

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
    })
    .select('*');

  if (passwordError) throw new Error(passwordError.message);

  // ADD USER TO PAPER PROFILES TABLE

  const { data: paperProfileData, error: paperProfileError } = await supabase
    .from('paperProfiles')
    .insert({
      paperId: paperId,
      userId: userId,
    })
    .select('*');

  if (paperProfileError) throw new Error(paperProfileError.message);

  revalidatePath('/dashboard');

  redirect('/dashboard');
};

// FUNCTION TO GET ALL PAPERS BY USER

export const getPapersByUser = async (): Promise<Paper[]> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: userData, error: userError } = await supabase.auth.getSession();

  if (!userData || userError) throw new Error('User not found');

  const userId = userData.session?.user.id;

  const { data, error } = await supabase
    .from('paperProfiles')
    .select('paperId')
    .eq('userId', userId);

  if (error) throw new Error(error.message);

  const paperIds = data.map((paper) => paper.paperId);

  const { data: paperData, error: paperError } = await supabase
    .from('papers')
    .select('*')
    .in('id', paperIds);

  if (paperError) throw new Error(paperError.message);

  return paperData;
};

// FUNCTION TO GET PAPER PASSWORD
export const getPasswordByPaper = async (
  paperId: number
): Promise<string | MessageError> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('paperPasswords')
      .select('password')
      .eq('paperId', paperId)
      .single();

    if (error) throw new Error(error.message);

    return data.password;
  } catch (error: any) {
    return { error: error.message };
  }
};

// FUNCTION TO UPDATE PAPER DETAILS
export const updatePaper = async (
  formData: FormData
): Promise<MessageError> => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // CONSTRUCT FIELD DATA OBJECT WITH ALL NON-EMPTY FIELDS
    const fieldData = Array.from(formData.entries()).reduce(
      (acc, [key, value]) => {
        if (
          value !== null &&
          value !== undefined &&
          value !== '' &&
          key !== 'pdf'
        ) {
          acc[key] = value;
        }
        return acc;
      },
      {} as Inputs
    );

    const { data, error } = await supabase
      .from('papers')
      .update(fieldData)
      .eq('id', fieldData.id)
      .select('*')
      .single();

    if (error) throw new Error(error.message);

    // CHECK IF THERE IS A FILE TO UPLOAD
    if (formData && (formData.get('pdf') as File)) {
      const fileUrl = new URL(data.fileUrl);
      const parsedUrl = `${fileUrl.pathname.split('/papers/')[1]}`;

      const { data: updateFileData, error: updateFileError } =
        await supabase.storage
          .from('papers')
          .update(parsedUrl, formData.get('pdf') as File, {
            cacheControl: '3600',
            upsert: true,
          });

      if (updateFileError) throw new Error(updateFileError.message);
    }

    return { message: 'Paper updated successfully' };
  } catch (error: any) {
    return { error: error.message };
  }
};
