import { useNavigate, useParams } from 'react-router-dom';
import { useJob } from '../features/jobs/hooks/useJob';
import { ApplicationStepper } from '../components/application/ApplicationStepper';
import { ResumeUploader } from '../components/application/ResumeUploader';
import { SuccessPage } from '../components/application/SuccessModal';
import { AlreadyAppliedModal } from '../components/application/AlreadyAppliedModal';
import { addApplication, hasApplied } from '../store/localStorage';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { clsx } from 'clsx';

const STEPS = [{ label: 'Info' }, { label: 'Skills' }, { label: 'Resume' }, { label: 'Consent' }];

const schema = z.object({
  name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Phone required'),
  experienceYears: z.string().min(1, 'Select experience'),
  skills: z.array(z.string()).min(1, 'Add at least one skill'),
  gdprConsent: z.boolean().refine((v) => v === true, { message: 'GDPR consent required' }),
  futureOpportunities: z.boolean(),
});

type FormData = z.infer<typeof schema>;

const expOptions = ['1-3', '3-5', '5-10', '10+'];

const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={clsx('w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300', props.className)} />
);

export const ApplicationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading } = useJob(slug!);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [alreadyApplied, setAlreadyApplied] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [resumeFile, setResumeFile] = useState<File | undefined>();

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { skills: [], gdprConsent: false, futureOpportunities: false },
  });

  const skills = watch('skills');

  useEffect(() => {
    if (slug && hasApplied(slug)) setAlreadyApplied(true);
  }, [slug]);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setValue('skills', [...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };
  const removeSkill = (s: string) => setValue('skills', skills.filter((x) => x !== s));

  const onSubmit = () => {
    if (!job) return;
    addApplication({
      id: crypto.randomUUID(),
      jobId: job.id,
      jobTitle: job.title,
      jobSlug: job.slug,
      department: job.department,
      location: `${job.location_city} · ${job.work_mode}`,
      appliedDate: new Date().toISOString(),
      status: 'Applied',
      nextStep: 'HR Screening',
    });
    setSubmitted(true);
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  if (alreadyApplied && job) {
    return <AlreadyAppliedModal jobTitle={job.title} onClose={() => navigate(`/jobs/${slug}`)} />;
  }

  if (submitted && job) return <SuccessPage jobTitle={job.title} />;
  if (isLoading) return <div className="text-center py-20 text-slate-400">Loading...</div>;
  if (!job) return <div className="text-center py-20 text-slate-400">Job not found</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-2">
        ✦ Applying for: {job.title.toUpperCase()}
      </p>
      <h1 className="font-display font-bold text-3xl text-slate-900 mb-1">Job Application</h1>
      <p className="text-slate-500 text-sm mb-6">Complete the fields below to finalize your submission.</p>

      <div className="mb-8">
        <ApplicationStepper steps={STEPS} currentStep={step} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-4">
            {step === 0 && (
              <div className="card p-6">
                <h2 className="font-semibold text-slate-800 mb-4">👤 Personal Information</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Field label="Full Name" error={errors.name?.message}>
                    <Input {...register('name')} placeholder="Alexander Sterling" />
                  </Field>
                  <Field label="Email Address" error={errors.email?.message}>
                    <Input {...register('email')} type="email" placeholder="alex@example.com" />
                  </Field>
                </div>
                <Field label="Phone Number" error={errors.phone?.message}>
                  <Input {...register('phone')} placeholder="+1 (555) 892-0441" />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="card p-6">
                <h2 className="font-semibold text-slate-800 mb-4">Professional Info</h2>
                <Field label="Experience Years" error={errors.experienceYears?.message}>
                  <Controller
                    name="experienceYears"
                    control={control}
                    render={({ field }) => (
                      <div className="flex gap-2 flex-wrap">
                        {expOptions.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => field.onChange(opt)}
                            className={clsx('px-4 py-2 rounded-lg text-sm border font-medium transition-colors',
                              field.value === opt
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white text-slate-600 border-slate-200 hover:border-primary-300'
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  />
                </Field>
                <div className="mt-4">
                  <Field label="Core Skills" error={errors.skills?.message}>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {skills.map((s) => (
                        <span key={s} className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                          {s} <button type="button" onClick={() => removeSkill(s)}><X className="w-3 h-3" /></button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                        placeholder="Add a skill..."
                        className="flex-1"
                      />
                      <button type="button" onClick={addSkill} className="btn-secondary px-3 py-2 text-sm">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </Field>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card p-6">
                <h2 className="font-semibold text-slate-800 mb-4">📄 Resume Upload</h2>
                <ResumeUploader value={resumeFile} onChange={setResumeFile} />
              </div>
            )}

            {step === 3 && (
              <div className="card p-6">
                <h2 className="font-semibold text-slate-800 mb-4">⚖️ Legal & Consent</h2>
                <div className="space-y-4">
                  <label className="flex gap-3 cursor-pointer">
                    <input type="checkbox" {...register('gdprConsent')} className="mt-0.5 w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">GDPR Data Processing Consent</p>
                      <p className="text-xs text-slate-500 mt-0.5">I agree to the processing of my personal data for the recruitment process in accordance with the Privacy Policy.</p>
                    </div>
                  </label>
                  {errors.gdprConsent && <p className="text-red-500 text-xs">{errors.gdprConsent.message}</p>}
                  <label className="flex gap-3 cursor-pointer">
                    <input type="checkbox" {...register('futureOpportunities')} className="mt-0.5 w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-800">Future Opportunity Notification</p>
                      <p className="text-xs text-slate-500 mt-0.5">Keep my profile for 24 months to notify me about other relevant roles matching my profile.</p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="card p-5 h-fit">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Role Requirements</h3>
            <ul className="space-y-2">
              {(job.requirements || '').split('\n').filter(Boolean).slice(0, 4).map((r, i) => (
                <li key={i} className="flex gap-2 text-xs text-slate-600">
                  <span className="text-green-500 font-bold shrink-0">✓</span>
                  <span>{r.replace(/^[-•*]\s*/, '').slice(0, 60)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-200">
          <button type="button" onClick={prevStep} disabled={step === 0}
            className="btn-secondary px-5 py-2.5 text-sm disabled:opacity-40">
            Back
          </button>
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={nextStep} className="btn-primary px-6 py-2.5 text-sm">
              Continue to {STEPS[step + 1].label} →
            </button>
          ) : (
            <button type="submit" className="btn-primary px-6 py-2.5 text-sm">
              Submit Application →
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
