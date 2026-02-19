import { useStore } from "../../../context/StoreContext";

function SidebarFilters() {
  const { aplicarFiltro, limpiarFiltros, filtros } = useStore();

  const categorias = ["Drama", "Ficción", "Clásico", "Economía", "Arte y Cultura", "Estilo de vida"];
  const años = ["2002", "2006", "2023", "2024"];

  const toggleFiltro = (key, value) => {
    aplicarFiltro({
      [key]: filtros[key] === value ? "" : value,
      top: ""
    });
  };

  const baseBtn =
    "btn-secondary w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-all duration-200";

  const inactiveBtn =
    "btn-secondary hover:bg-border-hover text-text";

  const activeBtn =
    "bg-brand-200 text-text font-semibold shadow-md";

  return (
    <aside className="w-full">

      <h3 className="text-lg font-extrabold mb-8 tracking-tight">
        Filtros
      </h3>

      {/* Top 10 */}
      <div className="mb-8">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-4">
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
              tipo: ""
            })
          }
        >
          🔥 Top 10 más vendidos
        </button>
      </div>

      {/* Categoría */}
      <div className="mb-8">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-4">
          Categoría
        </h4>

        <div className="flex flex-col gap-2">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`${baseBtn} ${
                filtros.categoria === cat ? activeBtn : inactiveBtn
              }`}
              onClick={() => toggleFiltro("categoria", cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tipo */}
      <div className="mb-8">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-4">
          Tipo
        </h4>

        <div className="flex gap-2 flex-wrap">
          {["libro", "revista"].map(tipo => (
            <button
              key={tipo}
              className={`${baseBtn} ${
                filtros.tipo === tipo ? activeBtn : inactiveBtn
              }`}
              onClick={() => toggleFiltro("tipo", tipo)}
            >
              {tipo === "libro" ? "Libros" : "Revistas"}
            </button>
          ))}
        </div>
      </div>

      {/* Año */}
      <div className="mb-8">
        <h4 className="text-[11px] font-bold uppercase tracking-widest text-text-secondary mb-4">
          Año de publicación
        </h4>

        <select
          className="
            w-full px-4 py-3
            rounded-md
            border border-border-default
            bg-surface
            text-sm
            outline-none
            focus:ring-2 focus:ring-brand
          "
          value={filtros.año}
          onChange={(e) =>
            aplicarFiltro({
              año: filtros.año === e.target.value ? "" : e.target.value,
              top: ""
            })
          }
        >
          <option value="">Todos los años</option>
          {años.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <button
        className="
          w-full mt-2
          border border-dashed border-border-default
          px-4 py-3
          rounded-md
          text-sm
          transition-all
          hover:border-text
          hover:text-text
        "
        onClick={limpiarFiltros}
      >
        Limpiar filtros
      </button>

    </aside>
  );
}

export default SidebarFilters;