import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Unavailable() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="
        h-dvh-minusheader
        flex-1
        flex items-center justify-center
        px-8
      ">
        <section className="
          max-w-[520px]
          w-full
          bg-surface
          rounded-3xl
          p-10
          text-center
          shadow-md
        ">
          <div className="text-5xl mb-4">🚧</div>

          <h1 className="text-2xl font-bold mb-2">
            Sección en construcción
          </h1>

          <p className="text-text-secondary mb-4">
            Estamos trabajando para habilitar esta sección muy pronto.
            Queremos que la experiencia valga la espera.
          </p>

          <div className="text-sm text-text-secondary opacity-80">
            Mientras tanto, puedes explorar otros servicios disponibles en Nexus.
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Unavailable;