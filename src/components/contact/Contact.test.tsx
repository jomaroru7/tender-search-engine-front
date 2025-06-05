import { render, screen, fireEvent } from "@testing-library/react";
import Contact from "./Contact";

describe("Contact", () => {
  it("renderiza el email y el botón de copiar", () => {
    render(<Contact />);
    expect(screen.getByTestId("contact-email")).toHaveTextContent("info@licico.es");
    expect(screen.getByTestId("contact-copy-btn")).toBeInTheDocument();
  });

  it("renderiza el formulario de contacto", () => {
    render(<Contact />);
    expect(screen.getByTestId("contact-form")).toBeInTheDocument();
    expect(screen.getByTestId("contact-message")).toBeInTheDocument();
    expect(screen.getByTestId("contact-send-btn")).toBeInTheDocument();
  });

  it("permite copiar el email al portapapeles", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
    render(<Contact />);
    fireEvent.click(screen.getByTestId("contact-copy-btn"));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("info@licico.es");
  });
});