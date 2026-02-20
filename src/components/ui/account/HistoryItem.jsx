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
        glass-card
        p-4
        relative overflow-hidden
        transition
      "
    >
      {/* Imagen */}
      <div className="w-[60px] h-[100px] md:w-[100px] md:h-[140px] rounded-md overflow-hidden shrink-0">
        <img
          src={compra.imagen}
          alt={compra.titulo}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-2">
          <span
            className="
              text-[0.65rem]
              bg-green-100
              text-success
              px-3 py-1
              rounded-full
              font-bold
              uppercase
              mb-3
              md:mb-0
            "
          >
            Completado
          </span>

          <span className="text-sm text-text-primary">
            {fechaFormateada}
          </span>
        </div>

        {/* Body */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-text mb-1">
            {compra.titulo}
          </h3>
          <p className="text-sm text-brand-700">
            Orden #{compra.purchaseId}
          </p>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap justify-between items-end">
          <div>
            <span className="block text-xs text-text-primary">
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
             btn-primary
             text-sm
             mt-4
             lg:mt-0
             
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