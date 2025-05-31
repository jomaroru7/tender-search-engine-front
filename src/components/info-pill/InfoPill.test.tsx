import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoPill from "./InfoPill";

const DummyIcon = () => <svg data-testid="dummy-icon"></svg>;

describe("InfoPill", () => {
  it("renders the text, icon, and default styles", () => {
    render(<InfoPill text="Test Pill" icon={<DummyIcon />} dataTestId="pill" />);
    const pill = screen.getByTestId("pill");
    expect(pill).toBeInTheDocument();
    expect(pill).toHaveTextContent("Test Pill");
    expect(screen.getByTestId("dummy-icon")).toBeInTheDocument();
    expect(pill.className).toContain("bg-slate-200");
    expect(pill.className).toContain("text-slate-700");
  });

  it("applies custom background and text color", () => {
    render(
      <InfoPill
        text="Colored Pill"
        icon={<DummyIcon />}
        dataTestId="colored-pill"
        backgroundColor="bg-red-500"
        textColor="text-white"
      />
    );
    const pill = screen.getByTestId("colored-pill");
    expect(pill.className).toContain("bg-red-500");
    expect(pill.className).toContain("text-white");
  });
});