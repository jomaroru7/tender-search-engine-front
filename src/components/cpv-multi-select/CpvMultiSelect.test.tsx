import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CpvMultiSelect from "./CpvMultiSelect";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const mockCpvs = {
  "12345678": "Servicios de limpieza",
  "87654321": "Servicios de consultoría",
};

function renderWithStore(selectedCpvs: string[] = [], setSelectedCpvs = vi.fn()) {
  const store = mockStore({
    cpv: { cpvs: mockCpvs }
  });
  return render(
    <Provider store={store}>
      <CpvMultiSelect
        selectedCpvs={selectedCpvs}
        setSelectedCpvs={setSelectedCpvs}
        label="CPVs"
        placeholder="Buscar CPV"
      />
    </Provider>
  );
}

describe("CpvMultiSelect", () => {
  it("renders input and label", () => {
    renderWithStore();
    expect(screen.getByLabelText("CPVs")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Buscar CPV")).toBeInTheDocument();
  });

  it("shows filtered CPVs when searching", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText("Buscar CPV");
    fireEvent.change(input, { target: { value: "limpieza" } });
    expect(screen.getByText(/servicios de limpieza/i)).toBeInTheDocument();
    expect(screen.queryByText(/servicios de consultoría/i)).not.toBeInTheDocument();
  });

  it("calls setSelectedCpvs when selecting a CPV", () => {
    const setSelectedCpvs = vi.fn();
    renderWithStore([], setSelectedCpvs);
    const input = screen.getByPlaceholderText("Buscar CPV");
    fireEvent.change(input, { target: { value: "limpieza" } });
    fireEvent.click(screen.getByText(/servicios de limpieza/i));
    expect(setSelectedCpvs).toHaveBeenCalledWith(["12345678"]);
  });

  it("shows selected CPVs as chips and allows removing them", () => {
    const setSelectedCpvs = vi.fn();
    renderWithStore(["12345678"], setSelectedCpvs);
    expect(screen.getByText("12345678")).toBeInTheDocument();
    const removeBtn = screen.getByLabelText("Quitar 12345678");
    fireEvent.click(removeBtn);
    expect(setSelectedCpvs).toHaveBeenCalledWith([]);
  });

  it("shows 'No hay resultados' when nothing matches", () => {
    renderWithStore();
    const input = screen.getByPlaceholderText("Buscar CPV");
    fireEvent.change(input, { target: { value: "noexiste" } });
    expect(screen.getByText(/no hay resultados/i)).toBeInTheDocument();
  });
});