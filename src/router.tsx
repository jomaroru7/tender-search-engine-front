import { BrowserRouter, Route, Routes } from "react-router-dom";
import IndexPage from "./views/IndexPage";
import YourCompanyPage from "./views/YourCompanyPage";
import Layout from "./layouts/Layout";
import CpvListPage from "./views/CpvListPage";
import TenderDetailPage from "./views/TenderDetailPage";
import LoginPage from "./views/LoginPage";

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<IndexPage />} index />
            <Route path="/your-company" element={<YourCompanyPage />} />
            <Route path="/cpv-list" element={<CpvListPage />} />
            <Route path="/tender/:id" element={<TenderDetailPage />} />
            <Route path="/login/" element={<LoginPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;