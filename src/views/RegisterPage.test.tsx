import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RegisterPage from "./RegisterPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);
const store = mockStore({
  cpv: { cpvs: {} },
  company: { name: "", location: "", budget: 0, cpvs: [] }
});

describe("RegisterPage", () => {
  it("renders the register form", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/registro de empresa/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /registrar empresa/i })).toBeInTheDocument();
  });
});