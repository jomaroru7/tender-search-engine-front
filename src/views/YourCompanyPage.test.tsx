import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import YourCompanyPage from "./YourCompanyPage";

describe("YourCompanyPage", () => {
  it("renders YourCompanyPage text", () => {
    render(<YourCompanyPage />);
    expect(screen.getByText(/yourcompanypage/i)).toBeInTheDocument();
  });
});