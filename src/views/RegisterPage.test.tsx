import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RegisterPage from "./RegisterPage";

describe("RegisterPage", () => {
  it("renders RegisterPage text", () => {
    render(<RegisterPage />);
    expect(screen.getByText(/registerpage/i)).toBeInTheDocument();
  });
});