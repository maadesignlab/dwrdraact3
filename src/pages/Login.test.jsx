import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Login from "./Login";

// --- MOCKS ---
const mockLogin = vi.fn();
const mockLoadStoreData = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    login: mockLogin,
    loading: false,
    error: null,
  }),
}));

vi.mock("../context/StoreContext", () => ({
  useStore: () => ({
    loadStoreData: mockLoadStoreData,
  }),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

// --- TESTS ---
describe("Login component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza el formulario correctamente", () => {
    render(<Login />);

    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Usuario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
  });

  it("envía el formulario correctamente", async () => {
    mockLogin.mockResolvedValueOnce();

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Usuario"), {
      target: { value: "test@test.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "12345678" },
    });

    fireEvent.click(screen.getByText("Entrar"));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@test.com", "12345678");
      expect(mockLoadStoreData).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("muestra error si existe", () => {
    vi.mocked(mockLogin);

    vi.mock("../context/AuthContext", () => ({
      useAuth: () => ({
        login: mockLogin,
        loading: false,
        error: "Credenciales inválidas",
      }),
    }));

    render(<Login />);

    expect(screen.getByText("Credenciales inválidas")).toBeInTheDocument();
  });
});
