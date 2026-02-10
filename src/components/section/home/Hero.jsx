import { useEffect, useState } from "react";
import Slider3D from "../../ui/home/Slider3D";
import "../../../index.css";

const heroImages = [
  "/img/home-slider/1.jpg",
  "/img/home-slider/2.jpg",
  "/img/home-slider/3.jpg",
];

function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="hero w-full py-20 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:place-items-center lg:grid-cols-2 gap-16 items-center">

        {/* TEXTO CON STAGGER */}
        <div
          className={`
            hero-content max-w-xl flex flex-col
            items-center lg:items-start
            text-center lg:text-left
            transition-all duration-700 ease-out
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          <h1
            className={`
              text-4xl md:text-6xl font-semibold tracking-tight
              transition-all duration-700 ease-out
              ${visible ? "opacity-100 translate-y-0 delay-100" : "opacity-0 translate-y-4"}
            `}
          >
            Nexus: Tu espacio de aprendizaje y creación
          </h1>

          <p
            className={`
              text-slate-600 text-lg mt-6
              transition-all duration-700 ease-out
              ${visible ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-4"}
            `}
          >
            Libros, coworking y experiencias en un solo lugar.
          </p>

          <a
            href="#servicios"
            className={`
              btn-primary w-fit mt-6
              ${visible ? "opacity-100 translate-y-0 delay-300" : "opacity-0 translate-y-4"}
            `}
          >
            Explorar servicios
          </a>
        </div>

        {/* SLIDER INTACTO */}
        <Slider3D images={heroImages} />

      </div>
    </section>
  );
}

export default Hero;


