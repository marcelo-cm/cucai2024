import { AlertOctagon, CheckCircle2 } from 'lucide-react';

interface CardBannerProps {
  message: string;
  type: 'success' | 'error';
}
const CardBanner = ({ message, type }: CardBannerProps) => {
  return (
    <div className='w-full flex items-center gap-4 py-2 px-4 bg-slate-300'>
      {type === 'success' && <CheckCircle2 size={18} />}
      {type === 'error' && <AlertOctagon size={18} />}
      <p>{message}</p>
    </div>
  );
};

export default CardBanner;
