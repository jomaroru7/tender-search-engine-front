import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock useAuthenticator from @aws-amplify/ui-react before importing the component
vi.mock("@aws-amplify/ui-react", () => ({
  useAuthenticator: () => ({ user: null }),
}));

import Header from "./Header";

function renderHeader(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>
  );
}

describe("Header", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("shows the logo", () => {
    renderHeader();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("hides the menu on the /register route", () => {
    renderHeader("/register");
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("shows the menu on other routes", () => {
    renderHeader("/");
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("highlights the active link (cpv list) when route matches", () => {
    renderHeader("/cpv-list");
    const activeLink = screen.getByText(/lista de cpvs/i);
    expect(activeLink).toHaveClass("text-orange-500");
  });

  it("toggles the mobile menu when clicking the button", () => {
    renderHeader("/");
    const button = screen.getByLabelText(/toggle navigation/i);
    const nav = screen.getByRole("navigation");

    // initial state: hidden on mobile (class includes opacity-0)
    expect(nav.className).toEqual(expect.stringContaining("opacity-0"));

    // open
    fireEvent.click(button);
    expect(nav.className).toEqual(expect.stringContaining("opacity-100"));

    // close
    fireEvent.click(button);
    expect(nav.className).toEqual(expect.stringContaining("opacity-0"));
  });
});