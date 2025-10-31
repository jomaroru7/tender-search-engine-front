import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useAuthenticator } from '@aws-amplify/ui-react';
import IndexPage from "./views/IndexPage";
import Layout from "./layouts/Layout";
import CpvListPage from "./views/CpvListPage";
import TenderDetailPage from "./views/TenderDetailPage";
import LoginPage from "./views/LoginPage";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthenticator((context) => [context.user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <IndexPage />
                </ProtectedRoute>
              }
              index
            />
            <Route
              path="/cpv-list"
              element={
                <ProtectedRoute>
                  <CpvListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tender/:id"
              element={
                <ProtectedRoute>
                  <TenderDetailPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;