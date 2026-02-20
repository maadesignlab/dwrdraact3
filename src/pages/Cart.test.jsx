import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Cart from "./Cart";

/* ---------------- MOCKS ---------------- */

vi.mock("../components/layout/Header", () => ({
  default: () => <div>Header</div>,
}));

vi.mock("../components/layout/Footer", () => ({
  default: () => <div>Footer</div>,
}));

const increaseQty = vi.fn();
const decreaseQty = vi.fn();

let mockCart = [];

vi.mock("../context/CartContext", () => ({
  useCart: () => ({
    cart: mockCart,
    increaseQty,
    decreaseQty,
  }),
}));

/* ---------------- TESTS ---------------- */

describe("Cart Page", () => {
  beforeEach(() => {
    mockCart = [];
    increaseQty.mockClear();
    decreaseQty.mockClear();
  });

  it("muestra mensaje si el carrito está vacío", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("Tu carrito está vacío")).toBeInTheDocument();
  });

  it("renderiza productos cuando hay items", () => {
    mockCart = [
      {
        bookId: 1,
        titulo: "Libro Test",
        autor: "Autor Test",
        precio: 10000,
        cantidad: 2,
        imagen: "test.jpg",
        tipo: "libro",
      },
    ];

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("Libro Test")).toBeInTheDocument();
    expect(screen.getByText("Autor Test")).toBeInTheDocument();
    expect(screen.getByText("Carrito")).toBeInTheDocument();
  });

  it("muestra la sección TOTAL cuando hay productos", () => {
    mockCart = [
      {
        bookId: 1,
        titulo: "Libro Test",
        autor: "Autor Test",
        precio: 10000,
        cantidad: 2,
        imagen: "test.jpg",
        tipo: "libro",
      },
    ];

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("TOTAL:")).toBeInTheDocument();
    expect(screen.getByText("Finalizar compra")).toBeInTheDocument();
  });

  it("llama increaseQty al hacer click en +", () => {
    mockCart = [
      {
        bookId: 1,
        titulo: "Libro Test",
        autor: "Autor Test",
        precio: 10000,
        cantidad: 1,
        imagen: "test.jpg",
        tipo: "libro",
      },
    ];

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("+"));
    expect(increaseQty).toHaveBeenCalledWith(1);
  });

  it("llama decreaseQty al hacer click en -", () => {
    mockCart = [
      {
        bookId: 1,
        titulo: "Libro Test",
        autor: "Autor Test",
        precio: 10000,
        cantidad: 1,
        imagen: "test.jpg",
        tipo: "libro",
      },
    ];

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("-"));
    expect(decreaseQty).toHaveBeenCalledWith(1);
  });
});


