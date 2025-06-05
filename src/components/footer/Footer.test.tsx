import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renderiza el footer y los enlaces de los miembros", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    expect(screen.getByTestId("footer-antonio")).toBeInTheDocument();
    expect(screen.getByTestId("antonio-linkedin")).toHaveAttribute("href", expect.stringContaining("linkedin.com/in/antoniojose-lucena-gutierrez"));

    expect(screen.getByTestId("footer-carlos")).toBeInTheDocument();
    expect(screen.getByTestId("carlos-linkedin")).toHaveAttribute("href", expect.stringContaining("linkedin.com/in/carlos-perales-cperales"));
    expect(screen.getByTestId("carlos-github")).toHaveAttribute("href", expect.stringContaining("github.com/cperales"));
    expect(screen.getByTestId("carlos-portfolio")).toHaveAttribute("href", expect.stringContaining("cperales.github.io"));

    expect(screen.getByTestId("footer-josemaria")).toBeInTheDocument();
    expect(screen.getByTestId("josemaria-linkedin")).toHaveAttribute("href", expect.stringContaining("linkedin.com/in/jomaroru"));
    expect(screen.getByTestId("josemaria-github")).toHaveAttribute("href", expect.stringContaining("github.com/jomaroru7"));
    expect(screen.getByTestId("josemaria-portfolio")).toHaveAttribute("href", expect.stringContaining("jomaroru.es"));

    expect(screen.getByTestId("contact")).toBeInTheDocument();
  });
});