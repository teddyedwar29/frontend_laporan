import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

import './App.css';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/admin/DashboardPage'));
const HierarchyPage = lazy(() => import('./pages/admin/HierarchyPage'));

const FullPageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <LoaderCircle className="animate-spin text-blue-600" size={48} />
  </div>
);

function App() {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/hierarchy" element={<HierarchyPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
