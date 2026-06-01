import { Bell, HelpCircle, Moon, Sun, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const [search, setSearch] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) navigate(`/jobs?q=${encodeURIComponent(search)}`);
  };

  const toggleDarkMode = () => {
    const dark = document.documentElement.classList.toggle('dark');
    setIsDark(dark);
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-14 flex items-center px-4 gap-4 sticky top-0 z-30 transition-colors duration-200">
      <span className="font-display font-bold text-xl text-primary-700 dark:text-primary-500 mr-2 shrink-0 cursor-pointer" onClick={() => navigate('/')}>FORGE</span>
      <form onSubmit={handleSearch} className="flex-1 max-w-md relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search roles..."
          className="w-full pl-9 pr-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary-300 transition-colors duration-200"
        />
      </form>
      <div className="ml-auto flex items-center gap-3 text-slate-500 dark:text-slate-400 relative">
        <button className="sm:hidden hover:text-slate-700 dark:hover:text-slate-200 transition-colors" onClick={() => {
          const input = prompt('Search roles:');
          if (input) navigate(`/jobs?q=${encodeURIComponent(input)}`);
        }}><Search className="w-5 h-5" /></button>
        <a href="mailto:support@forge.com" className="hidden sm:block hover:text-slate-700 dark:hover:text-slate-200 transition-colors"><HelpCircle className="w-5 h-5" /></a>
        <button onClick={toggleDarkMode} className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button onClick={() => setShowNotif(!showNotif)} className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        {showNotif && (
          <div className="absolute top-10 right-0 w-64 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg p-4 z-50">
            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Notifications</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">We found 2 new jobs matching your profile.</p>
            <button onClick={() => { setShowNotif(false); navigate('/jobs'); }} className="text-xs text-primary-600 dark:text-primary-400 hover:underline">View Jobs</button>
          </div>
        )}

        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 font-semibold text-sm cursor-pointer" onClick={() => navigate('/profile')}>A</div>
      </div>
    </header>
  );
};