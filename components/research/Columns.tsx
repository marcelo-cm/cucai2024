'use client';

import { ColumnDef } from '@tanstack/react-table';
import { formatDate } from '@/lib/utils';

import { Paper } from '@/types';
import { paperTrackList } from '@/constants';

export const columns: ColumnDef<Paper>[] = [
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => {
      const paper = row.original;
      return <span>{formatDate(paper.createdAt)}</span>;
    },
  },
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
];
