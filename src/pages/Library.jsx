import { useStore } from "../context/StoreContext"; 
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";


import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BookCard from "../components/ui/library/BookCard";
import Loader from "../components/ui/Loader";
import LibraryFilters from "../components/section/library/libraryFilters";

function Library() {
  const { libros, loading } = useStore();
  const [showLoader, setShowLoader] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (showLoader) {
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

      <main className="min-h-dvh-minusheader max-w-7xl mx-auto relative">

        {/* BOTÓN FILTROS MOBILE */}
        <div className="md:hidden p-6 pb-0">
          <button
            onClick={() => setOpenFilters(true)}
            className="btn-secondary w-full py-2"
          >
            Filtrar por
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-[260px_1fr]">

          {/* SIDEBAR DESKTOP */}
          <aside className="
            hidden md:flex md:flex-col
            md:border-r md:border-border-default
            md:sticky md:top-[68px]
            md:h-[calc(100dvh-68px)]
            p-6
          ">
            <LibraryFilters />
          </aside>

          {/* CATÁLOGO */}
          <section className="w-full relative">
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                <Loader />
              </div>
            )}

            <motion.div
              layout
              initial={{}}
              animate={{}}
              className="
                grid
                gap-6
                p-6
                grid-cols-1
                sm:grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              <AnimatePresence mode="popLayout">
                {libros && libros.length > 0 ? (
                  libros.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <BookCard libro={item} />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full flex items-center justify-center py-20">
                    <p className="text-text-secondary text-center">
                      No hay libros disponibles en este momento.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </section>

        </section>
      </main>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {openFilters && (
          <>
            {/* OVERLAY */}
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setOpenFilters(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            {/* DRAWER */}
            <motion.aside
              className="
                fixed top-0 right-0 h-full w-72
                bg-white
                z-50
                shadow-2xl
                md:hidden
                flex flex-col
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25
              }}
            >
              {/* HEADER FIJO */}
              <button className="
                btn-secondary
                bg-transparent
                border border-border-default/0
                w-10 h-10
                flex items-center justify-center
                p-2
                absolute top-4 right-4
                text-2xl
                hover:border-border-default
                cursor-pointer
                transition
              " onClick={() => setOpenFilters(false)}>x</button>

              {/* CONTENIDO SCROLLEABLE */}
              <div className="flex-1 overflow-y-auto p-6">
                <LibraryFilters />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default Library;
