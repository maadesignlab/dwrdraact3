import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Header from "./Header";

// ---- VARIABLES CONTROLADAS ----
let mockUser = null;
let mockCart = [];

const mockNavigate = vi.fn();
const mockLogout = vi.fn();
const mockIncrease = vi.fn();
const mockDecrease = vi.fn();

// ---- MOCKS GLOBALES ----
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ children }) => <span>{children}</span>,
}));

vi.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout,
  }),
}));

vi.mock("../../context/CartContext", () => ({
  useCart: () => ({
    cart: mockCart,
    increaseQty: mockIncrease,
    decreaseQty: mockDecrease,
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;
    mockCart = [];
  });

  it("muestra Login si no hay usuario", () => {
    render(<Header />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("muestra saludo si hay usuario", () => {
    mockUser = { nombre: "Miguel" };

    render(<Header />);
    expect(screen.getByText("Hola, Miguel")).toBeInTheDocument();
  });

  it("ejecuta logout y navega", () => {
    mockUser = { nombre: "Miguel" };

    render(<Header />);

    fireEvent.click(screen.getByText("Hola, Miguel"));
    fireEvent.click(screen.getByText("Salir"));

    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  it("muestra contador del carrito", () => {
    mockUser = { nombre: "Miguel" };
    mockCart = [
      { bookId: 1, precio: 10000, cantidad: 2 },
    ];

    render(<Header />);
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("abre menú móvil al hacer click", () => {
    render(<Header />);

    const button = screen.getByLabelText("Abrir menú");
    fireEvent.click(button);

    expect(screen.getAllByText("Login").length).toBeGreaterThan(0);
  });
});