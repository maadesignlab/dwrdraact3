import { useState } from "react";

function Pricing() {
  const [activePlan, setActivePlan] = useState("basic");

  const plans = {
    basic: {
      title: "Plan Básico",
      description: "Acceso esencial a la biblioteca.",
      books: "2",
      quality: "SD",
      format: "EPUB",
      coworking: "No incluido",
    },
    pro: {
      title: "Plan Pro",
      description: "Para lectores frecuentes.",
      books: "5",
      quality: "HD",
      format: "EPUB + PDF",
      coworking: "5 días / mes",
    },
    nexus: {
      title: "Plan Nexus",
      description: "Experiencia premium completa.",
      books: "10",
      quality: "4K",
      format: "EPUB + PDF",
      coworking: "Ilimitado",
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      <header className="max-w-2xl space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight">
          Planes de Suscripción Nexus
        </h2>
        <p className="text-slate-600">
          Accede a la librería, coworking y contenidos digitales según tu plan.
        </p>
      </header>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        role="tablist"
        aria-label="Planes de suscripción"
      >
        {Object.entries(plans).map(([key, plan]) => (
          <article
            key={key}
            id={`tab-${key}`}
            role="tab"
            tabIndex={activePlan === key ? 0 : -1}
            aria-selected={activePlan === key}
            aria-controls={`panel-${key}`}
            onClick={() => setActivePlan(key)}
            className={`cursor-pointer rounded-2xl p-6 transition-all duration-300
              focus-visible:ring-2 focus-visible:ring-slate-900
              ${
                activePlan === key
                  ? "bg-slate-200 shadow-xl -translate-y-1"
                  : "bg-slate-100 hover:-translate-y-1 hover:shadow-lg"
              }`}
          >
            <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
            <p className="text-sm text-slate-600">{plan.description}</p>
          </article>
        ))}
      </div>

      <aside
        className="rounded-2xl bg-slate-200 p-8 space-y-6"
        role="tabpanel"
        id={`panel-${activePlan}`}
        aria-labelledby={`tab-${activePlan}`}
      >
        <h4 className="text-lg font-semibold">Resumen del plan</h4>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li>
            <span className="text-sm text-slate-500">Libros / mes</span>
            <span className="block text-xl font-semibold">
              {plans[activePlan].books}
            </span>
          </li>
          <li>
            <span className="text-sm text-slate-500">Calidad</span>
            <span className="block text-xl font-semibold">
              {plans[activePlan].quality}
            </span>
          </li>
          <li>
            <span className="text-sm text-slate-500">Formato</span>
            <span className="block text-xl font-semibold">
              {plans[activePlan].format}
            </span>
          </li>
          <li>
            <span className="text-sm text-slate-500">Coworking</span>
            <span className="block text-xl font-semibold">
              {plans[activePlan].coworking}
            </span>
          </li>
        </ul>
      </aside>
    </section>
  );
}

export default Pricing;
