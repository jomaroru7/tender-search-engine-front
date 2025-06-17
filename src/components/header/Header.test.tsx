import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

function renderHeader(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );
}

describe("Header", () => {
  it("muestra el título Licico", () => {
    renderHeader();
    expect(screen.getByText("Licico")).toBeInTheDocument();
  });

  it("oculta el menú en la ruta /register", () => {
    renderHeader("/register");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("muestra el menú en otras rutas", () => {
    renderHeader("/");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("resalta el enlace activo", () => {
    renderHeader("/your-company");
    const activeLink = screen.getByText(/tu empresa/i);
    expect(activeLink).toHaveClass("text-orange-500");
  });

  it("abre y cierra el menú móvil al pulsar el botón", () => {
    renderHeader("/");
    const button = screen.getByLabelText(/toggle navigation/i);
    // Menú cerrado por defecto en móvil
    expect(screen.getByRole("navigation")).toHaveClass("opacity-0");
    fireEvent.click(button);
    expect(screen.getByRole("navigation")).toHaveClass("opacity-100");
    fireEvent.click(button);
    expect(screen.getByRole("navigation")).toHaveClass("opacity-0");
  });
});