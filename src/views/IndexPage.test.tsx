import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import IndexPage from "./IndexPage";

describe("IndexPage", () => {
  it("renders the CardsGrid component", () => {
    render(<IndexPage />);
    expect(screen.getByTestId("cards-grid")).toBeInTheDocument();
  });
});