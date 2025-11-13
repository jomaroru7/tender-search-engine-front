import type { Meta, StoryObj } from "@storybook/react";
import SearchCard, { type SavedSearch } from "./SearchCard";
const action = (name: string) => (...args: any[]) => {
  // lightweight fallback for Storybook's action when the addon typings don't expose `action`
  // This prevents the compile error and still logs interactions to the console.
  // eslint-disable-next-line no-console
  console.log(name, ...args);
};

const meta: Meta<typeof SearchCard> = {
  title: "Components/SearchCard",
  component: SearchCard,
  decorators: [
    (Story) => (
      <div style={{ padding: 16, maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SearchCard>;

const baseSearch: SavedSearch = {
  invoicing: 42000,
  place: "Granada",
  activity: "Producción de biomasa",
  timestamp: new Date().toISOString(),
  page: 1,
  page_size: 10,
  cpv_list: [],
};

export const Default: Story = {
  args: {
    search: baseSearch,
    onRestore: action("onRestore"),
    onDeleted: action("onDeleted"),
  },
};

export const WithoutTimestamp: Story = {
  args: {
    search: { ...baseSearch, timestamp: undefined },
    onRestore: action("onRestore"),
    onDeleted: action("onDeleted"),
  },
};