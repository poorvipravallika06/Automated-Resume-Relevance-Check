import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import HomePage from '@/components/pages/HomePageNew';
import CareerGuidancePage from '@/components/pages/CareerGuidancePage';
import ResumeAnalysisPage from '@/components/pages/ResumeAnalysisPage';
import MentorsPage from '@/components/pages/MentorsPage';
import RecruiterFlowPage from '@/components/pages/RecruiterFlowPage';
import EmployeeFlowPage from '@/components/pages/EmployeeFlowPage';
import AdminFlowPage from '@/components/pages/AdminFlowPage';
import AccreditationsPage from '@/components/pages/AccreditationsPage';
import LearningResourcesPage from '@/components/pages/LearningResourcesPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "career-guidance",
        element: <CareerGuidancePage />,
      },
      {
        path: "resume-analysis",
        element: <ResumeAnalysisPage />,
      },
      {
        path: "mentors",
        element: <MentorsPage />,
      },
      {
        path: "recruiter-flow",
        element: <RecruiterFlowPage />,
      },
      {
        path: "employee-flow",
        element: <EmployeeFlowPage />,
      },
      {
        path: "admin-flow",
        element: <AdminFlowPage />,
      },
      {
        path: "accreditations",
        element: <AccreditationsPage />,
      },
      {
        path: "learning-resources",
        element: <LearningResourcesPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
