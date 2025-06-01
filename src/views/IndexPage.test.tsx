import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import IndexPage from "./IndexPage";

const mockStore = configureStore([]);
const mockCpvs = {
  "42933000": "Maquinaria para la industria nuclear"
};

describe("IndexPage", () => {
  it("renders the CardsGrid component", () => {
    const store = mockStore({
      cpv: { cpvs: mockCpvs },
      tender: { tenders: [] },
      company: { name: "", location: "", budget: 0, cpvs: [] },
    });
    render(
      <Provider store={store}>
        <IndexPage />
      </Provider>
    );
    expect(screen.getByTestId("cards-grid")).toBeInTheDocument();
  });
});