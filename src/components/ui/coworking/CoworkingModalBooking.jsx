import React, { useState } from "react";
import { useLoader } from "../../../hooks/useLoader";
import Stepper from "../../../components/ui/Stepper";

function BookingFlow({ space, onClose, selectedHour }) {
  const [step, setStep] = useState(selectedHour ? 2 : 1);

  const [bookingData, setBookingData] = useState({
    hora: selectedHour ? selectedHour.replace("h", "") : "",
    celular: "",
    notas: "",
  });

  const horariosDisponibles = [
    "08:00","09:00","10:00","11:00","12:00","13:00",
    "14:00","15:00","16:00","17:00","18:00","19:00",
  ];

  const { isLoading, startLoading } = useLoader(false);
  const ocupados = space.horariosOcupados || [];

  const handleConfirm = () => {
    startLoading(2000);
    setTimeout(() => {
      alert(`¡Reserva Exitosa en ${space.nombre} a las ${bookingData.hora}h!`);
      onClose();
      window.location.href = "/dashboard";
    }, 2100);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center z-50">
          <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white font-medium">Procesando tu reserva...</p>
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-slate-100 w-[95%] max-w-2xl rounded-2xl shadow-2xl p-8 space-y-8"
      >
        <button
          onClick={onClose}
          className="
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
          "
        >
          ×
        </button>

        {/* Stepper */}
        <Stepper
          step={step}
          clickable={false}
          onChange={(s) => !isLoading && setStep(s)}
        />

        {/* STEP 1 */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Selecciona tu horario</h2>
            <p className="text-sm text-text-primary">
              Espacio: <strong>{space.nombre}</strong>
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {horariosDisponibles.map(h => {
                const ocupado = ocupados.includes(h);
                return (
                  <button
                    key={h}
                    disabled={ocupado}
                    onClick={() => setBookingData({...bookingData, hora: h})}
                    className={`
                      border border-border-default
                      cursor-pointer
                      py-2 rounded-lg text-sm font-medium transition
                      ${
                        bookingData.hora === h
                          ? "bg-brand-200 border border-brand-700  text-text-primary font-semibold"
                          : ocupado
                            ? "bg-border-default text-text-secondary cursor-not-allowed"
                            : "bg-brand/20 hover:bg-brand-100 hover:text-text-primary"
                      }
                    `}
                  >
                    {h}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={onClose}
                className="btn-secondary flex-1 py-2"
              >
                Cancelar
              </button>
              <button
                disabled={!bookingData.hora}
                onClick={() => setStep(2)}
                className="flex-1 btn-primary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Detalles de contacto</h2>
            <p className="text-sm">
              Horario elegido: <strong>{bookingData.hora}h</strong>
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-text-primary">
                  Número celular alternativo
                </label>
                <input
                  type="tel"
                  value={bookingData.celular}
                  onChange={(e) =>
                    setBookingData({...bookingData, celular: e.target.value})
                  }
                  className="input w-full mt-1"
                />
              </div>

              <div>
                <label className="text-sm text-text-primary">
                  ¿Alguna necesidad especial?
                </label>
                <textarea
                  value={bookingData.notas}
                  onChange={(e) =>
                    setBookingData({...bookingData, notas: e.target.value})
                  }
                  className="input w-full mt-1"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 btn-secondary py-2"
              >
                Atrás
              </button>
              <button
                disabled={!bookingData.celular}
                onClick={() => setStep(3)}
                className="flex-1 btn-primary py-2 disabled:opacity-50"
              >
                Revisar
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Revisa tu reserva</h2>

            <div className="border-l-4 border border-border-default bg-brand/10 p-4 rounded-md space-y-2 text-sm">
              <p><strong>Ubicación:</strong> {space.ubicacion}</p>
              <p><strong>Espacio:</strong> {space.nombre}</p>
              <p><strong>Hora:</strong> {bookingData.hora}h</p>
              <p><strong>Contacto:</strong> {bookingData.celular}</p>
              <p><strong>Notas:</strong> {bookingData.notas || "Ninguna"}</p>
            </div>

            <p className="text-xs text-brand-700">
              Al confirmar, aceptas las normas de Nexus.
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 btn-secondary py-2"
              >
                Atrás
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 btn-primary py-2 transition"
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default BookingFlow;