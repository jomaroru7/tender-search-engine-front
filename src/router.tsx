
import { BrowserRouter, Route, Routes } from "react-router-dom"
import IndexPage from "./views/IndexPage"
import RegisterPage from "./views/RegisterPage"
import YourCompanyPage from "./views/YourCompanyPage"
import Layout from "./layouts/Layout"

function AppRouter() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/your-company" element={<YourCompanyPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
