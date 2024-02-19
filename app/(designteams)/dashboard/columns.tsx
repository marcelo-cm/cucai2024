'use client';

import { ColumnDef } from '@tanstack/react-table';
import { FileText, MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Paper } from '@/types';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { paperTrackList } from '@/constants';

export const columns: ColumnDef<Paper>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'track',
    header: 'Track',
    cell: ({ row }) => {
      const paper = row.original;
      return (
        <span>
          {paperTrackList[paper.track as keyof typeof paperTrackList]}
        </span>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Upload date',
    cell: ({ row }) => {
      const paper = row.original;
      return <span>{formatDate(paper.createdAt)}</span>;
    },
  },
  {
    accessorKey: 'fileUrl',
    header: 'File',
    cell: ({ row }) => {
      const paper = row.original;
      return (
        <Link
          href={paper.fileUrl}
          target='_blank'
          className='flex items-center gap-2'
        >
          <FileText size={28} />
          <p>File</p>
        </Link>
      );
    },
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
              onClick={() => navigator.clipboard.writeText(project.title)}
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
