import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "./AuthContext";
import { apiService } from "../api/apiService";

vi.mock("../api/apiService", () => ({
  apiService: {
    login: vi.fn(),
  },
}));

function TestComponent() {
  const { user, login, logout, loading, error, isAuthenticated } = useAuth();

  return (
    <div>
      <div>User: {user ? user.nombre : "No user"}</div>
      <div>Loading: {loading ? "true" : "false"}</div>
      <div>Error: {error}</div>
      <div>Auth: {isAuthenticated ? "true" : "false"}</div>

      <button
        onClick={async () => {
          try {
            await login("test@mail.com", "1234");
          } catch {
            // evitamos que el error rompa el test runner
          }
        }}
      >
        Login
      </button>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  test("inicia sin usuario", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText("User: No user")).toBeInTheDocument();
    expect(screen.getByText("Auth: false")).toBeInTheDocument();
  });

  test("login exitoso guarda usuario y actualiza estado", async () => {
    const mockUser = { nombre: "Juan", email: "test@mail.com" };
    apiService.login.mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() =>
      expect(screen.getByText("User: Juan")).toBeInTheDocument()
    );

    expect(localStorage.getItem("user")).toBe(
      JSON.stringify(mockUser)
    );

    expect(screen.getByText("Auth: true")).toBeInTheDocument();
  });

  test("login con error setea error correctamente", async () => {
    apiService.login.mockRejectedValue(
      new Error("Credenciales inválidas")
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() =>
      expect(
        screen.getByText("Error: Credenciales inválidas")
      ).toBeInTheDocument()
    );

    expect(screen.getByText("Auth: false")).toBeInTheDocument();
  });

  test("logout limpia usuario y localStorage", async () => {
    const mockUser = { nombre: "Juan" };
    apiService.login.mockResolvedValue(mockUser);

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    await waitFor(() =>
      expect(screen.getByText("User: Juan")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByText("User: No user")).toBeInTheDocument();
    expect(localStorage.getItem("user")).toBeNull();
    expect(screen.getByText("Auth: false")).toBeInTheDocument();
  });

  test("useAuth fuera del provider lanza error", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useAuth debe usarse dentro de AuthProvider"
    );

    consoleError.mockRestore();
  });
});
