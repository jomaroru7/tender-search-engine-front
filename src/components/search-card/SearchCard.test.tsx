import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { SavedSearch } from "./SearchCard";
import SearchCard from "./SearchCard";

// hoist-safe mocks
vi.mock("../../services/tenders/alertsService", () => ({ deleteSearch: vi.fn() }));
vi.mock("react-toastify", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

let deleteSearch: any;
let toast: any;

beforeEach(async () => {
  vi.resetAllMocks();
  // import the mocked modules after vi.mock so we get the mocked implementations
  const alerts = await import("../../services/tenders/alertsService");
  const rt = await import("react-toastify");
  deleteSearch = alerts.deleteSearch;
  toast = rt.toast;

  // default confirm to true for tests that need it
  // individual tests can override window.confirm if needed
  (window as any).confirm = vi.fn(() => true);
});

describe("SearchCard", () => {
  const sample: SavedSearch = {
    invoicing: 42000,
    place: "Granada",
    activity: "Producción de biomasa",
    timestamp: new Date().toISOString(),
    cpv_list: [],
    exact_place: false,
    page: 1,
    page_size: 10,
  };

  it("renders fields and calls onRestore when clicking restore", async () => {
    const onRestore = vi.fn();
    render(<SearchCard search={sample} onRestore={onRestore} />);

    // verify rendered content
    expect(screen.getByText(String(sample.invoicing))).toBeInTheDocument();
    expect(screen.getByText(sample.place as string)).toBeInTheDocument();
    expect(screen.getByText(sample.activity as string)).toBeInTheDocument();

    // click restore button (has data-testid "restore-button")
    await userEvent.click(screen.getByTestId("restore-button"));
    expect(onRestore).toHaveBeenCalledTimes(1);
    expect(onRestore).toHaveBeenCalledWith(sample);
  });

  it("calls deleteSearch, shows toast.success and invokes onDeleted when deletion succeeds", async () => {
    const onDeleted = vi.fn();
    deleteSearch.mockResolvedValue({ status: 200, data: {} });

    render(<SearchCard search={sample} onDeleted={onDeleted} />);

    // click delete (uses aria-label "Eliminar búsqueda")
    await userEvent.click(screen.getByLabelText("Eliminar búsqueda"));

    await waitFor(() => {
      expect(deleteSearch).toHaveBeenCalled();
    });

    expect(onDeleted).toHaveBeenCalledWith(sample);
    expect(toast.success).toHaveBeenCalledWith("Búsqueda eliminada.");
  });

  it("shows validation error toast when API returns 422 and does not call onDeleted", async () => {
    const onDeleted = vi.fn();
    deleteSearch.mockResolvedValue({ status: 422, errors: { detail: ["invalid"] } });

    render(<SearchCard search={sample} onDeleted={onDeleted} />);

    await userEvent.click(screen.getByLabelText("Eliminar búsqueda"));

    await waitFor(() => {
      expect(deleteSearch).toHaveBeenCalled();
    });

    expect(onDeleted).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Error de validación al eliminar la búsqueda.");
  });

  it("disables buttons and shows 'Eliminando...' while delete promise is pending", async () => {
    let resolveDelete: () => void;
    const pending = new Promise<void>((res) => { resolveDelete = res; });
    deleteSearch.mockImplementation(() => pending);

    render(<SearchCard search={sample} />);

    const deleteBtn = screen.getByLabelText("Eliminar búsqueda");
    await userEvent.click(deleteBtn);

    // while promise pending, button should be disabled and show "Eliminando..."
    await waitFor(() => {
      expect(deleteBtn).toBeDisabled();
      expect(deleteBtn).toHaveTextContent(/eliminando/i);
    });

    // resolve the pending promise
    resolveDelete!();
    await waitFor(() => {
      // after resolution, button re-enabled (mocked deleteSearch resolves)
      expect(deleteBtn).not.toBeDisabled();
    });
  });
});