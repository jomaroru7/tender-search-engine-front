import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';

const mockStore = configureStore([]);
const store = mockStore({
  cpv: { cpvs: {} },
  company: { name: "", location: "", budget: 0, cpvs: [] }
});

describe("LoginPage", () => {
  it("renders the login page with Authenticator", () => {
    render(
      <Authenticator.Provider>
        <Provider store={store}>
          <MemoryRouter>
            <LoginPage />
          </MemoryRouter>
        </Provider>
      </Authenticator.Provider>
    );
    expect(screen.getByText(/bienvenido a licico/i)).toBeInTheDocument();
    expect(screen.getByText(/inicia sesión o crea una cuenta para continuar/i)).toBeInTheDocument();
  });
});