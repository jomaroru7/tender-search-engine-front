import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CardsGrid from "./CardsGrid";

const mockStore = configureStore([]);
const mockCpvs = {
  "42933000": "Maquinaria para la industria nuclear"
};

describe("CardsGrid", () => {
  it("renders at least one TenderCard child", () => {
    const store = mockStore({
      cpv: { cpvs: mockCpvs }
    });
    render(
      <Provider store={store}>
        <CardsGrid />
      </Provider>
    );
    const tenderCards = screen.queryAllByTestId("tender-card");
    expect(tenderCards.length).toBeGreaterThan(0);
  });
});