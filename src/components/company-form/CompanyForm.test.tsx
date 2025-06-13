import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CompanyForm from "./CompanyForm";

// Mock setUser para evitar llamadas reales
vi.mock("../../services/users/usersService", () => ({
  setUser: vi.fn().mockResolvedValue(undefined),
}));

function renderWithStore(props = {}) {
  return render(
    <CompanyForm
      title="Test Form"
      submitLabel="Enviar"
      onSubmit={vi.fn()}
      {...props}
    />
  );
}

describe("CompanyForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all fields and the submit button", () => {
    renderWithStore();
    expect(screen.getByText("Test Form")).toBeInTheDocument();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-location")).toBeInTheDocument();
    expect(screen.getByTestId("input-budget")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("textarea-description")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  it("calls onSubmit with form data when all fields are valid and checkbox is checked", async () => {
    const onSubmit = vi.fn();
    renderWithStore({ onSubmit });

    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "prueba@email.com" } });
    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Mi Empresa" } });
    fireEvent.change(screen.getByTestId("input-location"), { target: { value: "Madrid" } });
    fireEvent.change(screen.getByTestId("input-budget"), { target: { value: "10000" } });
    fireEvent.change(screen.getByTestId("textarea-description"), { target: { value: "Venta de alfombras" } });

    fireEvent.click(screen.getByLabelText(/Permite el registro de su email/i));

    fireEvent.click(screen.getByText("Enviar"));

    await screen.findByText("Enviar");

    expect(onSubmit).toHaveBeenCalledWith({
      email: "prueba@email.com",
      name: "Mi Empresa",
      location: "Madrid",
      budget: 10000,
      description: "Venta de alfombras",
    });
  });
});