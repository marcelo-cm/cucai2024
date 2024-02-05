import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';

interface OnboardingConfirmationProps {
  step: number;
  setStep: (value: number) => void;
  userDetails: any;
  setUserDetails: (value: any) => void;
}

const OnboardingConfirmation = ({
  step,
  setStep,
  userDetails,
  setUserDetails,
}: OnboardingConfirmationProps) => {
  return (
    <Card className='max-w-[560px] w-full'>
      <CardHeader>
        <CardTitle>Profile Summary</CardTitle>
        <CardDescription>
          Verify all details to complete the onboarding process.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid gap-4'>
          <div className='flex flex-row gap-2'>
            <p className='text-gray-400 font-medium'>Name –</p>
            <p>{userDetails.firstName + ' ' + userDetails.lastName}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <p className='text-gray-400 font-medium'>University –</p>
            <p>{userDetails.university}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <p className='text-gray-400 font-medium'>Organization –</p>
            <p>{userDetails.organization}</p>
          </div>
          <div className='flex flex-row gap-2'>
            <p className='text-gray-400 font-medium'>Paper –</p>
            <p>{userDetails.paper}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => setStep(step + 1)}>Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default OnboardingConfirmation;
