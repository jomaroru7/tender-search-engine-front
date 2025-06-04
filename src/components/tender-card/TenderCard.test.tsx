import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TenderCard from "./TenderCard";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);
const mockCpvs = {
  "42933000": "Maquinaria para la industria nuclear",
  "15894500": "Café",
  "55000000": "Servicios de hostelería y restauración"
};

describe("TenderCard", () => {
  const mockTender = {
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
    score: 3.14
  };

  it("renders the card with its data", () => {
    const store = mockStore({
      cpv: { cpvs: mockCpvs }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TenderCard
            id={mockTender.id}
            tenderName={mockTender.tenderName}
            endDate={mockTender.endDate}
            budget={mockTender.budget}
            resume={mockTender.resume}
            location={mockTender.location}
            CPVCodes={mockTender.CPVCodes}
            score={mockTender.score}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('tender-name').textContent).toBe(mockTender.tenderName);
    expect(screen.getByTestId('tender-budget').textContent).toContain("22,000");
    expect(screen.getByTestId('tender-budget').textContent).toContain("€");
    expect(screen.getByTestId('tender-location').textContent).toContain(mockTender.location);
    expect(screen.getByTestId('tender-resume').textContent).toBe(mockTender.resume);
    expect(screen.getByTestId('tender-cpv-codes').textContent).toContain(mockTender.CPVCodes[0]);
    expect(screen.getByTestId('tender-end-date').textContent).toContain(mockTender.endDate);
    expect(screen.getByTestId('tender-score')).toBeInTheDocument();

  });
});