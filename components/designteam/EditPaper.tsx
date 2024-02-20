'use client';

// ----- HOOKS ----- //
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// ----- COMPONENTS ----- //
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import CardBanner from '../shared/CardBanner';

// ----- FUNCTIONS ----- //
import renderField from '../onboarding/RenderField';
import { updatePaper } from '@/lib/actions/general.actions';

// ----- HOOKS ----- //
import { Inputs, Paper } from '@/types';
import { paperCreationForm } from '@/constants';

interface EditPaperProps {
  setOpen: (open: boolean) => void;
  paper: Paper;
}

export default function EditPaper({ setOpen, paper }: EditPaperProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(paper);
  }, [paper]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    setLoading(true);
    const formData = new FormData();

    // ADD EACH FIELD TO DATA ONLY IF IT HAS CHANGED, BUT ALWAYS INCLUDE ID
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'id' || value !== paper[key as keyof Paper]) {
        formData.append(key, value);
      }
    });

    const response = await updatePaper(formData);
    setLoading(false);
    if (response.error) {
      setError(response.error);
    } else if (response.message) {
      setOpen(false);
    }
  };

  return (
    <form name='editPaper'>
      <DialogContent className='grid gap-8'>
        <DialogHeader>
          <DialogTitle>Edit Paper Details</DialogTitle>
          <DialogDescription>Update your paper's information</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4'>
          {error && (
            <CardBanner
              message={error}
              type='error'
            />
          )}

          {paperCreationForm.steps.map((step) => (
            <div
              key={step.title}
              className='grid gap-4'
            >
              {step.fields.map((field) => {
                // DISABLED REQUIRED SO THAT THE USER CAN SUBMIT THE FORM WITHOUT CHANGING THE FIELD
                field.required = false;
                return (
                  <div key={field.id}>
                    {field.id !== 'password' && renderField(field, control)}
                  </div>
                );
              })}
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
