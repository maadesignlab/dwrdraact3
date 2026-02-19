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

  /* =========================
     Animaciones premium
  ========================== */

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -15,
      scale: 0.98,
      transition: {
        duration: 0.2
      }
    }
  };

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
            className="w-full border border-border-default rounded-lg py-2 font-medium"
          >
            Filtrar por
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-[260px_1fr]">

          {/* SIDEBAR DESKTOP */}
          <aside className="
            hidden md:block
            md:border-r md:border-border-default
            p-6
            md:sticky md:top-[68px]
            md:h-[calc(100dvh-68px)]
          ">
            <LibraryFilters />
          </aside>

          {/* CATÁLOGO */}
          <section className="w-full relative">

            {/* Loader overlay solo para filtros */}
            {loading && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20">
                <Loader />
              </div>
            )}

            <motion.div
              layout
              variants={containerVariants}
              initial="hidden"
              animate="show"
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
                      variants={cardVariants}
                      initial="hidden"
                      animate="show"
                      exit="exit"
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
      {openFilters && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setOpenFilters(false)}
          />

          <aside className="
            fixed top-0 right-0 h-full w-72
            bg-white
            z-50
            p-6
            shadow-2xl
            md:hidden
          ">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Filtrar por</h3>
              <button onClick={() => setOpenFilters(false)}>✕</button>
            </div>

            <LibraryFilters />
          </aside>
        </>
      )}

      <Footer />
    </>
  );
}

export default Library;
