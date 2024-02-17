'use client';

// ----- COMPONENTS ----- //
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';

// ----- HOOKS ----- //
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// ----- FUNCTIONS ----- //
import renderField from '@/components/onboarding/RenderField';
import { updateUserProfile } from '@/lib/actions/user.actions';
import { getUserId } from '@/lib/actions/user.actions';

// ----- CONSTANTS ----- //
import {
  onboardingForm,
  onboardingFormDictionary,
  organizationsList,
  universitiesList,
} from '@/constants';
import { Loader2 } from 'lucide-react';
import { Inputs } from '@/types';

interface OnboardingFormProps {
  currentStep: number;
  setCurrentStep: (value: number) => void;
  lastStep: number;
}

export default function OnboardingForm({
  currentStep,
  setCurrentStep,
  lastStep,
}: OnboardingFormProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [completedStep, setCompletedStep] = useState<boolean>(false);

  // FORM
  const { control, handleSubmit, watch, trigger } = useForm();
  const formValues = watch();

  // SUBMIT FUNCTION
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const userId = await getUserId();
    await updateUserProfile(data, userId);
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
      const fieldNames = onboardingForm.steps[currentStep]?.fields?.map(
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
            <CardTitle>{onboardingForm.steps[currentStep].title}</CardTitle>
            <CardDescription>
              {onboardingForm.steps[currentStep].description}
            </CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            {onboardingForm.steps[currentStep].fields.map((field) => (
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
      {currentStep === lastStep && (
        <>
          <CardHeader>
            <CardTitle>Profile Summary</CardTitle>
            <CardDescription>Verify all details are correct</CardDescription>
          </CardHeader>
          <CardContent className='grid gap-4'>
            {Object.entries(formValues).map(([key, value]) => (
              <div
                key={key}
                className='flex flex-row items-center gap-4'
              >
                <p className='font-bold text-sm'>
                  {
                    onboardingFormDictionary[
                      key as keyof typeof onboardingFormDictionary
                    ]
                  }
                </p>
                <p className='text-sm'>
                  {key === 'university'
                    ? universitiesList[value as keyof typeof universitiesList]
                    : key === 'organization'
                    ? organizationsList[value as keyof typeof organizationsList]
                    : value}
                </p>
              </div>
            ))}
          </CardContent>
          <CardFooter className='justify-between'>
            <Button
              type='submit'
              className='w-full'
              disabled={loading}
            >
              {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
              Submit
            </Button>
          </CardFooter>
        </>
      )}
    </form>
  );
}
