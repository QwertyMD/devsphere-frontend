import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Loading from '@/components/Loading';
import UserEvents from '@/pages/user/UserEvents';
import UserHome from '@/pages/user/UserHome';
import UserMembers from '@/pages/user/UserMembers';
import UserProjects from '@/pages/user/UserProjects';
import UserLayout from '@/components/user/UserLayout';

import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminEventEditor from '@/pages/admin/AdminEventEditor';
import AdminMembers from '@/pages/admin/AdminMembers';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminProjectEditor from '@/pages/admin/AdminProjectEditor';
import AdminTags from '@/pages/admin/AdminTags';
import AdminSettings from '@/pages/admin/AdminSettings';
import { useSession } from '@/lib/authClient';

const AdminPublicRoute = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.isPending && session.data) navigate('/admin');
  }, [session.isPending, session.data, navigate]);

  if (session.isPending) return <Loading />;
  return children;
};

const AdminPrivateRoute = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.isPending && !session.data) navigate('/admin/login');
  }, [session.isPending, session.data, navigate]);

  if (session.isPending) return <Loading />;
  return children;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname !== '/') window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
};

const NotFound = () => (
  <div className="grid-bg mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-6 text-center">
    <p className="text-xs font-bold tracking-[0.22em] text-red-700 uppercase">Lost in space</p>
    <h1 className="font-heading mt-4 text-5xl font-bold text-slate-950 md:text-6xl">404</h1>
    <p className="mt-3 max-w-md text-slate-600">
      This page drifted off orbit. Let's get you back to the community.
    </p>
    <Link
      to="/"
      className="mt-7 rounded-full bg-red-700 px-7 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-red-800"
    >
      Back home
    </Link>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="members" element={<UserMembers />} />
          <Route path="projects" element={<UserProjects />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<AdminEventEditor />} />
          <Route path="events/:id" element={<AdminEventEditor />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/new" element={<AdminProjectEditor />} />
          <Route path="projects/:id" element={<AdminProjectEditor />} />
          <Route path="tags" element={<AdminTags />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
