import type { Meta, StoryObj } from "@storybook/react";
import CpvMultiSelect from "./CpvMultiSelect";
import { Provider } from "react-redux";
import { useState } from "react";
import { configureStore } from "@reduxjs/toolkit";

const mockCpvs = {
  "12345678": "Servicios de limpieza",
  "87654321": "Obras de construcción",
  "11223344": "Suministro de material de oficina",
};

const store = configureStore({
  reducer: {
    cpv: (state = { cpvs: mockCpvs }) => state,
  },
});

const meta: Meta<typeof CpvMultiSelect> = {
  title: "Components/CpvMultiSelect",
  component: CpvMultiSelect,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <Story />
      </Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CpvMultiSelect>;

const Template = (args: any) => {
  const [selectedCpvs, setSelectedCpvs] = useState<string[]>([]);
  return (
    <CpvMultiSelect
      {...args}
      selectedCpvs={selectedCpvs}
      setSelectedCpvs={setSelectedCpvs}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: "CPVs",
    placeholder: "Buscar CPV por código o descripción...",
  },
};