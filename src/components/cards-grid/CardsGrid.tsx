'use client';

import { useEffect, useState } from "react"
import type { CardData } from "../../models/TendersFront"
import TenderCard from "../tender-card/TenderCard"

type CardsGridProps = {
  cardData: CardData[]
}

const CardsGrid = ({cardData}: CardsGridProps) => {

  const [cards, setCards] = useState<CardData[]>([])

  useEffect(() => {
    setCards(cardData)
  }, [cardData])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" data-testid="cards-grid">
      {cards.map(({id, tenderName, budget, location, resume, CPVCodes, endDate, score, scoreBreakdown }, index) => (
        <TenderCard 
          key={index} 
          id={id} 
          tenderName={tenderName} 
          endDate={endDate} 
          budget={budget} 
          resume={resume} 
          location={location} 
          CPVCodes={CPVCodes} 
          score={score}
          scoreBreakdown={scoreBreakdown}
        />
      ))}
    </div>
  )
}

export default CardsGrid