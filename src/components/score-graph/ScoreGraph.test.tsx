import { render, screen } from "@testing-library/react";
import ScoreGraph from "./ScoreGraph";

describe("ScoreGraph", () => {
  it("muestra 5 barras por defecto", () => {
    render(<ScoreGraph score={0.6} />);
    const bars = screen.getAllByRole("presentation");
    expect(bars).toHaveLength(5);
  });

  it("muestra el valor normalizado con dos decimales", () => {
    render(<ScoreGraph score={0.6789} />);
    expect(screen.getByText(/3.39\/5/)).toBeInTheDocument();
  });

  it("todas las barras llenas si score es 1", () => {
    render(<ScoreGraph score={1} />);
    const bars = screen.getAllByRole("presentation");
    bars.forEach(bar => {
      expect(bar).toHaveClass("bg-green-500");
    });
    expect(screen.getByText("5/5")).toBeInTheDocument();
  });

  it("todas las barras vacías si score es 0", () => {
    render(<ScoreGraph score={0} />);
    const bars = screen.getAllByRole("presentation");
    bars.forEach(bar => {
      expect(bar).toHaveClass("bg-gray-300");
    });
    expect(screen.getByText("0/5")).toBeInTheDocument();
  });

  it("muestra el número de barras indicado por max", () => {
    render(<ScoreGraph score={0.5} max={3} />);
    const bars = screen.getAllByRole("presentation");
    expect(bars).toHaveLength(3);
    expect(screen.getByText(/1.5\/3/)).toBeInTheDocument();
  });
});