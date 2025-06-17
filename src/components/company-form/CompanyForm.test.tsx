import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CompanyForm from "./CompanyForm";

// Mock setUser para evitar llamadas reales
vi.mock("../../services/users/usersService", () => ({
  setUser: vi.fn().mockResolvedValue(undefined),
}));

function renderForm(props = {}) {
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

  it("renderiza todos los campos y el botón", () => {
    renderForm();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-location")).toBeInTheDocument();
    expect(screen.getByTestId("input-budget")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("checkbox-allowRegister")).toBeInTheDocument();
    expect(screen.getByTestId("textarea-description")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  it("muestra error si el email es inválido", async () => {
    renderForm();

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Empresa" } });
    fireEvent.change(screen.getByTestId("input-location"), { target: { value: "Madrid" } });
    fireEvent.change(screen.getByTestId("input-budget"), { target: { value: "10000" } });
    fireEvent.change(screen.getByTestId("textarea-description"), { target: { value: "Descripción" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "no-es-email" } });
    fireEvent.click(screen.getByTestId("checkbox-allowRegister"));
    fireEvent.click(screen.getByText("Enviar"));

    expect(
      await screen.findByText((content) =>
        /Introduce un email válido/i.test(content)
      )
    ).toBeInTheDocument();
  });

  it("muestra error si el checkbox no está marcado", async () => {
    renderForm();
    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Empresa" } });
    fireEvent.change(screen.getByTestId("input-location"), { target: { value: "Madrid" } });
    fireEvent.change(screen.getByTestId("input-budget"), { target: { value: "10000" } });
    fireEvent.change(screen.getByTestId("textarea-description"), { target: { value: "Descripción" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "test@email.com" } });
    const checkbox = screen.getByTestId("checkbox-allowRegister") as HTMLInputElement;
    if (checkbox.checked) {
      fireEvent.click(checkbox);
    }
    fireEvent.click(screen.getByText("Enviar"));

    expect(
      await screen.findByText((content) =>
        content.includes("Debes permitir el registro del email")
      )
    ).toBeInTheDocument();
  });

  it("llama a setUser y onSubmit con los datos correctos", async () => {
    const onSubmit = vi.fn();
    const { setUser } = await import("../../services/users/usersService");

    renderForm({ onSubmit });

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Empresa" } });
    fireEvent.change(screen.getByTestId("input-location"), { target: { value: "Madrid" } });
    fireEvent.change(screen.getByTestId("input-budget"), { target: { value: "10000" } });
    fireEvent.change(screen.getByTestId("input-email"), { target: { value: "test@email.com" } });
    fireEvent.change(screen.getByTestId("textarea-description"), { target: { value: "Descripción" } });
    fireEvent.click(screen.getByTestId("checkbox-allowRegister"));

    fireEvent.click(screen.getByText("Enviar"));

    await waitFor(() => {
      expect(setUser).toHaveBeenCalledWith({ email: "test@email.com" });
      expect(onSubmit).toHaveBeenCalledWith({
        email: "test@email.com",
        name: "Empresa",
        location: "Madrid",
        budget: 10000,
        description: "Descripción",
        allowRegister: true,
      });
    });
  });

  it("el checkbox refleja el valor inicial", () => {
    renderForm({ initialAllowRegister: true });
    expect(screen.getByTestId("checkbox-allowRegister")).toBeChecked();
  });
});