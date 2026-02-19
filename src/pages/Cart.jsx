import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce(
    (acc, item) =>
      acc + Number(item.precio || 0) * Number(item.cantidad || 0),
    0
  );

  if (!cart.length) {
    return (
      <>
        <Header />
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-2xl font-semibold text-text-secondary mb-6">
            Tu carrito está vacío
          </h2>
          <Link
            to="/library"
            className="underline font-semibold hover:text-brand transition"
          >
            Explorar librería
          </Link>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-5 py-8">
        <h1 className="text-3xl font-bold mb-8 border-b border-border-default pb-4">
          Carrito
        </h1>

        <ul className="space-y-6">
          {cart.map(item => {
            const precio = Number(item.precio || 0);
            const cantidad = Number(item.cantidad || 0);
            const subtotal = precio * cantidad;

            const etiqueta =
              item.tipo === "cafeteria" ? "☕ Cafetería" : "📚 Libro";

            return (
              <li
                key={item.bookId}
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border-default pb-6"
              >
                <div className="flex gap-5 flex-1">
                  <img
                    src={`/${item.imagen}`}
                    alt={item.titulo}
                    className="w-20 h-28 object-cover rounded-md shadow-sm"
                  />

                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-xs text-slate-500">
                      {etiqueta}
                    </span>

                    <strong className="text-lg">
                      {item.titulo}
                    </strong>

                    <span className="text-text-secondary text-sm">
                      {item.autor}
                    </span>

                    <strong className="text-brand">
                      ${precio.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQty(item.bookId)}
                    className="w-8 h-8 border border-border-default rounded-md font-bold hover:bg-brand hover:text-white transition"
                  >
                    -
                  </button>

                  <span className="font-bold w-6 text-center">
                    {cantidad}
                  </span>

                  <button
                    onClick={() => increaseQty(item.bookId)}
                    className="w-8 h-8 border border-border-default rounded-md font-bold hover:bg-brand hover:text-white transition"
                  >
                    +
                  </button>
                </div>

                <span className="font-bold text-lg md:w-32 text-right">
                  ${subtotal.toLocaleString()}
                </span>
              </li>
            );
          })}
        </ul>
      </main>

      {/* 🔥 BARRA STICKY INFERIOR */}
      <div
        className="
        sticky bottom-0
        w-full
        bg-brand-100
        border-t border-border-default
        shadow-sm
        z-50
      "
      >
        <div
          className="
          max-w-4xl
          mx-auto
          flex
          justify-between
          items-center
          px-6 py-4
        "
        >
          <div className="flex flex-col">
            <span className="font-bold text-text-primary">
              TOTAL:
            </span>
            <span className="text-xl font-extrabold text-text">
              $ {total.toLocaleString()}
            </span>
          </div>

          <Link
            to="/payment"
            className="btn-primary rounded-md font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Finalizar compra
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cart;



