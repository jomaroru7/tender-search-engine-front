import type { Meta, StoryObj } from "@storybook/react";
import TendersSearchForm from "./TendersSearchForm";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const mockCompany = {
  budget: 10000,
  location: "Madrid",
  description: "Servicios de limpieza",
};

const store = configureStore({
  reducer: {
    company: (state = mockCompany) => state,
  },
});

const meta: Meta<typeof TendersSearchForm> = {
  title: "Components/TendersSearchForm",
  component: TendersSearchForm,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TendersSearchForm>;

export const Default: Story = {
  args: {
    onSearch: (filters) => {
      alert(`Buscar con filtros:\n${JSON.stringify(filters, null, 2)}`);
    },
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    onSearch: () => {},
    loading: true,
  },
};