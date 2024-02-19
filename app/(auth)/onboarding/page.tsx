import OnboardingCard from '@/components/onboarding/OnboardingCard';
import { checkOnboarded } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

export default async function Onboarding() {
  // REDIRECT TO DASHBOARD IF THE USER IS LOGGED IN AND HAS ALREADY ONBOARDED
  const onboarded = await checkOnboarded();
  if (onboarded) {
    redirect('/dashboard');
  }

  return (
    <div className='flex grow justify-center p-4'>
      <OnboardingCard />
    </div>
  );
}
