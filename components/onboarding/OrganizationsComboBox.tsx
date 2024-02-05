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

import { organizations } from '@/constants';
import { cn } from '@/lib/utils';

interface OrganizationsComboBoxProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  value: any;
  setValue: (value: any) => void;
}

const OrganizationsComboBox = ({
  open,
  setOpen,
  value,
  setValue,
}: OrganizationsComboBoxProps) => {
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
          {value || 'Select an organization'}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[280px] p-0'>
        <Command>
          <CommandInput placeholder='Search organization...' />
          <CommandEmpty>Organization not found.</CommandEmpty>
          <CommandGroup>
            {organizations.map((org) => (
              <CommandItem
                key={org.value}
                onSelect={() => {
                  setValue((prev: any) => ({
                    ...prev,
                    organization: org.label,
                    organizationKey: org.value,
                  }));
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === org.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {org.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default OrganizationsComboBox;
