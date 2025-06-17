import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Layout", () => {
  it("renders the Header and children content", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });
});