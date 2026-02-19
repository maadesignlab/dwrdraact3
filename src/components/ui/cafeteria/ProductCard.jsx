import { useState } from "react";

const SIZES = [
  { label: "Pequeño", value: "small", extra: 0 },
  { label: "Mediano", value: "medium", extra: 0.5 },
  { label: "Grande", value: "large", extra: 1 },
];

const MILKS = [
  { label: "Entera", value: "entera" },
  { label: "Deslactosada", value: "deslactosada" },
  { label: "Almendra", value: "almendra" },
  { label: "Avena", value: "avena" },
];

function ProductCard({ product, onAddToCart }) {
  const isDrink = product.category === "cafe" || product.category === "te";

  const [size, setSize] = useState(SIZES[0]);
  const [milk, setMilk] = useState(MILKS[0]);

  const finalPrice = isDrink
    ? product.price + size.extra
    : product.price;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      price: finalPrice,
      options: isDrink
        ? {
            size: size.label,
            milk: product.category === "cafe" ? milk.label : null,
          }
        : null,
    });
  };

  return (
    <article className="glass-card p-5">
      <img
        src={product.image}
        alt={product.name}
        className="mb-4 h-40 w-full rounded-lg object-cover"
      />

      <h3 className="text-lg font-semibold text-slate-900">
        {product.name}
      </h3>

      {/* Personalización */}
      {isDrink && (
        <div className="mt-4 space-y-4 text-sm">
          {/* Tamaño */}
          <div>
            <p className="mb-1 font-medium text-slate-700">Tamaño</p>
            <div className="flex gap-2">
              {SIZES.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSize(s)}
                  className={`rounded-full px-3 py-1 transition
                    ${size.value === s.value
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leche (solo café) */}
          {product.category === "cafe" && (
            <div>
              <p className="mb-1 font-medium text-slate-700">Leche</p>
              <select
                value={milk.value}
                onChange={e =>
                  setMilk(MILKS.find(m => m.value === e.target.value))
                }
                className="w-full rounded-md border border-slate-300 px-3 py-2"
              >
                {MILKS.map(m => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Precio + botón */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900">
          ${finalPrice}
        </span>

        <button
          onClick={handleAdd}
          className="btn-primary"
        >
          Añadir
        </button>
      </div>
    </article>
  );
}

export default ProductCard;