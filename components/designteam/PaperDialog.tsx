'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import PaperEnrolment from './PaperEnrolment';
import { useState } from 'react';

interface PaperDialogProps {
  label: string;
}

export default function PaperDialog({ label }: PaperDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button
          type='button'
          variant='default'
        >
          {label}
        </Button>
      </DialogTrigger>
      <PaperEnrolment setOpen={setOpen} />
    </Dialog>
  );
}
