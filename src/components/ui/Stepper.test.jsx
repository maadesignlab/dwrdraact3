import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Stepper from "./Stepper";

describe("Stepper", () => {

  it("renderiza los 3 pasos", () => {
    render(<Stepper step={1} />);
    
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("marca pasos activos según step", () => {
    render(<Stepper step={2} />);
    
    const step1 = screen.getByText("1");
    const step2 = screen.getByText("2");
    const step3 = screen.getByText("3");

    expect(step1.className).toContain("bg-brand-500");
    expect(step2.className).toContain("bg-brand-500");
    expect(step3.className).toContain("bg-border-default");
  });

  it("ejecuta onChange al hacer click", () => {
    const mockOnChange = vi.fn();
    render(<Stepper step={1} onChange={mockOnChange} />);
    
    fireEvent.click(screen.getByText("2"));
    
    expect(mockOnChange).toHaveBeenCalledWith(2);
  });

  it("no ejecuta onChange si clickable es false", () => {
    const mockOnChange = vi.fn();
    render(<Stepper step={1} onChange={mockOnChange} clickable={false} />);
    
    fireEvent.click(screen.getByText("2"));
    
    expect(mockOnChange).not.toHaveBeenCalled();
  });

});