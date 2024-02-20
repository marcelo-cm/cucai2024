'use client';
// ----- HOOKS ----- //
import { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';

// ----- COMPONENTS ----- //
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, MoreHorizontal } from 'lucide-react';

// ----- FUNCTIONS ----- //
import { formatDate } from '@/lib/utils';
import EditPaperDialog from '@/components/designteam/EditPaperDialog';
import { deletePaper, getPasswordByPaper } from '@/lib/actions/general.actions';

// ----- CONSTANTS ----- //
import { Paper } from '@/types';
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
      const paper = row.original;
      const [password, setPassword] = useState<string | null>(null);

      useEffect(() => {
        const getPaperPassWord = async (id: number) => {
          const password = await getPasswordByPaper(paper?.id);
          setPassword(typeof password === 'string' ? password : null);
        };

        getPaperPassWord(paper?.id);
      }, [paper]);

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(password || '')}
            >
              Copy Password
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://cucai.ca/papers/${paper?.id}`
                )
              }
            >
              Share Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <EditPaperDialog paper={paper} />
            <DropdownMenuItem
              onClick={async () => await deletePaper(paper?.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
