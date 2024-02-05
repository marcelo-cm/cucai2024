import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import Sidebar from '@/components/shared/Sidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect('/');
  }

  return (
    <section className='flex grow'>
      <Sidebar />
      {children}
    </section>
  );
}
