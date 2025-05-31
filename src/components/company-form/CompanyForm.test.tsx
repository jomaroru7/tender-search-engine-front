import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CompanyForm from "./CompanyForm";

const mockStore = configureStore([]);
const mockCpvs = {
  "12345678": "Servicios de limpieza",
  "87654321": "Servicios de consultoría",
};

function renderWithStore(props = {}) {
  const store = mockStore({
    cpv: { cpvs: mockCpvs }
  });
  return render(
    <Provider store={store}>
      <CompanyForm
        title="Test Form"
        submitLabel="Enviar"
        onSubmit={vi.fn()}
        {...props}
      />
    </Provider>
  );
}

describe("CompanyForm", () => {
  it("renders all fields and the submit button", () => {
    renderWithStore();
    expect(screen.getByText("Test Form")).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre de la empresa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/localización/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/presupuesto/i)).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  it("shows filtered CPVs when searching", () => {
    renderWithStore();
    const cpvInput = screen.getByPlaceholderText(/buscar cpv/i);
    fireEvent.change(cpvInput, { target: { value: "limpieza" } });
    expect(screen.getByText(/servicios de limpieza/i)).toBeInTheDocument();
    expect(screen.queryByText(/servicios de consultoría/i)).not.toBeInTheDocument();
  });

  it("allows selecting and removing CPVs", () => {
    renderWithStore();
    const cpvInput = screen.getByPlaceholderText(/buscar cpv/i);
    fireEvent.change(cpvInput, { target: { value: "limpieza" } });
    fireEvent.click(screen.getByText(/servicios de limpieza/i));
    expect(screen.getByText("12345678")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText(/quitar 12345678/i));
    expect(screen.queryByText("12345678")).not.toBeInTheDocument();
  });

  it("calls onSubmit with form data", () => {
    const onSubmit = vi.fn();
    renderWithStore({ onSubmit });

    fireEvent.change(screen.getByLabelText(/nombre de la empresa/i), { target: { value: "Mi Empresa" } });
    fireEvent.change(screen.getByLabelText(/localización/i), { target: { value: "Madrid" } });
    fireEvent.change(screen.getByLabelText(/presupuesto/i), { target: { value: "10000" } });

    const cpvInput = screen.getByPlaceholderText(/buscar cpv/i);
    fireEvent.change(cpvInput, { target: { value: "limpieza" } });
    fireEvent.click(screen.getByText(/servicios de limpieza/i));

    fireEvent.click(screen.getByText("Enviar"));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Mi Empresa",
      location: "Madrid",
      budget: 10000,
      cpvs: ["12345678"],
    });
  });
});