import { Search, ChevronDown } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useJobs } from '../features/jobs/hooks/useJobs';
import { filterJobs } from '../api/jobs.api';
import type { JobFilters } from '../features/jobs/types/job.types';
import { JobCard } from '../components/jobs/JobCard';
import { JobFiltersBar } from '../components/jobs/JobFilters';
import { PageSkeleton } from '../components/common/Skeleton';

const PAGE_SIZE = 12;

export const JobsPage = () => {
  const [searchParams] = useSearchParams();
  const currentQ = searchParams.get('q') ?? '';
  const [searchText, setSearchText] = useState(currentQ);
  const [filters, setFilters] = useState<JobFilters>({ search: currentQ });
  const [prevQ, setPrevQ] = useState(currentQ);
  const [page, setPage] = useState(1);
  const { data: allJobs, isLoading, isError } = useJobs();

  if (currentQ !== prevQ) {
    setPrevQ(currentQ);
    setSearchText(currentQ);
    setFilters((f) => ({ ...f, search: currentQ }));
  }

  const departments = useMemo(() => [...new Set(allJobs?.map((j) => j.department) ?? [])].sort(), [allJobs]);

  const filtered = useMemo(() => {
    if (!allJobs) return [];
    return filterJobs(allJobs.filter((j) => j.posting_status === 'PUBLISHED'), filters);
  }, [allJobs, filters]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((f) => ({ ...f, search: searchText }));
    setPage(1);
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by job title, company, or keywords..."
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
        </div>
        <button type="submit" className="btn-primary px-5 py-2.5 text-sm">Search</button>
      </form>

      {/* Filters */}
      <div className="mb-6">
        <JobFiltersBar
          filters={filters}
          onChange={(f) => { setFilters(f); setPage(1); }}
          departments={departments}
        />
      </div>

      {/* Results */}
      {isLoading ? (
        <PageSkeleton />
      ) : isError ? (
        <div className="text-center py-20 text-slate-500">Failed to load jobs. Please try again.</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg font-medium">No jobs found</p>
          <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or search term.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {paginated.map((job) => <JobCard key={job.id} job={job} />)}
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-500 mb-3">
              Showing {paginated.length} of {filtered.length} open opportunities
            </p>
            {hasMore && (
              <button
                onClick={() => setPage((p) => p + 1)}
                className="btn-secondary px-6 py-2.5 text-sm inline-flex items-center gap-2"
              >
                Load More Jobs <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
