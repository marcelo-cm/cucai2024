'use client';

// ----- HOOKS ----- //
import { useState } from 'react';
import { motion } from 'framer-motion';

// ----- COMPONENTS ----- //
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import OnboardingForm from '@/components/onboarding/OnboardingForm';

// ----- CONSTANTS ----- //
import { onboardingForm } from '@/constants';

export default function OnboardingCard() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const lastStep = onboardingForm.steps.length;
  const progress = (currentStep / lastStep) * 100;

  return (
    <div className='md:w-[480px] w-full md:pt-32 pt-12'>
      <motion.div
        layout
        transition={{ duration: 0.05 }}
        className='w-full h-max'
      >
        <Card>
          <div className='w-full pt-4 px-4'>
            <Progress value={progress} />
          </div>

          <OnboardingForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            lastStep={lastStep}
          />
        </Card>
      </motion.div>
    </div>
  );
}
