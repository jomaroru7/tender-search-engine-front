import type { Meta, StoryObj } from "@storybook/react";
import TenderCard from "./TenderCard";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Mock de estado para cpv (usado por CpvPill)
const mockCpvs = {
  "12345678": "Servicios de limpieza",
  "87654321": "Obras de construcción",
};

const store = configureStore({
  reducer: {
    cpv: (state = { cpvs: mockCpvs }) => state,
  },
});

const meta: Meta<typeof TenderCard> = {
  title: "Components/TenderCard",
  component: TenderCard,
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

type Story = StoryObj<typeof TenderCard>;

export const Default: Story = {
  args: {
    id: "1",
    tenderName: "Licitación de limpieza de edificios",
    endDate: "2025-09-07 14:00:00",
    budget: 12000,
    resume: "Servicio de limpieza de edificios públicos y oficinas municipales.",
    location: "Madrid",
    CPVCodes: ["12345678", "87654321"],
    score: 0.8,
  },
};

export const SinCPVs: Story = {
  args: {
    id: "2",
    tenderName: "Mantenimiento de jardines",
    endDate: "2025-10-15 12:00:00",
    budget: 8000,
    resume: "Mantenimiento y cuidado de zonas verdes municipales.",
    location: "Barcelona",
    CPVCodes: [],
    score: 0.6,
  },
};