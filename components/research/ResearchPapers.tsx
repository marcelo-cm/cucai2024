'use client';

import { Paper } from '@/types';
import { DataTable } from './DataTable';
import { columns } from './Columns';
import { useEffect, useState } from 'react';
import getResearchPapers from '@/lib/actions/general.actions';

interface ResearchPapersProps {
  papers: Paper[];
  pageNumber: number;
  total: number;
  canNext: boolean;
  canPrev: boolean;
  paginationLimit: number;
}

export default function ResearchPapers({
  papers,
  pageNumber,
  total,
  canNext,
  canPrev,
  paginationLimit,
}: ResearchPapersProps) {
  return (
    <>
      <DataTable
        columns={columns}
        data={papers}
        pageNumber={pageNumber}
        total={total}
        canNext={canNext}
        canPrev={canPrev}
        paginationLimit={paginationLimit}
      />
    </>
  );
}
