import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { Authenticator } from '@aws-amplify/ui-react';

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Authenticator.Provider>
          <Story />
        </Authenticator.Provider>
      </MemoryRouter>
    ),
  ],
};

export const OnRegisterPage: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/register"]}>
        <Authenticator.Provider>
          <Story />
        </Authenticator.Provider>
      </MemoryRouter>
    ),
  ],
};