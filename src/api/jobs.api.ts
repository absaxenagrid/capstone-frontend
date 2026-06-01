import api from './axios';
import type { Job, JobFilters } from '../features/jobs/types/job.types';

export const getJobs = async (): Promise<Job[]> => {
  const { data } = await api.get<{ data: Job[] }>('/jobs');
  return data.data;
};

export const getJobBySlug = async (slug: string): Promise<Job | undefined> => {
  const jobs = await getJobs();
  return jobs.find((j) => j.slug === slug);
};

export const searchJobs = async (query: string): Promise<Job[]> => {
  const jobs = await getJobs();
  const q = query.toLowerCase();
  return jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(q) ||
      j.department.toLowerCase().includes(q) ||
      j.location_city.toLowerCase().includes(q) ||
      j.job_category.toLowerCase().includes(q)
  );
};

export const filterJobs = (jobs: Job[], filters: JobFilters): Job[] => {
  let result = [...jobs];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.department.toLowerCase().includes(q) ||
        j.location_city.toLowerCase().includes(q) ||
        j.job_category.toLowerCase().includes(q)
    );
  }
  if (filters.work_mode) result = result.filter((j) => j.work_mode === filters.work_mode);
  if (filters.experience_level) result = result.filter((j) => j.experience_level === filters.experience_level);
  if (filters.employment_type) result = result.filter((j) => j.employment_type === filters.employment_type);
  if (filters.department) result = result.filter((j) => j.department === filters.department);

  if (filters.sort === 'latest') result.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  else if (filters.sort === 'salary_high') result.sort((a, b) => b.salary_max - a.salary_max);
  else if (filters.sort === 'salary_low') result.sort((a, b) => a.salary_min - b.salary_min);
  else if (filters.sort === 'az') result.sort((a, b) => a.title.localeCompare(b.title));

  return result;
};
