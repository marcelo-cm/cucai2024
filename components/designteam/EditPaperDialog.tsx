// ----- HOOKS ----- //
import { useState } from 'react';

// ----- COMPONENTS ----- //
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import EditPaper from './EditPaper';

// ----- TYPES ----- //
import { Paper } from '@/types';

interface EditPaperDialogProps {
  paper: Paper;
}

export default function EditPaperDialog({ paper }: EditPaperDialogProps) {
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
        <DialogTrigger className='w-full'>Edit</DialogTrigger>
      </DropdownMenuItem>

      <EditPaper
        setOpen={setOpen}
        paper={paper}
      />
    </Dialog>
  );
}
