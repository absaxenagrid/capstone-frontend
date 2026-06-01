import { ChevronDown } from 'lucide-react';
import type { JobFilters } from '../../features/jobs/types/job.types';

interface JobFiltersProps {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
  departments: string[];
}

const workModes = ['REMOTE', 'HYBRID', 'ONSITE'];
const experienceLevels = ['ENTRY', 'JUNIOR', 'MID', 'SENIOR', 'LEAD'];

const labelMap: Record<string, string> = {
  REMOTE: 'Remote', HYBRID: 'Hybrid', ONSITE: 'On-site',
  ENTRY: 'Entry Level', JUNIOR: 'Junior', MID: 'Mid Level', SENIOR: 'Senior', LEAD: 'Lead',
  FULL_TIME: 'Full Time', PART_TIME: 'Part Time', CONTRACT: 'Contract', INTERNSHIP: 'Internship',
};

interface SelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}

const FilterSelect = ({ label, value, options, onChange }: SelectProps) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-300 cursor-pointer"
    >
      <option value="">{label}</option>
      {options.map((o) => (
        <option key={o} value={o}>{labelMap[o] ?? o}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
  </div>
);

export const JobFiltersBar = ({ filters, onChange, departments }: JobFiltersProps) => {
  const update = (key: keyof JobFilters, val: string) => onChange({ ...filters, [key]: val || undefined });

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <FilterSelect label="Work Mode" value={filters.work_mode ?? ''} options={workModes} onChange={(v) => update('work_mode', v)} />
      <FilterSelect label="Seniority" value={filters.experience_level ?? ''} options={experienceLevels} onChange={(v) => update('experience_level', v)} />
      <FilterSelect label="Location" value={''} options={[]} onChange={() => {}} />
      <FilterSelect label="Department" value={filters.department ?? ''} options={departments} onChange={(v) => update('department', v)} />
      <div className="ml-auto relative">
        <select
          value={filters.sort ?? ''}
          onChange={(e) => update('sort', e.target.value)}
          className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-300 cursor-pointer"
        >
          <option value="">Sort by</option>
          <option value="latest">Latest</option>
          <option value="salary_high">Highest Salary</option>
          <option value="salary_low">Lowest Salary</option>
          <option value="az">A–Z</option>
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
};
