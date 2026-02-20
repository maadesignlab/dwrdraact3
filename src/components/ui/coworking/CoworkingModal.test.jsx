import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import CoworkingModal from "./CoworkingModal";

const mockSpace = {
  nombre: "Sala Norte",
  tipo: "Sala de reuniones",
  capacidad: 6,
  ubicacion: "Piso 2",
  ocupado: true,
};

describe("CoworkingModal", () => {
  test("no renderiza nada si space es null", () => {
    const { container } = render(
      <CoworkingModal
        space={null}
        onClose={vi.fn()}
        onStartBooking={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  test("renderiza la información del espacio", () => {
    render(
      <CoworkingModal
        space={mockSpace}
        onClose={vi.fn()}
        onStartBooking={vi.fn()}
      />
    );

    expect(screen.getByText("Sala Norte")).toBeInTheDocument();
    expect(screen.getByText("Sala de reuniones")).toBeInTheDocument();
    expect(screen.getByText("6 personas")).toBeInTheDocument();
    expect(screen.getByText("Piso 2")).toBeInTheDocument();
    expect(screen.getByText("Ocupado ahora")).toBeInTheDocument();
  });

  test("deshabilita horarios cuando está ocupado (excepto 17:00h)", () => {
    render(
      <CoworkingModal
        space={mockSpace}
        onClose={vi.fn()}
        onStartBooking={vi.fn()}
      />
    );

    const noDisponibleButtons = screen.getAllByText("No disponible");
    const reservarButtons = screen.getAllByText("Reservar");

    expect(noDisponibleButtons.length).toBe(2);
    expect(reservarButtons.length).toBe(1);
  });

  test("llama a onStartBooking con la hora correcta", () => {
    const mockBooking = vi.fn();

    render(
      <CoworkingModal
        space={mockSpace}
        onClose={vi.fn()}
        onStartBooking={mockBooking}
      />
    );

    fireEvent.click(screen.getByText("Reservar"));

    expect(mockBooking).toHaveBeenCalledWith("17:00h");
  });

  test("llama a onStartBooking con null al reservar otro horario", () => {
    const mockBooking = vi.fn();

    render(
      <CoworkingModal
        space={mockSpace}
        onClose={vi.fn()}
        onStartBooking={mockBooking}
      />
    );

    fireEvent.click(
      screen.getByText("Reservar en otro horario o fecha")
    );

    expect(mockBooking).toHaveBeenCalledWith(null);
  });

  test("llama a onClose al hacer click en el botón cerrar", () => {
    const mockClose = vi.fn();

    render(
      <CoworkingModal
        space={mockSpace}
        onClose={mockClose}
        onStartBooking={vi.fn()}
      />
    );

    fireEvent.click(screen.getByLabelText("Cerrar modal"));

    expect(mockClose).toHaveBeenCalled();
  });
});