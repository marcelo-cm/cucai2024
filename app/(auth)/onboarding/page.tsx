'use client';

import PrimaryDetails from '@/components/onboarding/PrimaryDetails';
import TeamEnrolment from '@/components/onboarding/PaperEnrolment';
import PaperEnrolment from '@/components/onboarding/PaperEnrolment';

import { useState } from 'react';

const Onboarding = () => {
  const [step, setStep] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<any>({
    firstName: '',
    lastName: '',
    university: '',
    universityKey: '',
    linkedin: '',
    paper: '',
    paperId: '',
    organization: '',
  });

  console.log('userDetails', userDetails);
  return (
    <div className='flex grow items-center justify-center'>
      {step === 0 && (
        <PrimaryDetails
          step={step}
          setStep={setStep}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}
      {step === 1 && (
        <PaperEnrolment
          step={step}
          setStep={setStep}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}
    </div>
  );
};

export default Onboarding;
