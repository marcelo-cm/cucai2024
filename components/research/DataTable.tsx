'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';
import { Button } from '../ui/button';

interface MyDataRow {
  [key: string]: any;
}

interface DataTableProps<TData extends MyDataRow, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageNumber: number;
  total: number;
  canNext: boolean;
  canPrev: boolean;
  paginationLimit: number;
}

export function DataTable<TData extends MyDataRow, TValue>({
  columns,
  data,
  pageNumber,
  total,
  canNext,
  canPrev,
  paginationLimit,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const router = useRouter();

  return (
    <>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => router.push(`/research/${row.original.id}`)}
                    className='cursor-pointer'
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='w-full flex items-center justify-center py-4'>
        <div className='flex items-center gap-4'>
          {canPrev && (
            <Button
              asChild
              variant='default'
            >
              <Link href={`/research?page=${pageNumber - 1}`}>Prev</Link>
            </Button>
          )}
          <div>
            {pageNumber} of {Math.ceil(total / paginationLimit)}
          </div>
          {canNext && (
            <Button
              asChild
              variant='default'
            >
              <Link href={`/research?page=${pageNumber + 1}`}>Next</Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
