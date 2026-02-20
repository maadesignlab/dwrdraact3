import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "../context/AuthContext";

describe("PrivateRoute", () => {

  it("redirige a login si no hay usuario", () => {
    render(
      <AuthContext.Provider value={{ user: null }}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <div>Dashboard</div>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<div>Login Page</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renderiza children si hay usuario", () => {
    render(
      <AuthContext.Provider value={{ user: { id: 1, name: "Miguel" } }}>
        <MemoryRouter initialEntries={["/dashboard"]}>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <div>Dashboard</div>
                </PrivateRoute>
              }
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

});