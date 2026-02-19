import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useLoader } from "../../../hooks/useLoader";
import Stepper from "../../../components/ui/Stepper";
import Loader from "../../../components/ui/Loader";

export default function PaymentForm() {
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState([]);

  const { isLoading, startLoading, stopLoading } = useLoader(false);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const element = document.querySelector(
      `[data-accordion="${activeStep}"]`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeStep]);

  const nextStep = (e) => {
    e.stopPropagation();
    setCompleted((prev) =>
      prev.includes(activeStep) ? prev : [...prev, activeStep]
    );
    if (activeStep < 3) setActiveStep(activeStep + 1);
  };

  const prevStep = (e) => {
    e.stopPropagation();
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const handleFinalizar = () => {
    if (isLoading) return;

    startLoading();

    setTimeout(() => {
      clearCart();
      alert("¡Pedido Confirmado Exitosamente!");
      stopLoading();
      navigate("/dashboard");
    }, 2000);
  };

  const stepLabels = {
    1: "Datos",
    2: "Envío",
    3: "Pago",
  };

  return (
    <div className="relative max-w-[800px] mx-auto px-4">

      {/* OVERLAY LOADER */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[2000]">
          <Loader text="Procesando tu pago..." />
        </div>
      )}


      {/* STEPPER */}
      <div className="sticky top-[62px] bg-slate-100 shadow-sm p-6 z-40 rounded-b-xl">
        <Stepper
          step={activeStep}
          onChange={(s) => !isLoading && setActiveStep(s)}
        />
      </div>

      {/* STEPS */}
      <div className="space-y-4 my-6 text-sm">

        <Accordion id={1} title="1. Datos" active={activeStep} onOpen={setActiveStep}>
          <Input placeholder="Nombre" />
          <Input placeholder="Apellido" />

          <div className="flex justify-end mt-4">
            <PrimaryBtn onClick={nextStep}>
              Siguiente
            </PrimaryBtn>
          </div>
        </Accordion>

        <Accordion id={2} title="2. Envío" active={activeStep} onOpen={setActiveStep}>
          <Input placeholder="Dirección" />

          <div className="flex justify-end gap-4 mt-4">
            <SecondaryBtn onClick={prevStep}>
              Atrás
            </SecondaryBtn>

            <PrimaryBtn onClick={nextStep}>
              Siguiente
            </PrimaryBtn>
          </div>
        </Accordion>

        <Accordion id={3} title="3. Pago" active={activeStep} onOpen={setActiveStep}>
          <p className="text-sm text-text-secondary">
            Selecciona método de pago…
          </p>

          <div className="flex justify-end gap-4 mt-4">
            <SecondaryBtn onClick={prevStep} disabled={isLoading}>
              Atrás
            </SecondaryBtn>

            <PrimaryBtn
              onClick={handleFinalizar}
              disabled={isLoading}
            >
              {isLoading ? "Procesando..." : "Finalizar"}
            </PrimaryBtn>
          </div>
        </Accordion>

      </div>
    </div>
  );
}

/* -------- COMPONENTES REUTILIZABLES -------- */

function Accordion({ id, title, active, children, onOpen }) {
  const isOpen = active === id;

  return (
    <div
      data-accordion={id}
      className="
        bg-surface
        border border-border-default
        rounded-xl
        overflow-hidden
        scroll-mt-[190px]
      "
    >
      <div
        onClick={() => onOpen(id)}
        className="p-6 cursor-pointer"
      >
        <h3 className="font-semibold">
          {title}
        </h3>
      </div>

      {isOpen && (
        <div className="border-t border-border-default p-4 space-y-3">
          {children}
        </div>
      )}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="
        input
        w-full
        transition
      "
    />
  );
}

function PrimaryBtn({ children, ...props }) {
  return (
    <button
      {...props}
      className="
        btn-primary
        transition
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}

function SecondaryBtn({ children, ...props }) {
  return (
    <button
      {...props}
      className="
        btn-secondary
        transition
        disabled:opacity-50
      "
    >
      {children}
    </button>
  );
}