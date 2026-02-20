import { useStore } from "../../../context/StoreContext";

function SidebarFilters() {
  const { aplicarFiltro, limpiarFiltros, filtros } = useStore();

  const categorias = [
    "Drama",
    "Ficción",
    "Clásico",
    "Economía",
    "Arte y Cultura",
    "Estilo de vida",
  ];

  const años = ["2002", "2006", "2023", "2024"];

  const toggleFiltro = (key, value) => {
    aplicarFiltro({
      [key]: filtros[key] === value ? "" : value,
      top: "",
    });
  };

  const baseBtn =
    "w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 border";

  const inactiveBtn =
    "border-border-light/50 hover:bg-border-hover text-text";

  const activeBtn =
    "bg-brand-200 border-brand-300 text-text font-semibold shadow-md";

  return (
    <aside className="w-full h-full flex flex-col">

      {/* HEADER FIJO */}
      <div className="pb-6 border-b border-border-default">
        <h3 className="text-lg font-extrabold tracking-tight">
          Filtros
        </h3>
      </div>

      {/* CONTENIDO SCROLLEABLE */}
      <div className="flex-1 overflow-y-auto py-6 pr-2 scrollbar-custom">

        {/* DESTACADOS */}
        <div className="mb-8">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-primary/50 mb-4">
            Destacados
          </h4>

          <button
            className={`${baseBtn} ${
              filtros.top === "top10" ? activeBtn : inactiveBtn
            }`}
            onClick={() =>
              aplicarFiltro({
                top: filtros.top === "top10" ? "" : "top10",
                categoria: "",
                año: "",
                tipo: "",
              })
            }
          >
            🔥 Top 10 más vendidos
          </button>
        </div>

        {/* CATEGORÍAS */}
        <div className="mb-8">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-primary/50 mb-4">
            Categoría
          </h4>

          <div className="space-y-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleFiltro("categoria", cat)}
                className={`${baseBtn} ${
                  filtros.categoria === cat ? activeBtn : inactiveBtn
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* AÑO */}
        <div className="mb-8">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-primary/50 mb-4">
            Año
          </h4>

          <div className="space-y-2">
            {años.map((año) => (
              <button
                key={año}
                onClick={() => toggleFiltro("año", año)}
                className={`${baseBtn} ${
                  filtros.año === año ? activeBtn : inactiveBtn
                }`}
              >
                {año}
              </button>
            ))}
          </div>
        </div>

        {/* LIMPIAR */}
        <div className="pt-4 border-t border-border-default">
          <button
            onClick={limpiarFiltros}
            className="w-full text-sm font-semibold text-brand-600 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>

      </div>
    </aside>
  );
}

export default SidebarFilters;