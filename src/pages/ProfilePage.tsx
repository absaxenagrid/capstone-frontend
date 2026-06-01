import { useState } from 'react';
import { getProfile, saveProfile } from '../store/localStorage';
import type { CandidateProfile } from '../features/jobs/types/job.types';
import { Edit2, Plus, X, FileText, Download, Eye } from 'lucide-react';
import { clsx } from 'clsx';

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={clsx('relative w-10 h-6 rounded-full transition-colors duration-200', checked ? 'bg-primary-600' : 'bg-slate-200')}
  >
    <div className={clsx('absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200', checked ? 'translate-x-5' : 'translate-x-1')} />
  </button>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">{label}</label>
    {children}
  </div>
);

export const ProfilePage = () => {
  const [profile, setProfile] = useState<CandidateProfile>(getProfile);
  const [editing, setEditing] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [locInput, setLocInput] = useState('');

  const update = (key: keyof CandidateProfile, value: unknown) => {
    setProfile((p) => ({ ...p, [key]: value }));
  };

  const saveChanges = () => {
    saveProfile(profile);
    setEditing(false);
  };

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      update('skills', [...profile.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (s: string) => update('skills', profile.skills.filter((x) => x !== s));

  const addLoc = () => {
    if (locInput.trim() && !profile.preferredLocations.includes(locInput.trim())) {
      update('preferredLocations', [...profile.preferredLocations, locInput.trim()]);
      setLocInput('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Personal Info */}
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-start justify-between mb-5">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-7 h-7 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center text-sm">👤</span>
              Personal Information
            </h2>
            <button onClick={() => editing ? saveChanges() : setEditing(true)}
              className="flex items-center gap-1.5 text-xs text-primary-600 hover:text-primary-700 btn-secondary px-3 py-1.5">
              <Edit2 className="w-3.5 h-3.5" /> {editing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Field label="Full Name">
              {editing ? <input value={profile.name} onChange={(e) => update('name', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                : <p className="text-sm font-medium text-slate-900">{profile.name || '—'}</p>}
            </Field>
            <Field label="Professional Title">
              {editing ? <input value={profile.professionalTitle} onChange={(e) => update('professionalTitle', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                : <p className="text-sm font-medium text-slate-900">{profile.professionalTitle || '—'}</p>}
            </Field>
            <Field label="Email Address">
              {editing ? <input value={profile.email} onChange={(e) => update('email', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                : <p className="text-sm text-slate-700">{profile.email || '—'}</p>}
            </Field>
            <Field label="Phone Number">
              {editing ? <input value={profile.phone} onChange={(e) => update('phone', e.target.value)} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
                : <p className="text-sm text-slate-700">{profile.phone || '—'}</p>}
            </Field>
          </div>
          <Field label="Professional Bio">
            {editing ? <textarea value={profile.bio} onChange={(e) => update('bio', e.target.value)} rows={3} className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 resize-none" />
              : <p className="text-sm text-slate-600 leading-relaxed">{profile.bio || '—'}</p>}
          </Field>
        </div>

        {/* Preferences */}
        <div className="card p-6">
          <h2 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-sm">⚙</span>
            Preferences
          </h2>
          <div className="mb-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Work Mode</p>
            <div className="flex gap-1.5 flex-wrap">
              {['REMOTE', 'HYBRID', 'ONSITE'].map((m) => (
                <button key={m} type="button" onClick={() => update('workMode', m)}
                  className={clsx('px-3 py-1 rounded-full text-xs font-medium transition-colors', profile.workMode === m ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200')}>
                  {m.charAt(0) + m.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Preferred Locations</p>
            {profile.preferredLocations.map((loc) => (
              <div key={loc} className="flex items-center gap-1.5 text-xs text-slate-700 mb-1">
                <span>📍</span> {loc}
                {editing && <button onClick={() => update('preferredLocations', profile.preferredLocations.filter((l) => l !== loc))}><X className="w-3 h-3 text-slate-400" /></button>}
              </div>
            ))}
            {editing && (
              <div className="flex gap-1.5 mt-2">
                <input value={locInput} onChange={(e) => setLocInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLoc(); } }} placeholder="Add location..." className="flex-1 text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-300" />
                <button type="button" onClick={addLoc} className="text-primary-600"><Plus className="w-4 h-4" /></button>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Desired Salary Range</p>
            {editing ? <input value={profile.salaryExpectation} onChange={(e) => update('salaryExpectation', e.target.value)} placeholder="e.g. $145k - $180k" className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300" />
              : <p className="text-sm font-semibold text-primary-700">{profile.salaryExpectation || '—'}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Resume */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">📄 Resume</h2>
            <button type="button" onClick={() => document.getElementById('resume-upload')?.click()} className="text-xs text-primary-600 hover:text-primary-700 font-medium">Replace</button>
            <input id="resume-upload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) { update('resumeFileName', file.name); saveChanges(); } }} />
          </div>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary-400 hover:bg-slate-50 transition-colors" onClick={() => !profile.resumeFileName && document.getElementById('resume-upload')?.click()}>
            <FileText className="w-10 h-10 text-primary-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-700">{profile.resumeFileName ?? 'Drag and drop your resume or click to browse'}</p>
            {profile.resumeFileName && <p className="text-xs text-slate-400 mt-1">Updated recently</p>}
          </div>
          {profile.resumeFileName && (
            <div className="flex gap-2 mt-3">
              <button type="button" onClick={() => { const w = window.open(); w?.document.write(`<title>${profile.resumeFileName}</title><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#f8fafc;color:#64748b;">Preview of ${profile.resumeFileName}</body>`); }} className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Preview</button>
              <button type="button" onClick={() => { const a = document.createElement('a'); a.href = 'data:text/plain;charset=utf-8,Simulated%20resume%20content'; a.download = profile.resumeFileName || 'resume.pdf'; a.click(); }} className="flex-1 btn-secondary text-xs py-2 flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> Download</button>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-800">✦ Skills</h2>
            <p className="text-xs text-slate-400">Validated against workforce benchmarks</p>
          </div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Core Expertise</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.skills.slice(0, 4).map((s) => (
              <span key={s} className="inline-flex items-center gap-1 bg-primary-100 text-primary-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                {s}
                {editing && <button onClick={() => removeSkill(s)}><X className="w-3 h-3" /></button>}
              </span>
            ))}
            {profile.skills.slice(4).map((s) => (
              <span key={s} className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium">
                {s}
                {editing && <button onClick={() => removeSkill(s)}><X className="w-3 h-3" /></button>}
              </span>
            ))}
          </div>
          {editing && (
            <div className="flex gap-2">
              <input value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }} placeholder="Add skill..." className="flex-1 text-xs border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-300" />
              <button type="button" onClick={addSkill} className="btn-primary px-3 py-2 text-xs">Add</button>
            </div>
          )}
        </div>
      </div>

      {/* Communication Prefs */}
      <div className="card p-6">
        <h2 className="font-semibold text-slate-800 mb-4">⚙️ Communication Preferences</h2>
        <div className="space-y-4">
          {[
            { key: 'smartJobAlerts' as const, label: 'Smart Job Alerts', desc: 'Receive AI-curated job recommendations via email weekly' },
            { key: 'applicationStatusUpdates' as const, label: 'Application Status Updates', desc: 'Real-time push notifications when your status changes' },
            { key: 'employerMessaging' as const, label: 'Employer Messaging', desc: 'Allow direct messaging from verified hiring managers' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-800">{label}</p>
                <p className="text-xs text-slate-500">{desc}</p>
              </div>
              <Toggle checked={!!profile[key]} onChange={(v) => update(key, v)} />
            </div>
          ))}
        </div>
        {editing && (
          <button onClick={saveChanges} className="btn-primary mt-4 px-5 py-2 text-sm">Save All Changes</button>
        )}
      </div>
    </div>
  );
};
