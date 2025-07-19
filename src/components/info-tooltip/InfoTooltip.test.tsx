import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InfoTooltip from "./InfoTooltip";

describe("InfoTooltip", () => {
  it("renders info icon button", () => {
    render(<InfoTooltip text="Texto de ayuda" />);
    expect(screen.getByRole("button", { name: /información/i })).toBeInTheDocument();
  });

  it("shows tooltip on hover", async () => {
    render(<InfoTooltip text="Texto de ayuda" />);
    const button = screen.getByRole("button", { name: /información/i });
    fireEvent.mouseEnter(button);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Texto de ayuda");
    fireEvent.mouseLeave(button);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("shows tooltip on click (mobile)", async () => {
    render(<InfoTooltip text="Texto de ayuda" />);
    const button = screen.getByRole("button", { name: /información/i });
    fireEvent.click(button);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Texto de ayuda");
    fireEvent.click(button);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("accepts custom className", () => {
    render(<InfoTooltip text="Texto de ayuda" className="test-class" />);
    const wrapper = screen.getByText("i").closest("span");
    expect(wrapper).toHaveClass("test-class", { exact: false });
  });
});