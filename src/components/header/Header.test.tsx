import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("renders the title correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/buscador de licitaciones/i)).toBeInTheDocument();
  });

  it("renders the 'Buscador' link pointing to '/'", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const buscadorLink = screen.getByRole("link", { name: /buscador/i });
    expect(buscadorLink).toBeInTheDocument();
    expect(buscadorLink).toHaveAttribute("href", "/");
  });

  it("renders the 'Tu empresa' link pointing to '/your-company'", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const empresaLink = screen.getByRole("link", { name: /tu empresa/i });
    expect(empresaLink).toBeInTheDocument();
    expect(empresaLink).toHaveAttribute("href", "/your-company");
  });

  it("renders the 'Lista de Cpvs' link pointing to '/cpv-list'", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const listaCpvsLink = screen.getByRole("link", { name: /lista de cpvs/i });
    expect(listaCpvsLink).toBeInTheDocument();
    expect(listaCpvsLink).toHaveAttribute("href", "/cpv-list");
  });
});