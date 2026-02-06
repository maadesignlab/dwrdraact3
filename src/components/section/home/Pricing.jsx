import { useState } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

function Pricing() {
  const header = useScrollAnimation();
  const cards = useScrollAnimation();
  const summary = useScrollAnimation();

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
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">

      {/* ===== PHASE 1 — HEADER ===== */}
      <header
        ref={header.ref}
        className={`max-w-2xl space-y-3 transition-all duration-700 ease-out
          ${header.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h2 className="text-3xl font-semibold animate-fade-up delay-0">
          Planes de Suscripción Nexus
        </h2>

        <p className="text-slate-600 animate-fade-up delay-1">
          Accede a la librería, coworking y contenidos digitales según tu plan.
        </p>
      </header>

      {/* ===== PHASE 2 — CARDS ===== */}
      <div
        ref={cards.ref}
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-700 ease-out
          ${cards.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        {Object.entries(plans).map(([key, plan], i) => (
          <article
            key={key}
            onClick={() => setActivePlan(key)}
            className={`cursor-pointer rounded-2xl p-6
              animate-fade-up delay-${i}
              transition-all duration-300
              ${
                activePlan === key
                  ? "bg-slate-200 shadow-xl"
                  : "bg-slate-100 hover:shadow-lg"
              }`}
          >
            <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
            <p className="text-sm text-slate-600">{plan.description}</p>
          </article>
        ))}
      </div>

      {/* ===== PHASE 3 — SUMMARY ===== */}
      <aside
        ref={summary.ref}
        className={`rounded-2xl bg-slate-200 p-8 space-y-6 transition-all duration-700 ease-out
          ${summary.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
        `}
      >
        <h4 className="text-lg font-semibold animate-fade-up delay-0">
          Resumen del plan
        </h4>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li>
            <span className="text-sm text-slate-500">Libros / mes</span>
            <span
              key={`${activePlan}-books`}
              className="block text-xl font-semibold animate-fade-up delay-1"
            >
              {plans[activePlan].books}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Calidad</span>
            <span
              key={`${activePlan}-quality`}
              className="block text-xl font-semibold animate-fade-up delay-2"
            >
              {plans[activePlan].quality}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Formato</span>
            <span
              key={`${activePlan}-format`}
              className="block text-xl font-semibold animate-fade-up delay-3"
            >
              {plans[activePlan].format}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Coworking</span>
            <span
              key={`${activePlan}-coworking`}
              className="block text-xl font-semibold animate-fade-up delay-4"
            >
              {plans[activePlan].coworking}
            </span>
          </li>
        </ul>
      </aside>
    </section>
  );
}

export default Pricing;

