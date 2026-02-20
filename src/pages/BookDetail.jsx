import { useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useCart } from "../context/CartContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function BookDetail() {
  const { id } = useParams();
  const { libros } = useStore();
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);

  const book = libros.find(item => item.id === Number(id));

  if (!book) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <p className="text-text-secondary">Cargando...</p>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    const itemParaCarrito = {
      ...book,
      bookId: book.id,
    };
    addToCart(itemParaCarrito, cantidad);
  };

  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-5 py-8 flex items-center justify-center">

        <div className="
          w-full
          grid grid-cols-1 md:grid-cols-[300px_1fr]
          gap-10
          bg-surface
          p-8
          rounded-2xl
          shadow-lg
          border border-border-light
        ">

          {/* Imagen */}
          <div className="flex md:block justify-center">
            <img
              src={`/${book.imagen}`}
              alt={book.titulo}
              className="
                w-full
                max-w-[280px] md:max-w-full
                aspect-[2/3]
                object-cover
                rounded-lg
                shadow-xl
              "
            />
          </div>

          {/* Información */}
          <section className="flex flex-col">

            <span className="
              bg-brand-500
              text-text
              px-3 py-1
              rounded-full
              text-xs
              font-bold
              uppercase
              w-fit
              mb-4
            ">
              {book.categoria}
            </span>

            <h1 className="text-4xl font-bold leading-tight mb-2">
              {book.titulo}
            </h1>

            <p className="text-lg text-text-primary mb-6">
              {book.autor}
            </p>

            <p className="text-3xl font-extrabold text-brand mb-6">
              ${book.precio.toLocaleString()}
            </p>

            <p className="text-base leading-relaxed text-text- primary mb-8">
              {book.sinopsis}
            </p>

            {/* Compra */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">

              <div className="
                flex items-center
                justify-center
                w-fit
                border-2 border-border-default
                rounded-md
                h-12
              ">
                <button
                  onClick={() => setCantidad(c => Math.max(1, c - 1))}
                  className="w-12 h-full flex items-center justify-center text-lg hover:bg-border-hover transition"
                >
                  −
                </button>

                <span className="w-10 text-center font-bold">
                  {cantidad}
                </span>

                <button
                  onClick={() => setCantidad(c => c + 1)}
                  className="w-12 h-full flex items-center justify-center text-lg hover:bg-border-hover transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="
                  btn-primary
                  flex-1
                  h-12
                  font-semibold
                  rounded-md
                  transition-all
                  hover:shadow-lg
                "
              >
                Añadir al carrito
              </button>

            </div>

            <div className="h-px bg-border-default mb-6"></div>

            {/* Metadata */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-text-primary">
              <li><strong className="text-text">Editorial:</strong> {book.editorial}</li>
              <li><strong className="text-text">Año:</strong> {book.año}</li>
              <li><strong className="text-text">Páginas:</strong> {book.paginas}</li>
              <li><strong className="text-text">ISBN:</strong> {book.codigo}</li>
            </ul>

          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default BookDetail;