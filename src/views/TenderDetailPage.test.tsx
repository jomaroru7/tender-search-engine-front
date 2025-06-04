import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import TenderDetailPage from "./TenderDetailPage";
import * as tendersService from "../services/tendersService";
import React from "react";

// Mock de datos de licitación
const mockTender = {
  id: "123",
  tenderName: "Licitación de prueba",
  publicationDate: "2024-06-01",
  url: "https://contrataciondelestado.es/licitacion/123",
  budgetNoIva: 10000,
  budgetTotal: 12100,
  record: "EXP-2024-001",
  startDate: "2024-06-10",
  contractType: "Servicios",
  procedureType: "Abierto",
  endDate: "2024-07-01",
  lotsNumber: 2,
  warrantyType: ["Definitiva"],
  budget: 12000,
  resume: "Resumen de la licitación.",
  location: "Madrid",
  CPVCodes: ["12345678", "87654321"],
  administrativeDocumexnt: "https://contrataciondelestado.es/doc/adm.pdf",
  specificationsSheet: "https://contrataciondelestado.es/doc/spec.pdf",
};

vi.mock("../services/tendersService", async () => {
  const actual = await vi.importActual<typeof tendersService>("../services/tendersService");
  return {
    ...actual,
    getTenderDetailData: vi.fn(),
  };
});

function renderWithRouter(idParam: string) {
  return render(
    <MemoryRouter initialEntries={[`/tender/${idParam}`]}>
      <Routes>
        <Route path="/tender/:id" element={<TenderDetailPage />} />
        <Route path="/" element={<div>Página principal</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("TenderDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra los datos de la licitación correctamente", async () => {
    (tendersService.getTenderDetailData as any).mockResolvedValueOnce(mockTender);

    renderWithRouter("licitacion-de-prueba-abc123-123");

    expect(screen.getByText(/cargando/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("tender-name")).toBeInTheDocument();
    });

    expect(screen.getByTestId("tender-record")).toHaveTextContent(mockTender.record);
    expect(screen.getByTestId("tender-contract-type")).toHaveTextContent(mockTender.contractType);
    expect(screen.getByTestId("tender-procedure-type")).toHaveTextContent(mockTender.procedureType);
    expect(screen.getByTestId("tender-lots-number")).toHaveTextContent(String(mockTender.lotsNumber));
    expect(screen.getByTestId("tender-cpvs")).toHaveTextContent(mockTender.CPVCodes.join(", "));
    expect(screen.getByTestId("tender-warranty")).toHaveTextContent("Definitiva");
    expect(screen.getByTestId("tender-publication-date")).toHaveTextContent(mockTender.publicationDate);
    expect(screen.getByTestId("tender-budget-no-iva")).toHaveTextContent("10,000");
    expect(screen.getByTestId("tender-budget-total")).toHaveTextContent("12,100");
    expect(screen.getByTestId("tender-budget")).toHaveTextContent("12,000");
    expect(screen.getByTestId("tender-location")).toHaveTextContent(mockTender.location);
    expect(screen.getByTestId("tender-resume")).toHaveTextContent(mockTender.resume);
    expect(screen.getByTestId("tender-url-link")).toHaveAttribute("href", mockTender.url);
    expect(screen.getByTestId("tender-administrative-doc-link")).toHaveAttribute("href", mockTender.administrativeDocumexnt);
    expect(screen.getByTestId("tender-specifications-sheet-link")).toHaveAttribute("href", mockTender.specificationsSheet);
  });

  it("muestra mensaje de no encontrado si no hay licitación", async () => {
    (tendersService.getTenderDetailData as any).mockResolvedValueOnce(null);

    renderWithRouter("licitacion-de-prueba-abc123-123");

    await waitFor(() => {
      expect(screen.getByText(/no se encontró la licitación/i)).toBeInTheDocument();
    });
  });

  it("redirige a la página principal si hay error en la carga", async () => {
    (tendersService.getTenderDetailData as any).mockRejectedValueOnce(new Error("error"));

    renderWithRouter("licitacion-de-prueba-abc123-123");

    await waitFor(() => {
      expect(screen.getByText(/página principal/i)).toBeInTheDocument();
    });
  });

  it("muestra correctamente garantía aunque sea string o esté vacía", async () => {
    (tendersService.getTenderDetailData as any).mockResolvedValueOnce({
      ...mockTender,
      warrantyType: "Especial",
    });

    renderWithRouter("licitacion-de-prueba-abc123-123");

    await waitFor(() => {
      expect(screen.getByText(/especial/i)).toBeInTheDocument();
    });

    (tendersService.getTenderDetailData as any).mockResolvedValueOnce({
      ...mockTender,
      warrantyType: undefined,
    });

    renderWithRouter("licitacion-de-prueba-abc123-123");

    await waitFor(() => {
      expect(screen.getByText(/no disponible/i)).toBeInTheDocument();
    });
  });
});