import type { Meta, StoryObj } from "@storybook/react";
import CompanyForm from "./CompanyForm";

const meta: Meta<typeof CompanyForm> = {
  title: "Components/CompanyForm",
  component: CompanyForm,
};

export default meta;

type Story = StoryObj<typeof CompanyForm>;

export const Default: Story = {
  args: {
    title: "Registrar empresa",
    submitLabel: "Guardar",
    initialName: "Mi Empresa S.L.",
    initialLocation: "Madrid",
    initialBudget: 100000,
    initialDescription: "Empresa dedicada a servicios de limpieza y mantenimiento.",
    onSubmit: (data) => {
      alert(`Datos enviados:\n${JSON.stringify(data, null, 2)}`);
    },
  },
};