import { useState, useMemo } from "react";

function Slider3D({ images = [] }) {
  const [active, setActive] = useState(0);

  const visibleSlides = useMemo(() => {
    const prev = (active - 1 + images.length) % images.length;
    const next = (active + 1) % images.length;

    return [
      { index: prev, position: "left" },
      { index: active, position: "center" },
      { index: next, position: "right" },
    ];
  }, [active, images.length]);

  if (!images.length) return null;

  return (
    <div
      className="relative w-full h-[420px] md:h-[520px] lg:h-[600px]"
      style={{ perspective: "1000px" }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {visibleSlides.map(({ index, position }) => {
          const transformMap = {
            left: "translateX(-150px) rotateY(18deg) scale(0.92)",
            center: "translateX(0) rotateY(0deg) scale(1)",
            right: "translateX(150px) rotateY(-18deg) scale(0.92)",
          };

          const sizeMap = {
            center: "w-[420px] h-[260px] md:w-[520px] md:h-[320px]",
            left: "w-[360px] h-[220px] md:w-[440px] md:h-[260px]",
            right: "w-[360px] h-[220px] md:w-[440px] md:h-[260px]",
          };

          const isActive = position === "center";

          return (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`
                absolute cursor-pointer
                ${sizeMap[position]}
                rounded-3xl overflow-hidden
                will-change-transform
                transition-transform duration-200 ease-out
                ${isActive ? "ring-1 ring-white/30" : ""}
              `}
              style={{
                transform: transformMap[position],
                zIndex: isActive ? 10 : 1,
                boxShadow: isActive
                  ? "0 0 0 1px rgba(255,255,255,.25), 0 20px 60px rgba(0,0,0,.35)"
                  : "0 10px 30px rgba(0,0,0,.25)",
              }}
            >
              <img
                src={images[index]}
                alt=""
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Slider3D;
