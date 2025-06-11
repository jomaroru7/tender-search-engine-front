import type { Meta, StoryObj } from "@storybook/react";
import ScoreGraph from "./ScoreGraph";

const meta: Meta<typeof ScoreGraph> = {
  title: "Components/ScoreGraph",
  component: ScoreGraph,
};

export default meta;

type Story = StoryObj<typeof ScoreGraph>;

export const Default: Story = {
  args: {
    score: 0.5,
  },
};

export const MaxScore: Story = {
  args: {
    score: 1,
  },
};

export const MinScore: Story = {
  args: {
    score: 0,
  },
};

export const CustomMax: Story = {
  args: {
    score: 1,
    max: 10,
  },
};