import { Routes, Route } from 'react-router-dom';
import { CandidateLayout } from '../layouts/CandidateLayout';
import { HomePage } from '../pages/HomePage';
import { JobsPage } from '../pages/JobsPage';
import { JobDetailsPage } from '../pages/JobDetailsPage';
import { ApplicationPage } from '../pages/ApplicationPage';
import { ApplicationsPage } from '../pages/ApplicationsPage';
import { ProfilePage } from '../pages/ProfilePage';

export const AppRoutes = () => (
  <Routes>
    <Route element={<CandidateLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:slug" element={<JobDetailsPage />} />
      <Route path="/jobs/:slug/apply" element={<ApplicationPage />} />
      <Route path="/applications" element={<ApplicationsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
  </Routes>
);
