function CoworkingModal({ space, onClose, onStartBooking }) {
  if (!space) return null;

  const isOccupiedNow = space.ocupado;
  const horariosHoy = ["12:00h", "13:00h", "17:00h"];

  return (
    <div
      className="
        fixed inset-0
        bg-black/50 backdrop-blur-sm
        flex items-center justify-center
        z-50
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          bg-slate-100
          w-[94%] max-w-2xl
          rounded-2xl
          shadow-2xl
          p-8
          grid
          gap-8
          md:grid-cols-2
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
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

        {/* Header */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold">
            {space.nombre}
          </h2>
        </div>

        {/* Info */}
        <ul className="space-y-3 text-sm text-text-primary">
          <li className="border border-border-default rounded-lg p-3">
            <strong className="text-text">Tipo:</strong> {space.tipo}
          </li>

          <li className="border border-border-default rounded-lg p-3">
            <strong className="text-text">Capacidad:</strong> {space.capacidad} personas
          </li>

          <li className="border border-border-default rounded-lg p-3">
            <strong className="text-text">Ubicación:</strong> {space.ubicacion}
          </li>

          <li className="border border-border-default rounded-lg p-3">
            <strong className="text-text">Estado:</strong>{" "}
            <span
              className={
                isOccupiedNow
                  ? "text-red-500 font-semibold"
                  : "text-green-500 font-semibold"
              }
            >
              {isOccupiedNow ? "Ocupado ahora" : "Disponible"}
            </span>
          </li>
        </ul>

        {/* Horarios */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">
            Próximos horarios disponibles
          </h3>

          <div className="space-y-3">
            <h4 className="text-sm text-text-primary">Hoy</h4>

            {horariosHoy.map((hora) => {
              const isSlotAvailable =
                hora === "17:00h" || !isOccupiedNow;

              return (
                <div
                  key={hora}
                  className="
                    flex items-center justify-between
                    border border-border-default
                    rounded-lg
                    px-4 py-3
                  "
                >
                  <p className="font-medium">{hora}</p>

                  <button
                    disabled={!isSlotAvailable}
                    onClick={() => onStartBooking(hora)}
                    className={`
                      btn-primary
                      px-4 py-2 text-sm font-semibold
                      transition-all
                      ${
                        isSlotAvailable
                          ? "hover:shadow-md"
                          : "bg-border-default/60 text-text-secondary cursor-not-allowed"
                      }
                    `}
                  >
                    {isSlotAvailable ? "Reservar" : "No disponible"}
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => onStartBooking(null)}
            className="
              btn-primary
              w-full mt-4
              text-brand
              py-3
              font-semibold
              transition
            "
          >
            Reservar en otro horario o fecha
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoworkingModal;