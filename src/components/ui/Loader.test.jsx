import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Loader from "./Loader";

describe("Loader", () => {

  it("renderiza texto por defecto", () => {
    render(<Loader />);
    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("renderiza texto personalizado", () => {
    render(<Loader text="Procesando pago..." />);
    expect(screen.getByText("Procesando pago...")).toBeInTheDocument();
  });

  it("renderiza el spinner", () => {
    const { container } = render(<Loader />);
    
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

});