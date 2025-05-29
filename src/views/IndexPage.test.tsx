import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import IndexPage from "./IndexPage";

describe("IndexPage", () => {
  it("renders IndexPage text", () => {
    render(<IndexPage />);
    expect(screen.getByText(/indexpage/i)).toBeInTheDocument();
  });
});