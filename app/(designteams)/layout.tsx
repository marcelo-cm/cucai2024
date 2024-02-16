import { checkAuth } from '@/lib/actions/auth.actions';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAuth();
  return <section className='flex grow flex-col'>{children}</section>;
}
