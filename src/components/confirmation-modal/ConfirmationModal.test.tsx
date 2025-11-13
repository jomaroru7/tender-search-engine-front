import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmationModal from "./ConfirmationModal";

describe("ConfirmationModal", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("no renderiza cuando open es false", () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const { container } = render(
      <ConfirmationModal open={false} onConfirm={onConfirm} onCancel={onCancel} />
    );

    expect(container.querySelector('[role="dialog"]')).toBeNull();
  });

  it("muestra título y descripción cuando open es true", () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    render(
      <ConfirmationModal
        open
        title="Eliminar"
        description="¿Estás seguro?"
        confirmLabel="Sí"
        cancelLabel="No"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
    expect(screen.getByText("¿Estás seguro?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sí/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument();
  });

  it("llama a onCancel al pulsar el botón cancelar y al hacer click en el overlay", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const { container } = render(
      <ConfirmationModal
        open
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    // cancelar por botón
    await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(onCancel).toHaveBeenCalledTimes(1);

    // cancelar por overlay (primer elemento absoluto dentro del dialog)
    const overlay = container.querySelector(".absolute");
    if (overlay) {
      await userEvent.click(overlay);
      expect(onCancel).toHaveBeenCalledTimes(2);
    } else {
      // fallback: ensure test fails clearly if overlay not found
      throw new Error("Overlay element not found in modal markup");
    }
  });

  it("ejecuta onConfirm y muestra estado de procesamiento mientras la promesa no está resuelta", async () => {
    let resolveConfirm!: () => void;
    const confirmPromise = new Promise<void>((res) => {
      resolveConfirm = res;
    });
    const onConfirm = vi.fn(() => confirmPromise);
    const onCancel = vi.fn();

    render(
      <ConfirmationModal
        open
        confirmLabel="Confirmar"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    const confirmButton = screen.getByRole("button", { name: /confirmar/i });
    await userEvent.click(confirmButton);

    // onConfirm llamada inmediatamente
    expect(onConfirm).toHaveBeenCalledTimes(1);

    // boton debe mostrar estado de procesamiento y estar deshabilitado
    expect(confirmButton).toBeDisabled();
    expect(screen.getByRole("button", { name: /procesando\.\.\./i })).toBeInTheDocument();

    // resolver la promesa y esperar que el botón vuelva
    resolveConfirm();
    await waitFor(() => {
      // tras resolver, el botón ya no debe mostrar "Procesando..."
      expect(screen.queryByText(/procesando\.\.\./i)).toBeNull();
    });
  });
});