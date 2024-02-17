import OnboardingCard from '@/components/onboarding/OnboardingCard';
import { checkOnboarded, getUserId } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

export default async function Onboarding() {
  // REDIRECT TO DASHBOARD IF THE USER IS LOGGED IN AND HAS ALREADY ONBOARDED
  const userId = await getUserId();
  const onboarded = await checkOnboarded(userId);
  if (onboarded) {
    redirect('/dashboard');
  }
  return (
    <div className='flex grow justify-center p-4'>
      <OnboardingCard />
    </div>
  );
}
