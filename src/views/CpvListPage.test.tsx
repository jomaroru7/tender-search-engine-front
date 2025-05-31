import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CpvListPage from "./CpvListPage";

// eslint-disable-next-line deprecation/deprecation
const mockStore = configureStore([]);

const mockCpvs = {
  "03000000": "Productos de la agricultura, ganadería, pesca, silvicultura y productos afines",
  "03100000": "Productos de la agricultura y horticultura",
  "03110000": "Cultivos, productos comerciales de jardinería y horticultura",
  "03111000": "Semillas",
  "03111100": "Soja",
  "03111200": "Cacahuetes",
  "03111300": "Semillas de girasol",
};

function renderWithStore(cpvs = mockCpvs) {
  const store = mockStore({
    cpv: { cpvs }
  });
  return render(
    <Provider store={store}>
      <CpvListPage />
    </Provider>
  );
}

describe("CpvListPage", () => {
  it("renders the input and all cpv entries by default", () => {
    renderWithStore();
    expect(screen.getByPlaceholderText(/búsqueda por código o descripción/i)).toBeInTheDocument();
    // Should render all mock cpvs
    Object.entries(mockCpvs).forEach(([code, label]) => {
      expect(screen.getByText(code)).toBeInTheDocument();
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("filters by code in real time (debounced)", async () => {
    renderWithStore();
    const input = screen.getByPlaceholderText(/búsqueda por código o descripción/i);
    fireEvent.change(input, { target: { value: "03111" } });

    await waitFor(() => {
      expect(screen.getByText("03111100")).toBeInTheDocument();
      expect(screen.getByText("Soja")).toBeInTheDocument();
      expect(screen.queryByText("03000000")).not.toBeInTheDocument();
    });
  });

  it("filters by label in real time (debounced, insensitive to accents and case)", async () => {
    renderWithStore();
    const input = screen.getByPlaceholderText(/búsqueda por código o descripción/i);
    fireEvent.change(input, { target: { value: "cacahuetes" } });

    await waitFor(() => {
      expect(screen.getByText("03111200")).toBeInTheDocument();
      expect(screen.getByText("Cacahuetes")).toBeInTheDocument();
      expect(screen.queryByText("03111100")).not.toBeInTheDocument();
    });
  });

  it("shows 'No results found.' when nothing matches", async () => {
    renderWithStore();
    const input = screen.getByPlaceholderText(/búsqueda por código o descripción/i);
    fireEvent.change(input, { target: { value: "zzzzzz" } });

    await waitFor(() => {
      expect(screen.getByText(/no se han encontrado resultados/i)).toBeInTheDocument();
    });
  });
});