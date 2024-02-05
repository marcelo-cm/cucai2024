'use client';

import PrimaryDetails from '@/components/onboarding/PrimaryDetails';
import TeamEnrolment from '@/components/onboarding/TeamEnrolment';
import UniversityPlusTeam from '@/components/onboarding/TeamEnrolment';

import { useState } from 'react';

const Onboarding = () => {
  const [step, setStep] = useState<number>(0);
  const [userDetails, setUserDetails] = useState<any>({
    firstName: '',
    lastName: '',
    university: '',
    linkedin: '',
    team: '',
  });
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
        <TeamEnrolment
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
