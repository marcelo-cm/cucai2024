'use client';
import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { universities } from '@/constants';
import { cn } from '@/lib/utils';

interface UniversityComboBoxProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  value: any;
  setValue: (value: any) => void;
}

const UniversityComboBox = ({
  open,
  setOpen,
  value,
  setValue,
}: UniversityComboBoxProps) => {
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[280px] justify-between'
        >
          {value?.label || 'Select a university'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[280px] p-0'>
        <Command>
          <CommandInput placeholder='Search universities...' />
          <CommandEmpty>University not found.</CommandEmpty>
          <CommandGroup>
            {universities.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={(currentValue) => {
                  setValue(framework);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default UniversityComboBox;
