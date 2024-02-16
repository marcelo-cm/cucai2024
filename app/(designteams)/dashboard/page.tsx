import React from 'react';

import { Paper, columns } from './columns';

import { DataTable } from './data-table';

async function getData(): Promise<Paper[]> {
  // Fetch data from your API here.
  return [
    // {
    //   projectName: 'Project 1',
    //   track: 'Track 1',
    //   organization: 'Organization 1',
    //   uploadDate: '2022-01-01',
    // },
    // {
    //   projectName: 'Project 2',
    //   track: 'Track 2',
    //   organization: 'Organization 2',
    //   uploadDate: '2022-01-02',
    // },
  ];
}

export default async function Dashboard() {
  const data = await getData();

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
