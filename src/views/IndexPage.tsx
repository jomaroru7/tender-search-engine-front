import CardsGrid from "../components/cards-grid/CardsGrid";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import TendersSearchForm from "../components/tenders-search-form/TendersSearchForm";

function IndexPage() {
  const cardData = useSelector((state: RootState) => state.tender.tenders);

  return (
    <>
      <TendersSearchForm />
      <CardsGrid cardData={cardData} />
    </>
  );
}

export default IndexPage;