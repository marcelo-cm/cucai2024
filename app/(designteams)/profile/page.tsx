'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';

import { useState } from 'react';
import UniversityComboBox from '@/components/shared/UniversityComboBox';

const Profile = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<any>();

  return (
    <div className='flex grow flex-col gap-8 p-8 bg-white'>
      <h1 className='text-2xl font-bold'>My Profile</h1>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='name'>First Name</Label>
          <Input
            id='firstname'
            name='firstname'
            type='text'
            required
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Last Name</Label>
          <Input
            id='lastname'
            name='lastname'
            type='text'
            required
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='name'>LinkedIn</Label>
          <Input
            id='linkedin'
            name='linkedin'
            type='url'
            required
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='name'>University</Label>
          <UniversityComboBox
            open={open}
            setOpen={setOpen}
            value={value}
            setValue={setValue}
          />
        </div>
      </div>
      <Button>Save</Button>
    </div>
  );
};

export default Profile;
