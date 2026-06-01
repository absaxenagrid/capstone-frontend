import { Search, Zap, Users, TrendingUp, ChevronRight, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useJobs } from '../features/jobs/hooks/useJobs';
import { JobCard } from '../components/jobs/JobCard';
import { JobCardSkeleton } from '../components/common/Skeleton';

const CultureCard = ({ icon, title, desc, bg }: { icon: React.ReactNode; title: string; desc: string; bg: string }) => (
  <div className={`rounded-2xl p-6 ${bg}`}>
    <div className="w-10 h-10 rounded-lg bg-white/80 dark:bg-slate-900/50 flex items-center justify-center mb-4">{icon}</div>
    <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
  </div>
);

export const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const { data: jobs, isLoading } = useJobs();
  const featured = jobs?.filter((j) => j.posting_status === 'PUBLISHED').slice(0, 6) ?? [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/jobs${search ? `?q=${encodeURIComponent(search)}` : ''}`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 min-h-[280px] flex items-end p-6 sm:p-8">
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1e40af 0%, transparent 50%)' }}
        />
        <div className="relative z-10 max-w-lg w-full">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-blue-200 text-xs font-medium tracking-wide">AI-NATIVE CAREERS</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3 leading-tight">
            Build the Future with Forge AI
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-sm">
            Join a team of elite engineers and designers redefining workforce intelligence through clinical precision and cutting-edge generative AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate('/jobs')} className="btn-primary px-5 py-2.5 text-sm w-full sm:w-auto">
              Explore Jobs
            </button>
            <button onClick={() => document.getElementById('culture')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-medium px-5 py-2.5 rounded-lg text-sm transition-colors w-full sm:w-auto">
              Learn About Us
            </button>
          </div>
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="card p-4 flex flex-col sm:flex-row gap-3 items-center">
        <div className="flex-1 w-full flex items-center relative">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, skill, or keyword..."
            className="flex-1 w-full ml-2 text-sm bg-transparent border-0 focus:outline-none text-slate-800 dark:text-slate-200 placeholder-slate-400"
          />
        </div>
        <button type="submit" className="btn-primary px-5 py-2 text-sm w-full sm:w-auto shrink-0">Search</button>
      </form>

      {/* Culture */}
      <div id="culture">
        <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-2">OUR DNA</p>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-slate-100 mb-6">The Forge Culture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative rounded-2xl overflow-hidden row-span-2 min-h-[240px] bg-slate-800 flex items-end p-6 bg-cover bg-center"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000)' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
            <div className="relative z-10">
              <h3 className="text-white font-semibold mb-1">Our Mission</h3>
              <p className="text-slate-300 text-sm">We exist to empower the world's most complex workforces through automated intelligence and decisive UI systems.</p>
            </div>
          </div>
          <CultureCard icon={<Zap className="w-5 h-5 text-primary-600" />} title="Innovation" desc="Shipping 10x faster by leveraging our own AI orchestration engine. We move with clinical speed." bg="bg-primary-50 dark:bg-slate-800" />
          <CultureCard icon={<Users className="w-5 h-5 text-slate-600 dark:text-slate-400" />} title="Diversity" desc="A global team from 40+ countries. We value unique cognitive perspectives above all else." bg="bg-slate-50 dark:bg-slate-800/50" />
        </div>
        <div className="mt-4 rounded-2xl bg-primary-600 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-semibold text-lg mb-1">Exponential Growth</h3>
            <p className="text-primary-100 text-sm max-w-md">Personalized AI-powered development tracks for every employee. Your career trajectory is data-driven and limitless.</p>
          </div>
          <TrendingUp className="w-10 h-10 text-primary-200 shrink-0" />
        </div>
      </div>

      {/* Life at Forge */}
      <div>
        <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-2">CULTURE & SPACES</p>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-slate-100 mb-4">Life at FORGE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=600'
          ].map((src, i) => (
            <div key={i} className="rounded-xl h-48 sm:h-36 flex items-end overflow-hidden bg-slate-200 dark:bg-slate-800 relative group">
              <img src={src} alt="Life at Forge" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Jobs */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-1">OPEN POSITIONS</p>
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-slate-100">Featured Opportunities</h2>
          </div>
          <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
            View all {jobs?.length ?? ''} roles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((job) => <JobCard key={job.id} job={job} featured />)}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="card p-6 sm:p-8 text-center">
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-slate-100 mb-2">Don't see your fit?</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 max-w-sm mx-auto">Join our talent community to get notified about new openings that match your skills as soon as they launch.</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (email) {
            setEmail('');
            const btn = document.getElementById('join-btn');
            if (btn) {
              const old = btn.innerText;
              btn.innerText = 'Joined! ✓';
              btn.classList.add('bg-green-600', 'hover:bg-green-700', 'text-white');
              setTimeout(() => {
                btn.innerText = old;
                btn.classList.remove('bg-green-600', 'hover:bg-green-700', 'text-white');
              }, 3000);
            }
          }
        }} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
          <div className="flex-1 relative w-full">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
          </div>
          <button id="join-btn" type="submit" className="btn-primary px-4 py-2.5 text-sm whitespace-nowrap transition-colors w-full sm:w-auto">Join Community</button>
        </form>
      </div>
    </div>
  );
};
