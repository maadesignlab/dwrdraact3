import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Library from "../pages/Library";
import BookDetail from "../pages/BookDetail";
import Coworking from "../pages/Coworking";
import Cart from "../pages/Cart";
import Payment from "../pages/Payment";
import Account from "../pages/Account";
import Unavailable from "../pages/Unavailable";
import Cafeteria from "../pages/Cafeteria";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* 🔁 Redirección inteligente */}
      <Route
        path="/"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/home" replace />
        }
      />

      {/* 🌐 Públicas */}
      <Route path="/home" element={<Home />} />

      <Route
        path="/login"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <Login />
        }
      />

      {/* 🔐 Privadas */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/library"
        element={
          <PrivateRoute>
            <Library />
          </PrivateRoute>
        }
      />

      <Route
        path="/library/:id"
        element={
          <PrivateRoute>
            <BookDetail />
          </PrivateRoute>
        }
      />

      <Route
        path="/coworking"
        element={
          <PrivateRoute>
            <Coworking />
          </PrivateRoute>
        }
      />

      <Route
        path="/cafeteria"
        element={
          <PrivateRoute>
            <Cafeteria />
          </PrivateRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        }
      />

      <Route
        path="/account"
        element={
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        }
      />

      <Route
        path="/unavailable"
        element={
          <PrivateRoute>
            <Unavailable />
          </PrivateRoute>
        }
      />

      {/* 🚨 Fallback */}
      <Route
        path="*"
        element={
          user
            ? <Navigate to="/dashboard" replace />
            : <Navigate to="/home" replace />
        }
      />

    </Routes>
  );
}

export default AppRouter;
