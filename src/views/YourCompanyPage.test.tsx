import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CompanyGuard from "../components/company-guard/CompanyGuard";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Routes, Route } from "react-router-dom";

const mockStore = configureStore([]);

function renderWithRouterAndStore(storeState: any, initialEntries: string[]) {
  const store = mockStore(storeState);
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route
            path="*"
            element={
              <CompanyGuard>
                <div>Contenido protegido</div>
              </CompanyGuard>
            }
          />
          <Route path="/register" element={<div>Página de registro</div>} />
          <Route path="/your-company" element={<div>Editar datos de empresa</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
}

describe("CompanyGuard", () => {
  it("redirige a /register si no hay empresa y accede a /", () => {
    renderWithRouterAndStore(
      { company: { name: "", location: "", budget: 0, cpvs: [] } },
      ["/"]
    );
    expect(screen.getByText(/página de registro/i)).toBeInTheDocument();
  });

  it("permite acceder a /register si no hay empresa", () => {
    renderWithRouterAndStore(
      { company: { name: "", location: "", budget: 0, cpvs: [] } },
      ["/register"]
    );
    expect(screen.getByText(/página de registro/i)).toBeInTheDocument();
  });

});