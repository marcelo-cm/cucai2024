import Hero from '@/components/research/Hero';
import ResearchPapers from '@/components/research/ResearchPapers';
import getResearchPapers from '@/lib/actions/general.actions';

const paginationLimit = 2;

export default async function page({
  searchParams: { page = '1' },
}: {
  searchParams: { page: string };
}) {
  let pageNumber;

  try {
    pageNumber = parseInt(page) || 1;
    if (pageNumber < 1) pageNumber = 1;
  } catch (error) {
    pageNumber = 1;
  }

  const response = await getResearchPapers(pageNumber, paginationLimit);
  const papers = response?.papers;
  const total = response?.total || 0;
  const canNext = total > pageNumber * paginationLimit || false;
  const canPrev = pageNumber > 1 || false;

  return (
    <div className='flex grow flex-col'>
      <Hero />
      <ResearchPapers
        papers={papers}
        pageNumber={pageNumber}
        total={total}
        canNext={canNext}
        canPrev={canPrev}
        paginationLimit={paginationLimit}
      />
    </div>
  );
}
