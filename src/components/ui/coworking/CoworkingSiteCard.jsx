function CoworkingSiteCard({ space, onClick }) {
  if (!space) return null;

  const estaOcupado = space.ocupado;

  return (
    <article
      onClick={onClick}
      className="
        relative
        glass-card p-5
        shadow-sm
        flex flex-col gap-4
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-lg
        cursor-pointer
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text">
          {space.nombre}
        </h3>
      </div>

      {/* Tipo */}
      <span className="
        bg-brand-500
        text-text
        text-sm
        px-3 py-1
        rounded-full
        w-fit
      ">
        {space.tipo}
      </span>

      {/* Info */}
      <ul className="text-sm text-text-primary">
        <li>👥 Capacidad: {space.capacidad} personas</li>
      </ul>

      <hr className="border-border-default" />

      {/* Estado */}
      <span
        className={`
          px-3 py-1
          text-sm
          rounded-full
          w-fit
          font-medium
          ${
            estaOcupado
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
          }
        `}
      >
        {estaOcupado ? "Ocupado" : "Disponible"}
      </span>
    </article>
  );
}

export default CoworkingSiteCard;