import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TendersSearchForm from "./TendersSearchForm";

const mockStore = configureStore([]);
const initialState = {
  company: {
    budget: "10000",
    location: "Madrid",
    description: "Servicios de limpieza",
  },
  cpv: {
    cpvs: {
      "12345678": "Servicios de limpieza",
      "87654321": "Obras públicas",
    },
  },
  tenders: [],
};

describe("TendersSearchForm", () => {
  it("renderiza los campos y el botón", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TendersSearchForm onSearch={vi.fn()} />
      </Provider>
    );
    expect(screen.getByTestId("input-budget")).toBeInTheDocument();
    expect(screen.getByTestId("input-location")).toBeInTheDocument();
    expect(screen.getByTestId("textarea-description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buscar licitaciones/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Buscar CPV por código/i)).toBeInTheDocument();
  });

  it("permite escribir en los campos", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TendersSearchForm onSearch={vi.fn()} />
      </Provider>
    );
    const presupuesto = screen.getByTestId("input-budget");
    const localizacion = screen.getByTestId("input-location");
    const descripcion = screen.getByTestId("textarea-description");

    fireEvent.change(presupuesto, { target: { value: "20000" } });
    fireEvent.change(localizacion, { target: { value: "Barcelona" } });
    fireEvent.change(descripcion, { target: { value: "Obras públicas" } });

    expect(presupuesto).toHaveValue("20.000");
    expect(localizacion).toHaveValue("Barcelona");
    expect(descripcion).toHaveValue("Obras públicas");
  });
});