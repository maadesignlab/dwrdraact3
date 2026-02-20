import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CartProvider, useCart } from "./CartContext";

describe("CartContext", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("hidrata desde localStorage", () => {
    const mockCart = [{ bookId: 1, cantidad: 2 }];
    localStorage.setItem("nexus_cart", JSON.stringify(mockCart));

    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    expect(result.current.cart).toEqual(mockCart);
  });

  it("agrega producto nuevo", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart({ bookId: 1, title: "Libro" }, 1);
    });

    expect(result.current.cart.length).toBe(1);
    expect(result.current.cart[0].cantidad).toBe(1);
  });

  it("incrementa cantidad si ya existe", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart({ bookId: 1 }, 1);
      result.current.addToCart({ bookId: 1 }, 2);
    });

    expect(result.current.cart[0].cantidad).toBe(3);
  });

  it("increaseQty aumenta cantidad", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart({ bookId: 1 }, 1);
      result.current.increaseQty(1);
    });

    expect(result.current.cart[0].cantidad).toBe(2);
  });

  it("decreaseQty reduce cantidad y elimina si llega a 0", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart({ bookId: 1 }, 1);
      result.current.decreaseQty(1);
    });

    expect(result.current.cart.length).toBe(0);
  });

  it("removeFromCart elimina producto", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart({ bookId: 1 }, 1);
      result.current.removeFromCart(1);
    });

    expect(result.current.cart.length).toBe(0);
  });

  it("clearCart vacía el carrito", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider
    });

    act(() => {
      result.current.addToCart({ bookId: 1 }, 1);
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
  });

});
