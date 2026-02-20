import { useCart } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

function BookCard({ libro }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const getImageSrc = (img) => {
    if (!img) return "/placeholder.jpg";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/")) return img;
    return `/${img}`;
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();

    const itemParaCarrito = {
      ...libro,
      bookId: libro.id,
    };

    addToCart(itemParaCarrito);
  };

  return (
    <article
      className="
        relative
        glass-card 
        p-5
        flex flex-col
        transition-all
      "
    >

      {/* BADGE */}
      {libro.masVendido && (
        <span className="
          absolute top-3 left-3
          px-3 py-1
          rounded-full
          text-xs font-semibold
          bg-brand-500
          text-brand
        ">
          Más vendido
        </span>
      )}

      {/* IMAGE */}
      <img
        src={getImageSrc(libro.imagen)}
        alt={libro.titulo}
        onClick={() => navigate(`/library/${libro.id}`)}
        className="
          h-90
          md:h-[260px]
          aspect-[2/3]
          object-cover
          mx-auto
          mt-6 mb-4
          rounded-xl
          cursor-pointer
        "
      />

      {/* TITLE */}
      <h3 className="
        min-h-[3rem]
        flex items-center
        font-semibold
        text-text-primary
        text-base
      ">
        {libro.titulo}
      </h3>

      {/* AUTHOR */}
      <p className="text-sm text-text-primary">
        {libro.autor}
      </p>

      {/* CATEGORY */}
      <p className="text-xs text-brand-700 mb-3">
        {libro.categoria}
      </p>

      {/* PRICE */}
      <p className="
        text-lg font-bold
        text-text-primary
        mt-auto
        mb-4
      ">
        ${libro.precio.toLocaleString()}
      </p>

      {/* BUTTON DETAIL */}
      <button
        onClick={() => navigate(`/library/${libro.id}`)}
        className="
          btn-primary
          w-full
          py-2
          rounded-lg
          text-sm font-semibold
          mt-3
          transition
        "
      >
        Ver detalle
      </button>

      {/* BUTTON CART */}
      <button
        onClick={handleAddToCart}
        className="
          btn-primary
          w-full
          py-2
          rounded-lg
          text-sm font-semibold
          mt-3
          transition
        "
      >
        Añadir al carrito
      </button>

    </article>
  );
}

export default BookCard;
