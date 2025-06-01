import CardsGrid from "../components/cards-grid/CardsGrid";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

function IndexPage() {
  const cardData = useSelector((state: RootState) => state.tender.tenders);

  return (
    <CardsGrid cardData={cardData} />
  );
}

export default IndexPage;