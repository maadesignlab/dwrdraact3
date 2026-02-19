import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Loader from "../components/ui/Loader";

function Dashboard() {
  const navigate = useNavigate();
  const { libros, coworking, loading } = useStore();

  const totalLibros = libros.length;
  const espaciosDisponibles = coworking.filter(s => !s.ocupado).length;

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading || showLoader) {
    return (
      <>
        <Header />
        <main className="min-h-dvh-minusheader flex items-center justify-center px-4">
          <Loader text="Cargando tu información..." />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10
                       grid gap-6
                       grid-cols-1
                       md:grid-cols-2
                       lg:grid-cols-4
                       auto-rows-[minmax(180px,auto)]
                       min-h-dvh-minusheader
                       lg:min-h-0">

        {/* HERO */}
        <section className="bg-slate-100 border border-border-light shadow-card rounded-2xl p-6 sm:p-8
                            flex flex-col justify-between
                            md:col-span-2 md:row-span-2
                            transition hover:-translate-y-1 hover:shadow-xl">

          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary mb-3">
              Bienvenido a Nexus
            </h1>

            <p className="text-text-primary max-w-xl">
              Gestiona tu lectura, espacios de trabajo y actividad académica desde un solo lugar.
            </p>
          </div>

          <div className="flex gap-8 mt-8 flex-wrap">
            <div className="flex flex-col">
              <strong className="text-2xl font-semibold">
                {loading ? "…" : totalLibros}
              </strong>
              <span className="text-sm text-text-primary">Libros</span>
            </div>

            <div className="flex flex-col">
              <strong className="text-2xl font-semibold">
                {loading ? "…" : espaciosDisponibles}
              </strong>
              <span className="text-sm text-text-primary">Espacios libres</span>
            </div>

            <div className="flex flex-col">
              <strong className="text-2xl font-semibold">2026</strong>
              <span className="text-sm text-text-primary">Año fiscal</span>
            </div>
          </div>
        </section>

        {/* LIBRERÍA */}
        <section
          onClick={() => navigate("/library")}
          className="bg-slate-100 border border-border-light shadow-card rounded-2xl p-6
                     cursor-pointer
                     transition hover:-translate-y-1 hover:shadow-xl">

          <span className="text-3xl mb-3 block">📚</span>
          <h2 className="text-xl font-semibold mb-1 text-text-primary">
            Librería
          </h2>
          <p className="text-text-primary text-sm">
            Explora, reserva y gestiona tus libros favoritos.
          </p>
        </section>

        {/* COWORKING */}
        <section
          onClick={() => navigate("/coworking")}
          className="bg-slate-100 border border-border-light shadow-card rounded-2xl p-6
                     cursor-pointer
                     transition hover:-translate-y-1 hover:shadow-xl">

          <span className="text-3xl mb-3 block">🏢</span>
          <h2 className="text-xl font-semibold mb-1 text-text-primary">
            Coworking
          </h2>
          <p className="text-text-primary text-sm">
            Reserva puestos, salas y espacios creativos.
          </p>
        </section>

        {/* PERFIL */}
        <section
          onClick={() => navigate("/account")}
          className="bg-slate-100 border border-border-light shadow-card rounded-2xl p-6
                     cursor-pointer
                     transition hover:-translate-y-1 hover:shadow-xl">

          <span className="text-3xl mb-3 block">👤</span>
          <h2 className="text-xl font-semibold mb-1 text-text-primary">
            Mi cuenta
          </h2>
          <p className="text-text-primary text-sm">
            Consulta préstamos, reservas y tu historial.
          </p>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Dashboard;
