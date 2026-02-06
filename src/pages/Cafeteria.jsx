import { useMemo, useState } from "react";
import ProductCard from "../components/ui/cafeteria/ProductCard";
import Cart from "../components/section/cafeteria/Cart";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const PRODUCTS = [
  { id: 1, name: "Espresso", price: 3.5, category: "cafe", image: "/img/menu/1.jpg" },
  { id: 2, name: "Americano", price: 3.8, category: "cafe", image: "/img/menu/2.jpg" },
  { id: 3, name: "Latte", price: 4.5, category: "cafe", image: "/img/menu/3.jpg" },
  { id: 4, name: "Capuccino", price: 4.2, category: "cafe", image: "/img/menu/4.jpg" },

  { id: 5, name: "Té Verde", price: 3.0, category: "te", image: "/img/menu/5.jpg" },
  { id: 6, name: "Té Chai", price: 3.6, category: "te", image: "/img/menu/6.jpg" },

  { id: 7, name: "Croissant", price: 2.8, category: "snack", image: "/img/menu/7.jpg" },
  { id: 8, name: "Muffin Chocolate", price: 3.2, category: "snack", image: "/img/menu/8.jpg" },

  { id: 9, name: "Sandwich Vegetariano", price: 6.5, category: "comida", image: "/img/menu/9.jpg" },
  { id: 10, name: "Ensalada Fresca", price: 7.2, category: "comida", image: "/img/menu/10.jpg" },
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
  { label: "$0 – $3", min: 0, max: 3 },
  { label: "$3 – $5", min: 3, max: 5 },
  { label: "$5 – $8", min: 5, max: 8 },
];

function Cafeteria() {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState(PRICE_RANGES[0]);
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const byCategory = category === "all" || p.category === category;
      const byPrice = p.price >= priceRange.min && p.price <= priceRange.max;
      return byCategory && byPrice;
    });
  }, [category, priceRange]);

  const addToCart = product => {
    setCart(prev => [
      ...prev,
      {
        ...product,
        cartId: crypto.randomUUID(),
        quantity: 1,
      },
    ]);
  };

  const updateQuantity = (cartId, delta) => {
    setCart(prev =>
      prev
        .map(item =>
          item.cartId === cartId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = cartId => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
    <Header />
    <section className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          Menú de la Cafetería
        </h1>
        <p className="mt-2 text-slate-600">
          Explora, filtra y añade productos al carrito
        </p>
      </header>

      {/* Filters */}
      <div className="mb-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            Categorías
          </h3>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(c => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition
                  ${category === c.value
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
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
            {PRICE_RANGES.map(range => (
              <button
                key={range.label}
                onClick={() => setPriceRange(range)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition
                  ${priceRange.label === range.label
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {/* Cart */}
      <Cart
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        total={total}
      />
    </section>

    <Footer />

    </>

  );
}

export default Cafeteria;

