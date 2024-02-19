import React from 'react';

import { columns } from './columns';

import { DataTable } from './data-table';
import { getPapersByUser } from '@/lib/actions/general.actions';

export default async function Dashboard() {
  const data = await getPapersByUser();

  console.log(data);

  return (
    <div className='flex grow flex-col gap-4 p-4 bg-white'>
      <h1 className='text-2xl font-bold'>My projects</h1>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}
