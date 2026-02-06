import Slider3D from "../../ui/home/Slider3D";

const heroImages = [
  "/img/library-bg.jpg",
  "/img/library-bg.jpg",
  "/img/library-bg.jpg",
];

function Hero() {
  return (
    <section className="hero w-full">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="hero-content max-w-xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Nexus: Tu espacio de aprendizaje y creación
          </h1>
          <p className="text-slate-600 text-lg">
            Libros, coworking y experiencias en un solo lugar.
          </p>
          <a href="#servicios" className="btn-primary w-fit">
            Explorar servicios
          </a>
        </div>

        <Slider3D images={heroImages} />
      </div>
    </section>
  );
}

export default Hero;

