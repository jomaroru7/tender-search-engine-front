import CardsGrid from "../components/cards-grid/CardsGrid"
import type { CardData } from "../types"

function IndexPage() {
  const mockTender: CardData[] = [
    {
      tenderName: "La presente licitación tiene por objeto la contratación del Suministro de Dispensadores de Agua, Café y Máquinas Expendedoras para Equipos Nucleares, S.A., S.M.E. (ENSA)",
      budget: 22000.0,
      location: "Cantabria",
      resume: "La presente licitación tiene por objeto la contratación del Suministro de Dispensadores de Agua, Café y Máquinas Expendedoras para Equipos Nucleares, S.A., S.M.E. (ENSA)",
      CPVCodes: [
        "42933000",
        "15894500",
        "55000000"
      ],
      endDate: "2025-05-07 12:37:00"
    }, {
      tenderName: "La presente licitación tiene por objeto la contratación del Suministro de Dispensadores de Agua, Café y Máquinas Expendedoras para Equipos Nucleares, S.A., S.M.E. (ENSA)",
      budget: 22000.0,
      location: "Cantabria",
      resume: "La presente licitación tiene por objeto la contratación del Suministro de Dispensadores de Agua, Café y Máquinas Expendedoras para Equipos Nucleares, S.A., S.M.E. (ENSA)",
      CPVCodes: [
        "42933000",
        "15894500",
        "55000000"
      ],
      endDate: "2025-05-07 12:37:00"
    }
  ]
  return (
    <CardsGrid cardData={mockTender} />
  )
}

export default IndexPage