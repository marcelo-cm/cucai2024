'use client';

// ----- HOOKS ----- //
import { useState } from 'react';
import { motion } from 'framer-motion';

// ----- COMPONENTS ----- //
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import PaperCreationForm from './PaperCreationForm';
import { paperCreationForm } from '@/constants';

export default function PaperCard() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const lastStep = paperCreationForm.steps.length;
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

          <PaperCreationForm
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            lastStep={lastStep}
          />
        </Card>
      </motion.div>
    </div>
  );
}
