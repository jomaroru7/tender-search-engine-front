import type { Meta, StoryObj } from "@storybook/react";
import Pagination from "./Pagination";
import { useState } from "react";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const Template = (args: any) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage ?? 1);
  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
};

export const FewPages: Story = {
  render: Template,
  args: {
    currentPage: 1,
    totalPages: 4,
  },
};

export const ManyPages: Story = {
  render: Template,
  args: {
    currentPage: 8,
    totalPages: 20,
  },
};

export const FirstPage: Story = {
  render: Template,
  args: {
    currentPage: 1,
    totalPages: 10,
  },
};

export const LastPage: Story = {
  render: Template,
  args: {
    currentPage: 10,
    totalPages: 10,
  },
};