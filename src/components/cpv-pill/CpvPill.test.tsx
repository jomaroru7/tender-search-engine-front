import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

  it("renders the tooltip with description if present (on hover/focus)", async () => {
    renderWithStore("87654321", "Descripción de prueba");

    const pill = screen.getByTestId("cpv-pill-87654321");
    // simulate hover (mouse enter) which should trigger tooltip rendering via portal
    fireEvent.mouseEnter(pill);

    // wait for the tooltip to appear in the DOM (portal)
    await waitFor(() => {
      expect(screen.getByText("Descripción de prueba")).toBeInTheDocument();
    });

    // optionally hide it again
    fireEvent.mouseLeave(pill);
  });

  it("does not render the tooltip if there is no description", () => {
    renderWithStore("00000000");
    const element = screen.getByText("00000000");
    expect(element).toBeInTheDocument();

    const spans = screen.getAllByText("00000000");
    expect(spans.length).toBe(1);
  });
});