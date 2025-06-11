import type { Meta, StoryObj } from "@storybook/react";
import SpinnerOverlay from "./SpinnerOverlay";

const meta: Meta<typeof SpinnerOverlay> = {
  title: "Components/SpinnerOverlay",
  component: SpinnerOverlay,
};

export default meta;

type Story = StoryObj<typeof SpinnerOverlay>;

export const Default: Story = {
  args: {
    message: "Cargando, por favor espere...",
  },
};

export const CustomMessage: Story = {
  args: {
    message: "Estamos ejecutando la búsqueda de licitaciones con sus especificaciones. Esto puede llevar algunos minutos.",
  },
};