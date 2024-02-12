import OnboardingCard from '@/components/onboarding/OnboardingCard';
import { checkOnboarded } from '@/lib/actions/user.actions';

export default async function Onboarding() {
  await checkOnboarded();
  return (
    <div className='flex grow justify-center p-4'>
      <OnboardingCard />
    </div>
  );
}
