import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { LogOut, Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, increaseQty, decreaseQty } = useCart();

  const [openAccount, setOpenAccount] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const cartRef = useRef(null);
  const accountRef = useRef(null);

  const total = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    setOpenAccount(false);
    navigate("/home");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openCart && cartRef.current && !cartRef.current.contains(e.target)) {
        setOpenCart(false);
      }
      if (openAccount && accountRef.current && !accountRef.current.contains(e.target)) {
        setOpenAccount(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openCart, openAccount]);

  const [openMobile, setOpenMobile] = useState(false);

  return (
  <header className="
    sticky top-0 z-50
    bg-white/70 backdrop-blur-md
    border-b border-slate-200
  ">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      {/* LOGO */}
      <div
        onClick={() => navigate("/dashboard")}
        className="cursor-pointer"
      >
        <img src="/img/nexus.svg" alt="Nexus" className="w-20" />
      </div>

      {/* DESKTOP NAV */}
      <nav className="hidden md:flex items-center gap-6 text-sm">

        {!user && (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}

        {user && (
          <>
            <Link to="/library" className="hover:underline">Librería</Link>
            <Link to="/coworking" className="hover:underline">Coworking</Link>
            <Link to="/cafeteria" className="hover:underline">Cafetería</Link>
            <Link to="/unavailable" className="hover:underline">Eventos</Link>

            {/* 🛒 CART (igual que antes) */}
            <div ref={cartRef} className="relative">
              <button
                onClick={() => setOpenCart(!openCart)}
                className="relative py-1 rounded-md hover:underline cursor-pointer transition"
              >
                Carrito

                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-4 bg-red-500 text-white text-xs font-bold px-2 py-[2px] rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>

              {openCart && (
                <div className="absolute right-0 mt-3 w-[450px] rounded-lg bg-slate-50 backdrop-blur-lg border border-border-light shadow-2xl p-4 z-50">
                  {cart.length === 0 ? (
                    <p className="text-center text-text-primary">
                      Carrito vacío
                    </p>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <div
                          key={item.bookId}
                          className="grid grid-cols-[1fr_auto_auto] gap-3 items-center pb-3 mb-3 border-b border-border-default"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <img
                              src={`/${item.imagen}`}
                              alt={item.titulo}
                              className="w-8 h-12 object-cover rounded"
                            />
                            <span className="text-sm truncate">
                              {item.titulo}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 border border-border-default rounded-md px-2 py-1">
                            <button
                              onClick={() => decreaseQty(item.bookId)}
                              className="btn-secondary w-5 h-5 p-0 rounded text-sm font-bold transition flex-center"
                            >-</button>

                            <span className="text-xs w-6 text-center">
                              {item.cantidad}
                            </span>

                            <button
                              onClick={() => increaseQty(item.bookId)}
                              className="btn-secondary w-5 h-5 p-0 rounded text-sm font-bold transition flex-center"
                            >+</button>
                          </div>

                          <span className="text-sm font-medium">
                            ${(item.precio * item.cantidad).toLocaleString()}
                          </span>
                        </div>
                      ))}

                      <div className="text-right font-semibold mb-3">
                        Total: ${total.toLocaleString()}
                      </div>

                      <button
                        onClick={() => {
                          setOpenCart(false);
                          navigate("/cart");
                        }}
                        className="btn-primary w-full bg-brand text-white py-2 rounded-md hover:shadow-md transition"
                      >
                        Ver carrito completo
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* USER MENU */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setOpenAccount(!openAccount)}
                className="btn-secondary px-4 py-1 transition"
              >
                Hola, {user?.nombre}
              </button>

              {openAccount && (
                <div className="absolute right-0 mt-3 rounded-lg bg-slate-50 backdrop-blur-lg border border-border-light shadow-2xl p-4 z-50 w-40">
                  <Link
                    to="/account"
                    onClick={() => setOpenAccount(false)}
                    className="block mb-3 hover:underline"
                  >
                    Mi cuenta
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:opacity-80"
                  >
                    <LogOut size={16} />
                    Salir
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>

      {/* HAMBURGER BUTTON */}
      <button
        onClick={() => setOpenMobile(!openMobile)}
        className="md:hidden flex flex-col gap-1.5"
        aria-label="Abrir menú"
      >
        <span
          className={`h-0.5 w-6 bg-slate-900 transition ${
            openMobile ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-slate-900 transition ${
            openMobile ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-slate-900 transition ${
            openMobile ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>
    </div>

    {/* MOBILE MENU (dropdown como el primero) */}
    {openMobile && (
      <nav className="md:hidden absolute left-0 top-full w-full border-t border-slate-200 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="px-6 py-6 flex flex-col gap-4 text-sm font-medium text-slate-700">
          {!user && (
            <Link to="/login" onClick={() => setOpenMobile(false)}>
              Login
            </Link>
          )}

          {user && (
            <>
              <Link to="/library" onClick={() => setOpenMobile(false)}>Librería</Link>
              <Link to="/coworking" onClick={() => setOpenMobile(false)}>Coworking</Link>
              <Link to="/cafeteria" onClick={() => setOpenMobile(false)}>Cafetería</Link>
              <Link to="/unavailable" onClick={() => setOpenMobile(false)}>Eventos</Link>
              <Link to="/cart" onClick={() => setOpenMobile(false)}>
                Carrito ({totalItems})
              </Link>
              <Link to="/account" onClick={() => setOpenMobile(false)}>Mi cuenta</Link>
              <button
                onClick={handleLogout}
                className="text-left text-red-500"
              >
                Salir
              </button>
            </>
          )}
        </div>
      </nav>
    )}

  </header>
);

}

export default Header;