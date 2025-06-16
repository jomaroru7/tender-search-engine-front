import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import RegisterPage from "./views/RegisterPage";
import YourCompanyPage from "./views/YourCompanyPage";
import Layout from "./layouts/Layout";
import CpvListPage from "./views/CpvListPage";
import CompanyGuard from "./components/company-guard/CompanyGuard";
import TenderDetailPage from "./views/TenderDetailPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <CompanyGuard>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<IndexPage />} index />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/your-company" element={<YourCompanyPage />} />
            <Route path="/cpv-list" element={<CpvListPage />} />
            <Route path="/tender/:id" element={<TenderDetailPage />} />
          </Route>
        </Routes>
      </CompanyGuard>
    </BrowserRouter>
  );
}

export default AppRouter;