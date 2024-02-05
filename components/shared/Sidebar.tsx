'use client';

import { navlinks } from '@/constants';
import Link from 'next/link';
import React from 'react';

import { Button } from '@/components/ui/button';
import { FileUp, LibraryBig, UserRound } from 'lucide-react';

import { signout } from '@/lib/actions/auth.actions';

const signoutUser = async () => {
  await signout();
};

const Sidebar = () => {
  return (
    <div className='max-w-[266px] w-full h-full flex flex-col justify-between overflow-y-auto bg-white p-2 border-r'>
      <div className='grid w-full'>
        <p>CUCAI</p>
        <div className='grid gap-2 w-full'>
          {navlinks.map((item) => (
            <Button
              asChild
              variant='ghost'
              className='justify-start gap-2'
              key={item.name}
            >
              <Link href={item.href}>
                {item.name === 'Projects' && <LibraryBig size={20} />}
                {item.name === 'Profile' && <UserRound size={20} />}
                {item.name === 'Submit' && <FileUp size={20} />}
                {item.name}
              </Link>
            </Button>
          ))}
        </div>
      </div>
      <Button
        onClick={signoutUser}
        variant='outline'
      >
        Signout
      </Button>
    </div>
  );
};

export default Sidebar;
