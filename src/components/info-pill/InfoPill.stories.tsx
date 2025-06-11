import type { Meta, StoryObj } from "@storybook/react";
import InfoPill from "./InfoPill";
import { FaInfoCircle } from "react-icons/fa";

const meta: Meta<typeof InfoPill> = {
  title: "Components/InfoPill",
  component: InfoPill,
};

export default meta;

type Story = StoryObj<typeof InfoPill>;

export const Default: Story = {
  args: {
    text: "Información general",
    dataTestId: "info-pill-default",
  },
};

export const WithIcon: Story = {
  args: {
    text: "Con icono",
    dataTestId: "info-pill-icon",
    icon: <FaInfoCircle />,
  },
};

export const CustomColors: Story = {
  args: {
    text: "Colores personalizados",
    dataTestId: "info-pill-custom",
    icon: <FaInfoCircle />,
    textColor: "text-white",
    backgroundColor: "bg-blue-600",
  },
};