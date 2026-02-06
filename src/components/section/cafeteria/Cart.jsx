function Cart({ cart, onUpdateQuantity, onRemove, total }) {
  if (cart.length === 0) return null;

  return (
    <aside className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        Carrito
      </h3>

      <ul className="space-y-4">
        {cart.map(item => (
          <li
            key={item.cartId}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-medium text-slate-900">
                {item.name}
              </p>

              {/* Opciones */}
              {item.options && (
                <ul className="mt-1 text-sm text-slate-600">
                  {item.options.size && (
                    <li>• Tamaño: {item.options.size}</li>
                  )}
                  {item.options.milk && (
                    <li>• Leche: {item.options.milk}</li>
                  )}
                </ul>
              )}

              <p className="mt-1 text-sm text-slate-600">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.cartId, -1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-lg"
              >
                −
              </button>

              <span className="w-6 text-center">
                {item.quantity}
              </span>

              <button
                onClick={() => onUpdateQuantity(item.cartId, 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-lg"
              >
                +
              </button>

              <button
                onClick={() => onRemove(item.cartId)}
                className="ml-3 text-sm font-medium text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between border-t border-slate-300 pt-4">
        <span className="font-semibold text-slate-900">
          Total
        </span>
        <span className="text-lg font-bold text-slate-900">
          ${total.toFixed(2)}
        </span>
      </div>
    </aside>
  );
}

export default Cart;


