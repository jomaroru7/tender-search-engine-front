import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CardsGrid from "./CardsGrid";

describe("Cards grid", () => {
    it("renders at least one TenderCard child", () => {
        render(<CardsGrid />);
        const tenderCards = screen.queryAllByTestId("tender-card");
        expect(tenderCards.length).toBeGreaterThan(0);
    });
})