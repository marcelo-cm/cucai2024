'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import UniversityComboBox from './UniversityComboBox';
import { useState } from 'react';
import OrganizationsComboBox from './OrganizationsComboBox';

interface PrimaryDetailsProps {
  step: number;
  setStep: (value: number) => void;
  userDetails: any;
  setUserDetails: (value: any) => void;
}

const PrimaryDetails = ({
  step,
  setStep,
  userDetails,
  setUserDetails,
}: PrimaryDetailsProps) => {
  const [uniOpen, setUniOpen] = useState<boolean>(false);
  const [orgOpen, setorgOpen] = useState<boolean>(false);
  return (
    <Card className='max-w-[560px] w-full'>
      <CardHeader>
        <CardTitle>Tell us a bit about yourself</CardTitle>
        <CardDescription>
          This information will be spotlighted on our website, along with your
          research paper / project.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <Label htmlFor='firstname'>First Name</Label>
            <Input
              id='firstname'
              name='firstname'
              type='text'
              required
              value={userDetails.firstName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, firstName: e.target.value })
              }
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='lastname'>Last Name</Label>
            <Input
              id='lastname'
              name='lastname'
              type='text'
              required
              value={userDetails.lastName}
              onChange={(e) =>
                setUserDetails({ ...userDetails, lastName: e.target.value })
              }
            />
          </div>
          <div className='grid gap-2'>
            <Label>University</Label>
            <UniversityComboBox
              value={userDetails.university}
              setValue={setUserDetails}
              open={uniOpen}
              setOpen={setUniOpen}
            />
          </div>
          <div className='grid gap-2'>
            <Label>Organization / Club</Label>
            <OrganizationsComboBox
              value={userDetails.organization}
              setValue={setUserDetails}
              open={orgOpen}
              setOpen={setorgOpen}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setStep(step + 1)}>Continue</Button>
      </CardFooter>
    </Card>
  );
};

export default PrimaryDetails;
