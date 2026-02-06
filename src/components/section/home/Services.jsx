function Services() {
  return (
    <section id="servicios" className="w-full py-20">
      
      {/* Título fuera del fondo */}
      <header className="w-full max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Servicios Principales
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl">
          Elige cómo quieres aprender, crear y conectar en Nexus.
        </p>
      </header>

      {/* Contenedor con fondo */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-slate-100 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Columna izquierda: selector */}
            <div className="space-y-6">
              <article className="cursor-pointer rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-semibold mb-2">
                  Librería Universitaria
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Material académico y literario para apoyar tu aprendizaje y proyectos.
                </p>
              </article>

              <article className="cursor-pointer rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-semibold mb-2">
                  Espacios de Coworking
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Áreas modernas y tranquilas para estudiar, crear y trabajar cómodamente.
                </p>
              </article>

              <article className="cursor-pointer rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-lg font-semibold mb-2">
                  Eventos
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Charlas, talleres y actividades que impulsan tu desarrollo y creatividad.
                </p>
              </article>
            </div>

            {/* Columna derecha: imagen */}
            <div className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden bg-slate-200">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                Imagen del servicio seleccionado
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
