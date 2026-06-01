import { MapPin, DollarSign, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Job } from '../../features/jobs/types/job.types';
import { formatSalary, formatWorkMode, formatExperience, formatLocation } from '../../lib/formatSalary';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const workModeBg: Record<string, string> = {
  REMOTE: 'bg-green-100 text-green-700',
  HYBRID: 'bg-purple-100 text-purple-700',
  ONSITE: 'bg-orange-100 text-orange-700',
  ON_SITE: 'bg-orange-100 text-orange-700',
};

const deptColors: Record<string, string> = {
  Engineering: 'bg-blue-100 text-blue-700',
  Finance: 'bg-emerald-100 text-emerald-700',
  Design: 'bg-pink-100 text-pink-700',
  Marketing: 'bg-yellow-100 text-yellow-700',
  HR: 'bg-indigo-100 text-indigo-700',
  Product: 'bg-violet-100 text-violet-700',
};

export const JobCard = ({ job, featured }: JobCardProps) => {
  const navigate = useNavigate();
  const initials = job.department.slice(0, 2).toUpperCase();
  const deptColor = deptColors[job.department] ?? 'bg-slate-100 text-slate-700';

  return (
    <div
      className="card p-5 hover:shadow-card-hover transition-all duration-200 cursor-pointer group"
      onClick={() => navigate(`/jobs/${job.slug}`)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${deptColor}`}>
          {initials}
        </div>
        {featured && (
          <span className="badge bg-amber-100 text-amber-700 text-[10px] uppercase tracking-wide">Hot Role</span>
        )}
        <span className={`badge ${workModeBg[job.work_mode] ?? 'bg-slate-100 text-slate-600'}`}>
          {formatWorkMode(job.work_mode)}
        </span>
      </div>

      <h3 className="font-semibold text-slate-900 text-sm mb-0.5 group-hover:text-primary-600 transition-colors line-clamp-1">
        {job.title}
      </h3>
      <p className="text-xs text-slate-500 mb-3">{job.department} · {job.job_category}</p>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{formatLocation(job.location_city, job.location_state, job.location_country)}</span>
        </div>
        {job.show_salary && (
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <DollarSign className="w-3.5 h-3.5 shrink-0" />
            <span>{formatSalary(job.salary_min, job.salary_max, job.currency)}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Briefcase className="w-3.5 h-3.5 shrink-0" />
          <span>{formatExperience(job.experience_level)}</span>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); navigate(`/jobs/${job.slug}/apply`); }}
        className="w-full btn-primary text-sm py-2 rounded-lg"
      >
        Apply Now
      </button>
    </div>
  );
};
