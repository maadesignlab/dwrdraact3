import { useState, useMemo } from "react";
import { useStore } from "../context/StoreContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CoworkingModal from "../components/ui/coworking/CoworkingModal.jsx";
import CoworkingSiteCard from "../components/ui/coworking/CoworkingSiteCard.jsx";
import BookingFlow from "../components/ui/coworking/CoworkingModalBooking.jsx";
import { motion, AnimatePresence } from "framer-motion";

function Coworking() {
  const { coworking: spaces } = useStore();

  const [selectedSpace, setSelectedSpace] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");

  const openModal = (space) => setSelectedSpace(space);

  const closeModal = () => {
    setSelectedSpace(null);
    setIsBooking(false);
  };

  // 🔥 FILTRADO REAL USANDO "ocupado"
  const filteredSpaces = useMemo(() => {
    if (estadoFiltro === "todos") return spaces;

    if (estadoFiltro === "disponible") {
      return spaces.filter((space) => space.ocupado === false);
    }

    if (estadoFiltro === "ocupado") {
      return spaces.filter((space) => space.ocupado === true);
    }

    return spaces;
  }, [spaces, estadoFiltro]);

  // 🔥 CONTADORES REALES
  const total = spaces.length;
  const disponibles = spaces.filter(s => s.ocupado === false).length;
  const ocupados = spaces.filter(s => s.ocupado === true).length;

  // 🔥 CLASIFICACIÓN POR PISO
  const piso1 = filteredSpaces.filter(
    (space) => space.ubicacion === "piso 1"
  );

  const piso2 = filteredSpaces.filter(
    (space) => space.ubicacion === "piso 2"
  );

  return (
    <>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8 min-h-screen">

        {/* HEADER */}
        <div className="mb-6 space-y-6">
          <h1 className="text-3xl font-bold">
            Espacios de Coworking
          </h1>

          {/* STATS */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Espacios totales" value={total} />
            <StatCard title="Disponibles" value={disponibles} />
            <StatCard title="Ocupados" value={ocupados} />
          </div>

          {/* FILTROS */}
          <div className="flex gap-4">
            {["todos", "disponible", "ocupado"].map((estado) => (
              <button
                key={estado}
                onClick={() => setEstadoFiltro(estado)}
                className={`
                  px-4 py-2 rounded-full transition text-sm font-medium
                  ${estadoFiltro === estado 
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"}
                `}
              >
                {estado.charAt(0).toUpperCase() + estado.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* PISO 1 */}
        {piso1.length > 0 && (
          <Section title="Piso 1">
            <AnimatePresence>
              <div className="grid md:grid-cols-2 gap-6">
                {piso1.map((space) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CoworkingSiteCard
                      space={space}
                      onClick={() => openModal(space)}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </Section>
        )}

        {/* PISO 2 */}
        {piso2.length > 0 && (
          <Section title="Piso 2">
            <AnimatePresence>
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {piso2.map((space) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CoworkingSiteCard
                      space={space}
                      onClick={() => openModal(space)}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </Section>
        )}

      </main>

      {selectedSpace &&
        (!isBooking ? (
          <CoworkingModal
            space={selectedSpace}
            onClose={closeModal}
            onStartBooking={() => setIsBooking(true)}
          />
        ) : (
          <BookingFlow
            space={selectedSpace}
            onClose={closeModal}
          />
        ))}

      <Footer />
    </>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-slate-50/70 border border-border-light/50 rounded-xl shadow-md p-6 space-y-6 mb-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="
      flex flex-row items-center justify-between
      bg-surface
      rounded-xl
      px-6
      py-3
      border border-border-light
      transition-all
      hover:shadow-lg
    ">
      <h4 className="text-sm text-text-primary sm:mb-2 lg:mb-0">
        {title}
      </h4>
      <h2 className="text-2xl font-bold">
        {value}
      </h2>
    </div>
  );
}

export default Coworking;





