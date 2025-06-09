import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("no renderiza nada si solo hay una página", () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza todas las páginas si totalPages <= 5", () => {
    render(<Pagination currentPage={2} totalPages={4} onPageChange={() => {}} />);
    expect(screen.getByTestId("pagination-page-1")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-page-2")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-page-3")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-page-4")).toBeInTheDocument();
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("renderiza puntos suspensivos y páginas relevantes cuando hay muchas páginas", () => {
    render(<Pagination currentPage={8} totalPages={20} onPageChange={() => {}} />);
    expect(screen.getByTestId("pagination-page-1")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-page-7")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-page-8")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-page-9")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-page-20")).toBeInTheDocument();
    expect(screen.getAllByText("…").length).toBe(2);
  });

  it("el botón anterior está deshabilitado en la primera página", () => {
    render(<Pagination currentPage={1} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Anterior" })).toBeDisabled();
  });

  it("el botón siguiente está deshabilitado en la última página", () => {
    render(<Pagination currentPage={10} totalPages={10} onPageChange={() => {}} />);
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeDisabled();
  });

  it("llama a onPageChange con la página correcta al hacer click", () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByTestId("pagination-page-2"));
    expect(onPageChange).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(onPageChange).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByRole("button", { name: "Anterior" }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});