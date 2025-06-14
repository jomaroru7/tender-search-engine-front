import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CardsGrid from "./CardsGrid";
import type { CardData } from "../../models/TendersFront";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);
const mockTender: CardData[] = [
  {
    id: "patata",
    tenderName: "La presente licitación tiene por objeto la contratación del Suministro de Dispensadores de Agua, Café y Máquinas Expendedoras para Equipos Nucleares, S.A., S.M.E. (ENSA)",
    budget: 22000.0,
    location: "Cantabria",
    resume: "La presente licitación tiene por objeto la contratación del Suministro de Dispensadores de Agua, Café y Máquinas Expendedoras para Equipos Nucleares, S.A., S.M.E. (ENSA)",
    CPVCodes: [
      "42933000",
      "15894500",
      "55000000"
    ],
    endDate: "2025-05-07 12:37:00",
    score: 1
  }, {
    id: "tomate",
    tenderName: "La presente licitación tiene por objeto la contratación del Suministro de Dispensadores de Agua, Café y Máquinas Expendedoras para Equipos Nucleares, S.A., S.M.E. (ENSA)",
    budget: 22000.0,
    location: "Cantabria",
    resume: "La presente licitación tiene por objeto la contratación del Suministro de Dispensadores de Agua, Café y Máquinas Expendedoras para Equipos Nucleares, S.A., S.M.E. (ENSA)",
    CPVCodes: [
      "42933000",
      "15894500",
      "55000000"
    ],
    endDate: "2025-05-07 12:37:00",
    score: 0.3
  }
]

describe("CardsGrid", () => {
  it("renders at least one TenderCard child", () => {
    const store = mockStore({
      cpv: { cpvs: mockTender }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardsGrid cardData={mockTender} />
        </MemoryRouter>
      </Provider>
    );
    const tenderCards = screen.queryAllByTestId("tender-card");
    expect(tenderCards.length).toBeGreaterThan(0);
  });
});