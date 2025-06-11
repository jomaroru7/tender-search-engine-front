import { render, screen } from "@testing-library/react";
import SpinnerOverlay from "./SpinnerOverlay";

describe("SpinnerOverlay", () => {
  it("renderiza el spinner", () => {
    render(<SpinnerOverlay />);
    expect(
      document.querySelector(".animate-spin.rounded-full.h-16.w-16")
    ).toBeInTheDocument();
  });

  it("muestra el mensaje si se pasa como prop", () => {
    render(<SpinnerOverlay message="Cargando datos..." />);
    expect(screen.getByText("Cargando datos...")).toBeInTheDocument();
  });

  it("no muestra mensaje si no se pasa prop", () => {
    render(<SpinnerOverlay />);
    expect(screen.queryByText(/.+/)).not.toBeInTheDocument();
  });
});