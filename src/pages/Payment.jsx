import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PaymentForm from "../components/section/payment/PaymentForm";
import { useCart } from "../context/CartContext";

function Payment() {
  const { cart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="flex flex-col ">
      <Header />

      <main className="flex-1">
        <PaymentForm />
      </main>

      {/* Barra Sticky Inferior */}
      <div className="
        sticky bottom-0
        w-full
        bg-brand-100
        border-t border-border-default
        shadow-sm
        z-50
      ">
        <div className="
          max-w-4xl
          mx-auto
          flex
          justify-between
          items-center
          px-6 py-4
        ">
          <span className="font-bold text-text-primary">
            TOTAL A PAGAR:
          </span>

          <span className="text-xl font-extrabold text-text">
            $ {total.toLocaleString()}
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Payment;