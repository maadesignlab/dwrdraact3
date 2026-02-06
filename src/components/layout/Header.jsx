import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 font-semibold text-slate-900"
          onClick={() => setOpen(false)}
        >
          <img
            src="/img/nexus.svg"
            alt="Logo"
            className="h-8 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <li>
              <Link
                to="/home"
                className="transition-colors hover:text-slate-900"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/cafeteria"
                className="transition-colors hover:text-slate-900"
              >
                Cafetería
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Abrir menú"
        >
          <span
            className={`h-0.5 w-6 bg-slate-900 transition ${
              open ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-900 transition ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-slate-900 transition ${
              open ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden border-t border-slate-200 bg-white">
          <ul className="flex flex-col gap-4 px-6 py-6 text-sm font-medium text-slate-700">
            <li>
              <Link
                to="/home"
                onClick={() => setOpen(false)}
                className="block transition hover:text-slate-900"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/cafeteria"
                onClick={() => setOpen(false)}
                className="block transition hover:text-slate-900"
              >
                Cafetería
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
