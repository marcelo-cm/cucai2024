'use client';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { onboardingForm } from '@/constants';

import { useForm, SubmitHandler } from 'react-hook-form';
import renderField from '../onboarding/RenderField';
import { Button } from '../ui/button';
import { getUserDetails, updateUserDetails } from '@/lib/actions/user.actions';
import { Inputs } from '@/types';
import { useEffect, useState } from 'react';
import CardBanner from '../shared/CardBanner';

interface EditProfileProps {
  setOpen: (open: boolean) => void;
}
export default function EditProfile({ setOpen }: EditProfileProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getUserDetails();
      reset(userDetails);
    };

    fetchUserDetails();
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log('SUBMITTING');
    console.log(data);
    setLoading(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const response = await updateUserDetails(formData);
    setLoading(false);
    if (response.error) {
      setError(response.error);
    } else if (response.message) {
      setOpen(false);
    }
  };

  return (
    <form name='editProfile'>
      <DialogContent className='grid gap-8'>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>Update your profile information</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4'>
          {error && (
            <CardBanner
              message={error}
              type='error'
            />
          )}

          {onboardingForm.steps.map((step) => (
            <div
              key={step.title}
              className='grid gap-4'
            >
              {step.fields.map((field) => (
                <div key={field.id}>{renderField(field, control)}</div>
              ))}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button onClick={() => handleSubmit(onSubmit)()}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </form>
  );
}
