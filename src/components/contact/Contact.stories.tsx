import type { Meta, StoryObj } from "@storybook/react";
import Contact from "./Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const meta: Meta<typeof Contact> = {
  title: "Components/Contact",
  component: Contact,
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastContainer />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Contact>;

export const Default: Story = {};