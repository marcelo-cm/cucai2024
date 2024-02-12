import { getUserDetails } from '@/lib/actions/user.actions';
import NavUserDropdown from './NavUserDropdown';

export default async function NavigationBar() {
  const user = await getUserDetails();

  return (
    <nav className='w-full sticky top-0 flex flex-row items-center justify-between px-4 py-2 bg-white'>
      <div className='flex flex-row items-center gap-4'>
        <h1>CUCAI</h1>
      </div>
      <NavUserDropdown user={user} />
    </nav>
  );
}
