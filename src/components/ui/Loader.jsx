export default function Loader({ text = "Cargando..." }) {
  return (
    <div className="
      min-h-[60vh]
      flex flex-col
      items-center
      justify-center
      gap-4
    ">

      {/* Spinner */}
      <div className="
        w-10 h-10
        rounded-full
        border-4
        border-border-light
        border-t-border-default
        animate-spin
      "></div>

      {/* Texto */}
      <span className="text-sm text-text-primary">
        {text}
      </span>

    </div>
  );
}
