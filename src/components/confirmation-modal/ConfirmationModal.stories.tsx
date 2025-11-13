import type { Meta, StoryObj } from "@storybook/react";
import ConfirmationModal, { type ConfirmationModalProps } from "./ConfirmationModal";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const action = (name: string) => (...args: any[]) => {
  // lightweight fallback for Storybook's action when the addon typings don't expose `action`
  // This prevents the compile error and still logs interactions to the console.
  // eslint-disable-next-line no-console
  console.log(name, ...args);
};
const meta: Meta<ConfirmationModalProps> = {
  title: "Components/ConfirmationModal",
  component: ConfirmationModal,
  decorators: [
    (Story) => (
      <div style={{ padding: 24, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<ConfirmationModalProps>;

export const Default: Story = {
  args: {
    open: true,
    title: "Cerrar sesión",
    description: "¿Estás seguro de que quieres cerrar la sesión? Serás redirigido a la pantalla de inicio de sesión.",
    confirmLabel: "Cerrar sesión",
    cancelLabel: "Cancelar",
    onConfirm: action("onConfirm"),
    onCancel: action("onCancel"),
  },
};

export const Closed: Story = {
  args: {
    ...Default.args,
    open: false,
  },
};

export const Processing: Story = {
  args: {
    ...Default.args,
    // simulate a long-running confirm handler
    onConfirm: async () => new Promise((res) => setTimeout(res, 1500)),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const confirmBtn = await canvas.getByRole("button", { name: /cerrar sesión/i });
    await userEvent.click(confirmBtn);
    // leave it running so the UI shows the processing state in Storybook
  },
};