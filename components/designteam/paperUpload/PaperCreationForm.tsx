import React from 'react';

// ----- COMPONENTS ----- //
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// ----- HOOKS ----- //
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// ----- FUNCTIONS ----- //
import renderField from '@/components/onboarding/RenderField';

// ----- CONSTANTS ----- //
import { paperCreationForm } from '@/constants';
import { Loader2 } from 'lucide-react';

interface PaperCreationFormProps {
  currentStep: number;
  setCurrentStep: (value: number) => void;
  lastStep: number;
}

interface Inputs {
  [key: string]: any;
}

export default function PaperCreationForm({
  currentStep,
  setCurrentStep,
  lastStep,
}: PaperCreationFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [completedStep, setCompletedStep] = useState<boolean>(false);

  // FORM
  const { control, handleSubmit, watch, trigger } = useForm();
  const formValues = watch();

  // SUBMIT FUNCTION
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    // submit logic
    setLoading(false);
  };

  // HANDLE NEXT FUNCTION
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (completedStep && currentStep < lastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  // VALIDATE IF CURRENT STEP FIELDS ARE COMPLETED
  useEffect(() => {
    const validateCurrentStepFields = async () => {
      const fieldNames = paperCreationForm.steps[currentStep]?.fields?.map(
        (field) => field.id
      );
      if (!fieldNames) return;
      const result = await trigger(fieldNames);
      setCompletedStep(result);
    };

    validateCurrentStepFields();
  }, [currentStep, formValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {currentStep < lastStep && (
        <>
          <CardHeader>
            <CardTitle>{paperCreationForm.steps[currentStep].title}</CardTitle>
            <CardDescription>
              {paperCreationForm.steps[currentStep].description}
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            {paperCreationForm.steps[currentStep].fields.map((field) => (
              <div
                key={field.id}
                className='w-full'
              >
                {renderField(field, control)}
              </div>
            ))}
          </CardContent>
          <CardFooter className='justify-between'>
            <Button
              disabled={!completedStep}
              onClick={handleNext}
              className='w-full'
            >
              Next
            </Button>
          </CardFooter>
        </>
      )}
      {currentStep === lastStep && <>Done</>}
    </form>
  );
}
