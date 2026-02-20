import { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import AccountSidebar from "../components/section/account/AccountSidebar";
import HistoryItem from "../components/ui/account/HistoryItem";

function Account() {
  const { coworking, libros, purchases, loading, loadStoreData } = useStore();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState("perfil");

  useEffect(() => {
    if (user?.id) {
      loadStoreData(user.id);
    }
  }, [user]);

  const userProfile = {
    nombre: user?.nombre || "Usuario Nexus",
    email: user?.correo || user?.email || "usuario@nexus.com.co",
    rol: user?.rol || "Miembro",
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "perfil":
        return (
          <div className="space-y-8">

            {/* HERO PERFIL */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-8 border-b border-border-default text-center md:text-left">
              
              <img
                src="https://placehold.net/avatar-4.svg"
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-brand"
              />

              <div>
                <h1 className="text-2xl font-semibold text-text-primary">
                  {userProfile.nombre}
                </h1>

                <span className="bg-brand-500 inline-block mt-2 px-4 py-1 rounded-full text-xs font-semibold bg-brand-muted text-brand">
                  {userProfile.rol}
                </span>

                <p className="mt-2 text-text-primary">
                  {userProfile.email}
                </p>
              </div>
            </div>

            {/* RESUMEN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-bg-fill border border-border-light rounded-xl p-6">
                <h4 className="text-xs uppercase text-text-primary/50 mb-2">
                  Libro en préstamo
                </h4>
                <p className="font-semibold text-text-primary">
                  {libros.length > 0
                    ? libros[0].titulo
                    : "No tienes libros actualmente"}
                </p>
              </div>

              <div className="bg-bg-fill border border-border-light rounded-xl p-6">
                <h4 className="text-xs uppercase text-text-primary/50 mb-2">
                  Próximo coworking
                </h4>
                <p className="font-semibold text-text-primary">
                  {coworking.find(s => s.ocupado)?.nombre || "Sin reservas activas"}
                </p>
              </div>

            </div>
          </div>
        );

        case "historial-compras":
          return (
            <div className="space-y-6">
              {loading ? (
                <p className="text-text-secondary">Cargando compras...</p>
              ) : purchases && purchases.length > 0 ? (
                purchases.map((compra) => (
                  <HistoryItem
                    key={compra.purchaseId}
                    compra={compra}
                  />
                ))
              ) : (
                <div className="text-text-secondary">
                  Aún no tienes compras registradas.
                </div>
              )}
            </div>
          );

        case "historial-reservas":
          return (
            <div className="text-text-secondary">
              Sección de reservas en construcción.
            </div>
          );

        case "preferencias":
          return (
            <div className="text-text-secondary">
              Preferencias en construcción.
            </div>
          );

        default:
          return (
            <div className="text-text-secondary">
              Sección en construcción.
            </div>
          );
    }
  };

  return (
    <div className="flex flex-col min-h-dvh">

      <Header />

      <div className="
        grid
        grid-cols-1
        md:grid-cols-[280px_1fr]
        max-w-6xl
        mx-auto
        w-full
        px-4
        md:px-6
        py-8
        gap-6
        flex-1
      ">

        {/* SIDEBAR */}
        <aside className="
          border border-border-light
          rounded-2xl
          shadow-md
          p-4
          md:p-6
          h-fit
        ">
          <AccountSidebar
            onTabChange={setActiveTab}
            activeTab={activeTab}
          />
        </aside>

        {/* MAIN */}
        <main className="
          border border-border-light
          rounded-2xl
          shadow-card
          p-6
          md:p-8
        ">
          {renderTabContent()}
        </main>

      </div>

      <Footer />
    </div>
  );
}

export default Account;
