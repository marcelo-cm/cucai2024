import NavigationBar from '@/components/designteam/NavigationBar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex grow flex-col'>
      <NavigationBar />
      {children}
    </section>
  );
}
