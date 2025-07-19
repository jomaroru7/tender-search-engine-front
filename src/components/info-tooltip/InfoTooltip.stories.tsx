import type { Meta, StoryObj } from "@storybook/react";
import InfoTooltip from "./InfoTooltip";

const meta: Meta<typeof InfoTooltip> = {
  title: "Components/InfoTooltip",
  component: InfoTooltip,
};

export default meta;

type Story = StoryObj<typeof InfoTooltip>;

export const Default: Story = {
  args: {
    text: "Indique el importe más alto facturado en un solo año durante los últimos tres ejercicios.",
  },
};

export const CustomClass: Story = {
  args: {
    text: "Este tooltip tiene una clase personalizada.",
    className: "text-blue-600",
    },
};