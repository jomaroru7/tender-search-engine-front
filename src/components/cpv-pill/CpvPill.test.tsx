import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CpvPill from "./CpvPill";

const mockStore = configureStore([]);

function renderWithStore(cpvCode: string, description?: string) {
  const store = mockStore({
    cpv: {
      cpvs: description ? { [cpvCode]: description } : {},
    },
  });
  return render(
    <Provider store={store}>
      <CpvPill cpvCode={cpvCode} />
    </Provider>
  );
}

describe("CpvPill", () => {
  it("renders the cpv code", () => {
    renderWithStore("12345678", "Test Description");
    expect(screen.getByText("12345678")).toBeInTheDocument();
  });

  it("renders the tooltip with description if present", () => {
    renderWithStore("87654321", "Descripción de prueba");
    expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
  });

  it("does not render the tooltip if there is no description", () => {
    renderWithStore("00000000");
    expect(screen.getByText("00000000")).toBeInTheDocument();
    
    const spans = screen.getAllByText("00000000");
    expect(spans.length).toBe(1);

  });
});