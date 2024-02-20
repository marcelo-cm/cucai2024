'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signout } from '@/lib/actions/auth.actions';
import { User } from '@/types';
import Link from 'next/link';

import ProfileDialog from './ProfileDialog';

interface NavUserDropdownProps {
  user: User;
}

export default function NavUserDropdown({ user }: NavUserDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={user?.avatar}
            alt={user.firstName + "'s profile picture"}
          />
          <AvatarFallback>
            {user?.firstName?.[0] + user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ProfileDialog />
        <DropdownMenuItem onClick={async () => await signout()}>
          Sign out
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='mailto:chair@cucai.ca'>Get Help</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
