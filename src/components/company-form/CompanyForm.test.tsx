import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CompanyForm from "./CompanyForm";

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
  it("renders all fields and the submit button", () => {
    renderWithStore();
    expect(screen.getByText("Test Form")).toBeInTheDocument();
    expect(screen.getByTestId("input-name")).toBeInTheDocument();
    expect(screen.getByTestId("input-location")).toBeInTheDocument();
    expect(screen.getByTestId("input-budget")).toBeInTheDocument();
    expect(screen.getByTestId("textarea-description")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  it("calls onSubmit with form data", () => {
    const onSubmit = vi.fn();
    renderWithStore({ onSubmit });

    fireEvent.change(screen.getByTestId("input-name"), { target: { value: "Mi Empresa" } });
    fireEvent.change(screen.getByTestId("input-location"), { target: { value: "Madrid" } });
    fireEvent.change(screen.getByTestId("input-budget"), { target: { value: "10000" } });
    fireEvent.change(screen.getByTestId("textarea-description"), { target: { value: "Venta de alfombras" } });

    fireEvent.click(screen.getByText("Enviar"));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Mi Empresa",
      location: "Madrid",
      budget: 10000,
      description: "Venta de alfombras",
    });
  });
});