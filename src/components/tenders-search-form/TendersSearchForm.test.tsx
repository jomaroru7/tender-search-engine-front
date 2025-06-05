import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TendersSearchForm from "./TendersSearchForm";
import * as tendersService from "../../services/tendersService";
import { ToastContainer } from "react-toastify";

const mockStore = configureStore([]);
const initialState = {
  company: {
    budget: 10000,
    location: "Madrid",
    description: "Servicios de limpieza",
  },
  tenders: [],
};

describe("TendersSearchForm", () => {
  it("renderiza los campos y el botón", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TendersSearchForm />
      </Provider>
    );
    expect(screen.getByTestId("input-budget")).toBeInTheDocument();
    expect(screen.getByTestId("input-location")).toBeInTheDocument();
    expect(screen.getByTestId("textarea-description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buscar licitaciones/i })).toBeInTheDocument();
  });

  it("permite escribir en los campos", () => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <TendersSearchForm />
      </Provider>
    );
    const presupuesto = screen.getByTestId("input-budget");
    const localizacion = screen.getByTestId("input-location");
    const descripcion = screen.getByTestId("textarea-description");

    fireEvent.change(presupuesto, { target: { value: "20000" } });
    fireEvent.change(localizacion, { target: { value: "Barcelona" } });
    fireEvent.change(descripcion, { target: { value: "Obras públicas" } });

    expect(presupuesto).toHaveValue(20000);
    expect(localizacion).toHaveValue("Barcelona");
    expect(descripcion).toHaveValue("Obras públicas");
  });

  it("muestra el spinner al buscar y llama a getTendersCardsData", async () => {
    const store = mockStore(initialState);
    const mockTenders = [{ id: "1", tenderName: "Test", budget: 1000, location: "Madrid", resume: "Resumen", CPVCodes: ["123"], endDate: "2025-01-01", score: 0.33 }];
    const getTendersCardsDataSpy = vi.spyOn(tendersService, "getTendersCardsData").mockResolvedValue(mockTenders);

    render(
      <Provider store={store}>
        <TendersSearchForm />
        <ToastContainer />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /buscar licitaciones/i }));

    expect(screen.getByText(/estamos ejecutando la búsqueda/i)).toBeInTheDocument();
    await waitFor(() => expect(getTendersCardsDataSpy).toHaveBeenCalled());
    await waitFor(() => expect(screen.queryByText(/estamos ejecutando la búsqueda/i)).not.toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/licitaciones actualizadas/i)).toBeInTheDocument());
  });

  it("muestra un toast de error si la búsqueda falla", async () => {
    const store = mockStore(initialState);
    vi.spyOn(tendersService, "getTendersCardsData").mockRejectedValue(new Error("fail"));

    render(
      <Provider store={store}>
        <TendersSearchForm />
        <ToastContainer />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /buscar licitaciones/i }));

    await waitFor(() => expect(screen.getByText(/no se pudieron obtener las licitaciones/i)).toBeInTheDocument());
  });
});