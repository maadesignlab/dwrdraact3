import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import PaymentForm from "./PaymentForm";

// ---- MOCKS ----
const mockClearCart = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../../../context/CartContext", () => ({
  useCart: () => ({
    clearCart: mockClearCart,
  }),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../hooks/useLoader", () => ({
  useLoader: () => ({
    isLoading: false,
    startLoading: vi.fn(),
    stopLoading: vi.fn(),
  }),
}));

vi.mock("../../../components/ui/Stepper", () => ({
  default: () => <div>Stepper</div>,
}));

vi.mock("../../../components/ui/Loader", () => ({
  default: () => <div>Loader</div>,
}));

describe("PaymentForm", () => {
  beforeAll(() => {
    // Mock scrollIntoView (jsdom no lo soporta)
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el primer paso", () => {
    render(<PaymentForm />);
    expect(screen.getByText("1. Datos")).toBeInTheDocument();
  });

  it("avanza al segundo paso", () => {
    render(<PaymentForm />);
    fireEvent.click(screen.getByText("Siguiente"));
    expect(screen.getByText("2. Envío")).toBeInTheDocument();
  });

  it("regresa al paso anterior", () => {
    render(<PaymentForm />);
    fireEvent.click(screen.getByText("Siguiente"));
    fireEvent.click(screen.getByText("Atrás"));
    expect(screen.getByText("1. Datos")).toBeInTheDocument();
  });

  it("ejecuta finalizar y limpia carrito", () => {
    vi.useFakeTimers();
    vi.stubGlobal("alert", vi.fn());

    render(<PaymentForm />);

    // avanzar hasta paso 3
    fireEvent.click(screen.getByText("Siguiente"));
    fireEvent.click(screen.getByText("Siguiente"));

    fireEvent.click(screen.getByText("Finalizar"));

    // simular paso del tiempo
    vi.advanceTimersByTime(2000);

    expect(mockClearCart).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");

    vi.useRealTimers();
  });
});