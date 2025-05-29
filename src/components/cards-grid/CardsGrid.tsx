import { useEffect, useState } from "react"
import type { CardData } from "../../types"
import TenderCard from "../tender-card/TenderCard"

const CardsGrid = () => {
  const mockTender: CardData = {
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

  const [cards, setCards] = useState<CardData[]>([])

  useEffect(() => {
    setCards([mockTender, mockTender])
  }, [])

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4" data-testid="cards-grid">
      {cards.map(({tenderName, budget, location, resume, CPVCodes, endDate }, index) => (
        <TenderCard key={index} tenderName={tenderName} endDate={endDate} budget={budget} resume={resume} location={location} CPVCodes={CPVCodes}  />
      ))}
    </div>
  )
}

export default CardsGrid