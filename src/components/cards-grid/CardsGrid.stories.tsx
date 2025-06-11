import type { Meta, StoryObj } from "@storybook/react";
import CardsGrid from "./CardsGrid";
import type { CardData } from "../../models/TendersFront";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../../store"; // Usa tu store real, así tienes todos los reducers y slices

const meta: Meta<typeof CardsGrid> = {
  title: "Components/CardsGrid",
  component: CardsGrid,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
};

export default meta;

const mockCards: CardData[] = [
  {
    id: "1",
    tenderName: "Licitación de limpieza",
    budget: 12000,
    location: "Madrid",
    resume: "Servicio de limpieza de edificios públicos.",
    CPVCodes: ["90910000"],
    endDate: "2025-09-07 14:00:00",
    score: 0.7,
  },
  {
    id: "2",
    tenderName: "Mantenimiento de jardines",
    budget: 8000,
    location: "Barcelona",
    resume: "Mantenimiento y cuidado de zonas verdes municipales.",
    CPVCodes: ["77310000"],
    endDate: "2025-10-15 12:00:00",
    score: 0.9,
  },
];

type Story = StoryObj<typeof CardsGrid>;

export const Default: Story = {
  args: {
    cardData: mockCards,
  },
};