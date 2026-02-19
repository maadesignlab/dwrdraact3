import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ui/cafeteria/ProductCard";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useCart } from "../context/CartContext";

/* 🔥 FORMATEADOR MONEDA COLOMBIANA */
const formatCOP = (value) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(Number(value) || 0);

/* 💰 PRECIOS */
const PRODUCTS = [
  { id: 1, name: "Espresso", price: 4000, category: "cafe", image: "/img/menu/1.jpg" },
  { id: 2, name: "Americano", price: 4500, category: "cafe", image: "/img/menu/2.jpg" },
  { id: 3, name: "Latte", price: 6500, category: "cafe", image: "/img/menu/3.jpg" },
  { id: 4, name: "Capuccino", price: 6200, category: "cafe", image: "/img/menu/4.jpg" },
  { id: 5, name: "Té Verde", price: 4500, category: "te", image: "/img/menu/5.jpg" },
  { id: 6, name: "Té Chai", price: 5500, category: "te", image: "/img/menu/6.jpg" },
  { id: 7, name: "Croissant", price: 5000, category: "snack", image: "/img/menu/7.jpg" },
  { id: 8, name: "Muffin Chocolate", price: 6000, category: "snack", image: "/img/menu/8.jpg" },
  { id: 9, name: "Sandwich Vegetariano", price: 14000, category: "comida", image: "/img/menu/9.jpg" },
  { id: 10, name: "Ensalada Fresca", price: 16000, category: "comida", image: "/img/menu/10.jpg" },
];

const CATEGORIES = [
  { label: "Todos", value: "all" },
  { label: "Cafés", value: "cafe" },
  { label: "Tés", value: "te" },
  { label: "Snacks", value: "snack" },
  { label: "Comidas", value: "comida" },
];

const PRICE_RANGES = [
  { label: "Todos", min: 0, max: Infinity },
  { label: "$0 – $5.000", min: 0, max: 5000 },
  { label: "$5.000 – $10.000", min: 5000, max: 10000 },
  { label: "$10.000 – $20.000", min: 10000, max: 20000 },
];

function Cafeteria() {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);

  const { cart, addToCart, increaseQty, decreaseQty, removeFromCart } =
    useCart();

  /* 🔥 FILTRADO */
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const byCategory = category === "all" || p.category === category;
      const byPrice =
        Number(p.price) >= priceRange.min &&
        Number(p.price) <= priceRange.max;
      return byCategory && byPrice;
    });
  }, [category, priceRange]);

  /* 🔥 AGREGAR AL CARRITO */
  const handleAddToCart = (product) => {
    addToCart(
      {
        bookId: `caf-${product.id}`,
        titulo: product.name,
        autor: "Cafetería",
        imagen: product.image.replace("/", ""),
        precio: Number(product.price),
        tipo: "cafeteria",
      },
      1
    );
  };

  /* 🔥 TOTAL COMO NÚMERO */
  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price = Number(item.precio) || 0;
      const qty = Number(item.cantidad) || 0;
      return sum + price * qty;
    }, 0);
  }, [cart]);

  return (
    <>
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">
            Menú de la Cafetería
          </h1>
          <p className="mt-2 text-slate-600">
            Explora, filtra y añade productos al carrito
          </p>
        </header>

        {/* FILTROS */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
              Categorías
            </h3>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition
                  ${
                    category === c.value
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-700">
              Precios
            </h3>
            <div className="flex flex-wrap gap-3">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.label}
                  onClick={() => setPriceRange(range)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition
                  ${
                    priceRange.label === range.label
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PRODUCTOS */}
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard
                  product={{
                    ...product,
                    formattedPrice: formatCOP(product.price),
                  }}
                  onAddToCart={handleAddToCart}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <Footer />
    </>
  );
}

export default Cafeteria;


