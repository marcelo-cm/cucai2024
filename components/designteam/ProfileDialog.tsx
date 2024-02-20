import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import EditProfile from './EditProfile';
import { DropdownMenuItem } from '../ui/dropdown-menu';

function ProfileDialog() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DropdownMenuItem
        asChild
        onSelect={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTrigger className='w-full'>Edit Profile</DialogTrigger>
      </DropdownMenuItem>

      <EditProfile setOpen={setOpen} />
    </Dialog>
  );
}

export default ProfileDialog;
