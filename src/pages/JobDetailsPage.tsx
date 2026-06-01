import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Briefcase, Clock, DollarSign, Calendar, ChevronLeft } from 'lucide-react';
import { useJob } from '../features/jobs/hooks/useJob';
import { formatSalary, formatWorkMode, formatExperience, formatEmploymentType, formatLocation } from '../lib/formatSalary';
import { formatDate } from '../lib/formatDate';
import { AlreadyAppliedModal } from '../components/application/AlreadyAppliedModal';
import { hasApplied } from '../store/localStorage';
import { useState } from 'react';

const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="mb-6">
    <h2 className="font-display font-semibold text-lg text-slate-900 mb-3">{title}</h2>
    <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{content}</div>
  </div>
);

export const JobDetailsPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { data: job, isLoading, isError } = useJob(slug!);
  const [showAlreadyApplied, setShowAlreadyApplied] = useState(false);

  const handleApply = () => {
    if (hasApplied(slug!)) {
      setShowAlreadyApplied(true);
    } else {
      navigate(`/jobs/${slug}/apply`);
    }
  };

  if (isLoading) return (
    <div className="max-w-3xl mx-auto">
      <div className="card p-6 animate-pulse space-y-3">
        <div className="h-3 bg-slate-200 rounded w-1/4" />
        <div className="h-7 bg-slate-200 rounded w-2/3" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
      </div>
    </div>
  );

  if (isError || !job) return (
    <div className="text-center py-20">
      <p className="text-slate-500">Job not found.</p>
      <button onClick={() => navigate('/jobs')} className="btn-secondary mt-4 text-sm">Back to Jobs</button>
    </div>
  );

  const tags = job.requirements?.split(/[,\n]/).filter(Boolean).map((t) => t.trim()).slice(0, 8) ?? [];

  return (
    <div className="max-w-3xl mx-auto">
      <button onClick={() => navigate('/jobs')} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Jobs
      </button>

      <div className="card p-6 mb-4">
        <p className="text-xs font-medium text-primary-600 mb-2">{job.department}</p>
        <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">{job.title}</h1>
        <div className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
          <MapPin className="w-4 h-4" />
          <span>{formatLocation(job.location_city, job.location_state, job.location_country)} ({formatWorkMode(job.work_mode)})</span>
        </div>
        <button onClick={handleApply} className="btn-primary px-6 py-2.5 text-sm">Apply Now</button>
      </div>

      {/* Banner image placeholder */}
      <div className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 h-48 flex items-end p-5 mb-6">
        <p className="text-slate-300 text-sm font-medium">Join the team building the future of autonomous logistics.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Briefcase, label: 'Type', val: formatEmploymentType(job.employment_type) },
          { icon: Clock, label: 'Level', val: formatExperience(job.experience_level) },
          { icon: DollarSign, label: 'Salary', val: job.show_salary ? formatSalary(job.salary_min, job.salary_max, job.currency) : 'Not disclosed' },
          { icon: Calendar, label: 'Posted', val: formatDate(job.published_at) },
        ].map(({ icon: Icon, label, val }) => (
          <div key={label} className="card p-3 text-center">
            <Icon className="w-4 h-4 text-primary-600 mx-auto mb-1" />
            <p className="text-[10px] text-slate-400 uppercase tracking-wide mb-0.5">{label}</p>
            <p className="text-xs font-medium text-slate-800">{val}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <Section title="Role Summary" content={job.description} />
        
        {job.responsibilities && (
          <div className="mb-6">
            <h2 className="font-display font-semibold text-lg text-slate-900 mb-3">Key Responsibilities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {job.responsibilities.split('\n').filter(Boolean).slice(0, 4).map((r, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-4">
                  <p className="text-sm text-slate-700 font-medium mb-1">Point {i + 1}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{r.replace(/^[-•*]\s*/, '')}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tags.length > 0 && (
          <div className="mb-6">
            <h2 className="font-display font-semibold text-lg text-slate-900 mb-3">Technical Requirements</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] font-semibold tracking-wider text-slate-600 bg-slate-100 px-3 py-1.5 rounded uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {job.benefits && <Section title="Benefits" content={job.benefits} />}

        <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Posted: {formatDate(job.published_at)}</span>
          <span>Expires: {formatDate(job.expires_at)}</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button onClick={handleApply} className="btn-primary px-10 py-3">Apply for this Role</button>
      </div>

      {showAlreadyApplied && (
        <AlreadyAppliedModal jobTitle={job.title} onClose={() => setShowAlreadyApplied(false)} />
      )}
    </div>
  );
};
