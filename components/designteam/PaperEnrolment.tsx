'use client';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';

import { useEffect, useState } from 'react';
import useOutsideClick from '@/lib/hooks/useOutsideClick';

import { enrollPaper, paperSearch } from '@/lib/actions/general.actions';

import { FilePlus, FileSearch2, XCircle } from 'lucide-react';
import { Paper } from '@/types';
import { useRouter } from 'next/navigation';
import { Label } from '../ui/label';
import CardBanner from '../shared/CardBanner';
import { getUserId } from '@/lib/actions/user.actions';

interface PaperEnrolmentProps {
  setOpen: (open: boolean) => void;
}

const PaperEnrolment = ({ setOpen }: PaperEnrolmentProps) => {
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [password, setPassword] = useState<string>('');
  const [results, setResults] = useState<Paper[]>([]);
  const [search, setSearch] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(true);

  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const data = await paperSearch(search);

      if (data) {
        setShowResults(true);
        setResults(data);
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = await getUserId();
    const response = await enrollPaper(
      selectedPaper?.id || 0,
      password,
      userId
    );
    if (response?.error) {
      setSuccess(false);
      setError(response.error);
    } else if (response?.message) {
      setError('');
      setSearch('');
      setPassword('');
      setSelectedPaper(null);
      setOpen(false);
    }
  };

  return (
    <DialogContent className='max-w-[560px] w-full'>
      <form
        onSubmit={handleSubmit}
        className='grid gap-4'
      >
        <DialogHeader>
          <DialogTitle>{`Let's find your team's submission`}</DialogTitle>
          <DialogDescription>
            Search for your paper/project by name, if not found, you can create
            a new team.
          </DialogDescription>
        </DialogHeader>
        {error && (
          <CardBanner
            message={error}
            type='error'
          />
        )}
        {selectedPaper && success && (
          <CardBanner
            message='Successfully found your submission'
            type='success'
          />
        )}
        <div className='grid gap-2 relative'>
          <div className='grid gap-4'>
            <div className='grid gap-2 relative'>
              <Label htmlFor='paperQuery'>Paper title</Label>
              <Input
                id='paperQuery'
                name='paperQuery'
                type='text'
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full disabled:opacity-full'
                disabled={selectedPaper !== null}
              />
              {selectedPaper && (
                <Button
                  onClick={() => {
                    setSelectedPaper(null);
                    setSearch('');
                    setShowResults(true);
                  }}
                  className='absolute right-4 top-1/2 w-max h-max p-0 bg-transparent hover:bg-transparent'
                >
                  <XCircle
                    size={18}
                    className='text-black'
                  />
                </Button>
              )}
            </div>
            {selectedPaper && (
              <div className='grid gap-2 '>
                <Label htmlFor='paperQuery'>Password</Label>
                <Input
                  id='password'
                  name='password'
                  type='text'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full'
                />
              </div>
            )}
          </div>

          {showResults && (
            <SearchResults
              results={results}
              setSuccess={setSuccess}
              setSelectedPaper={setSelectedPaper}
              setShowResults={setShowResults}
            />
          )}
        </div>
        <DialogFooter>
          {selectedPaper && (
            <Button
              variant='default'
              type='submit'
            >
              Join
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default PaperEnrolment;

interface SearchResultsProps {
  results: Paper[];
  setSuccess: (success: boolean) => void;
  setSelectedPaper: (selectedPaper: Paper) => void;
  setShowResults: (showResults: boolean) => void;
}
export const SearchResults = ({
  results,
  setSuccess,
  setSelectedPaper,
  setShowResults,
}: SearchResultsProps) => {
  const router = useRouter();
  const commandRef = useOutsideClick(() => setShowResults(false));
  const selectTeam = (result: any) => {
    setSuccess(true);
    setSelectedPaper(result);
    setShowResults(false);
  };

  const createPaper = () => {
    router.push('/paper-upload');
  };

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
            onClick={createPaper}
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
