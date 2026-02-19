function HistoryItem({ compra }) {
  if (!compra) return null;

  const fechaFormateada = new Date(compra.fechaCompra).toLocaleDateString(
    "es-ES",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <article
      className="
        flex gap-5
        bg-surface
        border border-border-default
        rounded-3xl
        p-4
        relative overflow-hidden
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-md
        hover:border-accent
      "
    >
      {/* Imagen */}
      <div className="w-[100px] h-[140px] rounded-2xl overflow-hidden shrink-0">
        <img
          src={compra.imagen}
          alt={compra.titulo}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <span
            className="
              text-[0.65rem]
              bg-green-100
              text-success
              px-3 py-1
              rounded-full
              font-bold
              uppercase
            "
          >
            Completado
          </span>

          <span className="text-sm text-text-secondary">
            {fechaFormateada}
          </span>
        </div>

        {/* Body */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-text mb-1">
            {compra.titulo}
          </h3>
          <p className="text-sm text-text-secondary">
            Orden #{compra.purchaseId}
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-end">
          <div>
            <span className="block text-xs text-text-secondary">
              Precio total
            </span>
            <span className="text-xl font-extrabold text-primary">
              ${compra.precioPagado.toLocaleString()}
            </span>
          </div>

          <button
            onClick={() =>
              console.log("Ver detalle de:", compra.purchaseId)
            }
            className="
              bg-border-default
              px-4 py-2
              rounded-xl
              text-sm font-semibold
              transition
              hover:bg-accent
            "
          >
            Ver detalles
          </button>
        </div>
      </div>
    </article>
  );
}

export default HistoryItem;