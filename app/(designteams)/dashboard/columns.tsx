'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export type Paper = {
  projectName: string;
  organization: string;
  uploadDate: string;
};

export const columns: ColumnDef<Paper>[] = [
  {
    accessorKey: 'projectName',
    header: 'Project Name',
  },
  {
    accessorKey: 'track',
    header: 'Track',
  },
  {
    accessorKey: 'uploadDate',
    header: 'Upload date',
  },
  {
    accessorKey: 'file',
    header: 'File',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const project = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy Password</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(project.projectName)}
            >
              Share Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
