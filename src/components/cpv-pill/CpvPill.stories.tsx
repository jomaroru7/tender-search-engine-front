import type { Meta, StoryObj } from "@storybook/react";
import CpvPill from "./CpvPill";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const mockCpvs = {
  "12345678": "Servicios de limpieza",
  "87654321": "Obras de construcción",
};

const store = configureStore({
  reducer: {
    cpv: (state = { cpvs: mockCpvs }) => state,
  },
});

const meta: Meta<typeof CpvPill> = {
  title: "Components/CpvPill",
  component: CpvPill,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CpvPill>;

export const Default: Story = {
  args: {
    cpvCode: "12345678",
  },
};

export const WithDescription: Story = {
  args: {
    cpvCode: "87654321",
  },
};

export const WithoutDescription: Story = {
  args: {
    cpvCode: "00000000",
  },
};