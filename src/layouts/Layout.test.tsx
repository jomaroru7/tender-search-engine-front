import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';
import Layout from "./Layout";

describe("Layout", () => {
  it("renders the Header and children content", () => {
    render(
      <MemoryRouter>
        <Authenticator.Provider>
          <Layout>
            <div>Test Content</div>
          </Layout>
        </Authenticator.Provider>
      </MemoryRouter>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });
});