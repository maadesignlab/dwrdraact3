import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, CalendarDays, ShoppingBag, Settings, LogOut } from "lucide-react";

function AccountSidebar({ onTabChange, activeTab }) {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const menuItems = [
    { id: "perfil", label: "Mi Perfil", icon: <User size={18} /> },
    { id: "divisor", label: "ACTIVIDAD", isTitle: true },
    { id: "historial-reservas", label: "Mis Reservas", icon: <CalendarDays size={18} /> },
    { id: "historial-compras", label: "Mis Compras", icon: <ShoppingBag size={18} /> },
    { id: "divisor-2", label: "AJUSTES", isTitle: true },
    { id: "preferencias", label: "Preferencias", icon: <Settings size={18} /> }
  ];

  return (
    <div className="flex flex-col justify-between h-full">

      {/* TOP */}
      <nav className="flex flex-col gap-2">

        {menuItems.map((item, index) => {

          if (item.isTitle) {
            return (
              <p
                key={index}
                className="mt-4 mb-2 px-2 text-xs font-bold uppercase tracking-wider text-text-primary/50"
              >
                {item.label}
              </p>
            );
          }

          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                flex items-center gap-3
                w-full
                px-4 py-2.5
                rounded-lg
                text-sm font-medium
                border
                border-inset
                border-border-light/50
                transition-all
                hover:cursor-pointer
                ${
                  isActive
                    ? "btn-secondary bg-brand-200 shadow-md font-semibold "
                    : "text-text-primary hover:bg-bg-fill hover:text-brand"
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}

      </nav>

      {/* BOTTOM */}
      <div className="mt-6 pt-4 border-t border-border-default">

        <button
          onClick={handleLogout}
          className="
            flex items-center gap-3
            w-full
            px-4 py-2.5
            rounded-lg
            cursor-pointer
            text-sm font-medium
            text-red-500
            hover:bg-red-100
            transition
          "
        >
          <LogOut size={18} />
          <span>Salir</span>
        </button>

      </div>
    </div>
  );
}

export default AccountSidebar;