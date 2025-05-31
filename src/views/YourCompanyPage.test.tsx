import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import YourCompanyPage from "./YourCompanyPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({
  cpv: { cpvs: {} },
  company: { name: "Mi Empresa", location: "Madrid", budget: 10000, cpvs: ["12345678"] }
});

describe("YourCompanyPage", () => {
  it("renders the edit company form", () => {
    render(
      <Provider store={store}>
        <YourCompanyPage />
      </Provider>
    );
    expect(screen.getByText(/editar datos de empresa/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /guardar cambios/i })).toBeInTheDocument();
  });
});