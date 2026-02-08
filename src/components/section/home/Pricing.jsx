import { useState, useEffect } from "react";
import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

function Pricing() {
  const header = useScrollAnimation();
  const cards = useScrollAnimation();
  const summary = useScrollAnimation();

  const [activePlan, setActivePlan] = useState("basic");

  const [orchestrate, setOrchestrate] = useState(false);
  const [played, setPlayed] = useState(false);

  const plans = {
    basic: {
      title: "Plan Básico",
      description: "Acceso esencial a la biblioteca.",
      price: "$9",
      period: "/mes",
      books: "2",
      quality: "SD",
      format: "EPUB",
      coworking: "No incluido",
    },
    pro: {
      title: "Plan Pro",
      description: "Para lectores frecuentes.",
      price: "$19",
      period: "/mes",
      books: "5",
      quality: "HD",
      format: "EPUB + PDF",
      coworking: "5 días / mes",
    },
    nexus: {
      title: "Plan Nexus",
      description: "Experiencia premium completa.",
      price: "$39",
      period: "/mes",
      books: "10",
      quality: "4K",
      format: "EPUB + PDF",
      coworking: "Ilimitado",
    },
  };

  // 🎼 Orquestación global (una sola vez)
  useEffect(() => {
    if (
      header.visible &&
      cards.visible &&
      summary.visible &&
      !played
    ) {
      setOrchestrate(true);
      setPlayed(true);
    }
  }, [header.visible, cards.visible, summary.visible, played]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">

      {/* ===== PHASE 1 — HEADER ===== */}
      <header
        ref={header.ref}
        className={`
          max-w-2xl space-y-3 transition-all duration-700 ease-out
          ${
            header.visible || orchestrate
              ? "opacity-100 translate-y-0 delay-0"
              : "opacity-0 translate-y-6"
          }
        `}
      >
        <h2 className="text-3xl font-semibold animate-fade-up">
          Planes de Suscripción Nexus
        </h2>

        <p className="text-slate-600 animate-fade-up delay-1">
          Accede a la librería, coworking y contenidos digitales según tu plan.
        </p>
      </header>

      {/* ===== PHASE 2 — CARDS (sincronizadas con summary) ===== */}
      <div
        ref={cards.ref}
        className={`
          grid grid-cols-1 md:grid-cols-3 -mb-1 transition-all duration-700 ease-out
          ${
            cards.visible || orchestrate
              ? "opacity-100 translate-y-0 delay-2"
              : "opacity-0 translate-y-6"
          }
        `}
      >
        {Object.entries(plans).map(([key, plan], i) => (
          <article
            key={key}
            onClick={() => setActivePlan(key)}
            className={`
              relative cursor-pointer rounded-t-2xl border-2 z-1 -ml-px -mr-px p-6 transition-all duration-700 ease-out stagger-${i}
              ${
                cards.visible || orchestrate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }
              ${
                activePlan === key
                  ? "bg-brand-primary shadow-xl"
                  : "bg-slate-100 hover:shadow-lg"
              }
            `}
          >
            {/* PRICE BADGE */}
            <div
              className={`
                absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold
                transition-all duration-500 ease-out stagger-${i}
                ${
                  cards.visible || orchestrate
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-90"
                }
                ${
                  activePlan === key
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-700"
                }
              `}
            >
              {plan.price}
              <span className="text-xs font-normal ml-0.5">
                {plan.period}
              </span>
            </div>

            <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
            <p className="text-sm text-slate-600">{plan.description}</p>
          </article>
        ))}
      </div>

      {/* ===== PHASE 3 — SUMMARY (MISMO TIEMPO QUE CARDS) ===== */}
      <aside
        ref={summary.ref}
        className={`
          rounded-b-2xl border-t-2 z-10 bg-slate-200 p-8 space-y-6
          transition-all duration-700 ease-out
          ${
            summary.visible || orchestrate
              ? "opacity-100 translate-y-0 delay-2"
              : "opacity-0 translate-y-6"
          }
        `}
      >
        <h4 className="text-lg font-semibold animate-fade-up">
          Resumen del plan
        </h4>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <li>
            <span className="text-sm text-slate-500">Libros / mes</span>
            <span
              key={`books-${activePlan}`}
              className="block text-xl font-semibold animate-move-in-left animdelay-0"
            >
              {plans[activePlan].books}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Calidad</span>
            <span
              key={`quality-${activePlan}`}
              className="block text-xl font-semibold animate-move-in-left animdelay-1"
            >
              {plans[activePlan].quality}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Formato</span>
            <span
              key={`format-${activePlan}`}
              className="block text-xl font-semibold animate-move-in-left animdelay-2"
            >
              {plans[activePlan].format}
            </span>
          </li>

          <li>
            <span className="text-sm text-slate-500">Coworking</span>
            <span
              key={`coworking-${activePlan}`}
              className="block text-xl font-semibold animate-move-in-left animdelay-3"
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





