import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '@/components/ui/textarea';
import { uploadPaper } from '@/lib/actions/general.actions';

const PaperCreation = () => {
  const [paperFile, setPaperFile] = useState<File>();
  const [paperDetails, setPaperDetails] = useState<any>({
    title: '',
    abstract: '',
  });

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', paperFile as Blob);
    formData.append('title', paperDetails.title);
    formData.append('abstract', paperDetails.abstract);
    const response = await uploadPaper(formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setPaperFile(file);
    }
  };
  return (
    <Card className='max-w-[560px] w-full'>
      <CardHeader>
        <CardTitle>Add a paper</CardTitle>
        <CardDescription>
          Your paper will be available to anybody who visits the CUCAI website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleUpload}
          className='grid gap-4'
        >
          <div className='grid gap-2'>
            <Label htmlFor='title'>Title</Label>
            <Input
              id='title'
              name='title'
              type='text'
              required
              value={paperDetails.title}
              onChange={(e) =>
                setPaperDetails({ ...paperDetails, title: e.target.value })
              }
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='abstract'>Abstract</Label>
            <Textarea
              id='abstract'
              name='abstract'
              required
              value={paperDetails.abstract}
              onChange={(e) =>
                setPaperDetails({ ...paperDetails, abstract: e.target.value })
              }
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='paper'>File</Label>
            <input
              type='file'
              id='paper'
              name='paper'
              accept='.pdf'
              required
              onChange={handleFileChange}
            />
          </div>

          <Button type='submit'>Submit</Button>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default PaperCreation;
