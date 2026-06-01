import { Check } from 'lucide-react';
import { clsx } from 'clsx';

interface Step { label: string; }

interface Props {
  steps: Step[];
  currentStep: number;
}

export const ApplicationStepper = ({ steps, currentStep }: Props) => (
  <div className="flex items-center gap-0">
    {steps.map((step, i) => {
      const done = i < currentStep;
      const active = i === currentStep;
      return (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div className={clsx(
              'w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-all',
              done && 'bg-primary-600 border-primary-600 text-white',
              active && 'bg-primary-600 border-primary-600 text-white',
              !done && !active && 'bg-white border-slate-300 text-slate-400'
            )}>
              {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={clsx('text-[10px] mt-1 font-medium uppercase tracking-wide',
              active ? 'text-primary-600' : done ? 'text-slate-500' : 'text-slate-400'
            )}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={clsx('flex-1 h-0.5 mx-1 mb-4', done ? 'bg-primary-600' : 'bg-slate-200')} />
          )}
        </div>
      );
    })}
  </div>
);
