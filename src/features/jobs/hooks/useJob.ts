import { useQuery } from '@tanstack/react-query';
import { getJobBySlug } from '../services/jobs.service';

export const useJob = (slug: string) =>
  useQuery({ queryKey: ['job', slug], queryFn: () => getJobBySlug(slug), enabled: !!slug });
