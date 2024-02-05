'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { paperSearch } from '@/lib/actions/general.actions';
import { FilePlus, FileSearch2, XCircle } from 'lucide-react';
import useOutsideClick from '@/lib/hooks/useOutsideClick';

interface PaperEnrolmentProps {
  step: number;
  setStep: (value: number) => void;
  userDetails: any;
  setUserDetails: (value: any) => void;
}

const PaperEnrolment = ({
  step,
  setStep,
  userDetails,
  setUserDetails,
}: PaperEnrolmentProps) => {
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState<string>('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const data = await paperSearch(search);

      if (data) {
        setIsOpen(true);
        setResults(data);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <Card className='max-w-[560px] w-full'>
      <CardHeader>
        <CardTitle>Let's find your project</CardTitle>
        <CardDescription>
          Search for your paper/project by name, if not found, you can create a
          new team.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-2 relative'>
          {userDetails.paper && (
            <div className='flex justify-between bg-gray-100 rounded-md px-4 py-3'>
              <p className='text-sm font-semibold'>
                {'Selected: ' + userDetails.paper}
              </p>
              <Button
                variant={'ghost'}
                className='w-max h-max p-0'
                onClick={() =>
                  setUserDetails((prev: any) => ({
                    ...prev,
                    paper: '',
                    paperId: '',
                  }))
                }
              >
                <XCircle size={18} />
              </Button>
            </div>
          )}
          <Input
            id='teamQuery'
            name='teamQuery'
            type='text'
            required
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full'
          />

          {isOpen && (
            <SearchResults
              results={results}
              setUserDetails={setUserDetails}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setStep(step + 1)}>Continue</Button>
      </CardFooter>
    </Card>
  );
};

export default PaperEnrolment;

export const SearchResults = ({
  results,
  setUserDetails,
  setIsOpen,
}: {
  results: any[];
  setUserDetails: any;
  setIsOpen: any;
}) => {
  const commandRef = useOutsideClick(() => setIsOpen(false));
  const selectTeam = (result: any) => {
    setUserDetails((prev: any) => ({
      ...prev,
      paper: result.title,
      paperId: result.id,
    }));
    setIsOpen(false);
  };

  const createPaper = (result: any) => {};
  return (
    <div
      ref={commandRef}
      className='absolute top-full z-10 mt-3 py-4 w-full shadow-md rounded-md bg-white border border-gray-200'
    >
      <div className='w-full grid gap-3'>
        <div className='w-full grid gap-1'>
          <p className='px-4 text-sm text-gray-400'>Actions</p>
          <Button
            variant={'ghost'}
            className='justify-start hover:underline gap-2'
            // onClick={() => createPaper()}
          >
            <FilePlus size={18} />
            <p>Create a new paper</p>
          </Button>
        </div>
        <div className='w-full grid gap-1'>
          <p className='px-4 text-sm text-gray-400'>Search Results</p>
          {results.length === 0 && (
            <div className='w-full flex justify-center py-2'>
              <p className='px-4 text-sm text-gray-400'>No Results</p>
            </div>
          )}
          {results.length > 0 &&
            results.map((result) => (
              <Button
                variant={'ghost'}
                key={result.id}
                className='justify-start gap-2 hover:underline'
                onClick={() => selectTeam(result)}
              >
                <FileSearch2 size={18} />
                <p>{result.title}</p>
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
};
