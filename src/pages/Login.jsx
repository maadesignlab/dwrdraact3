import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useStore } from "../context/StoreContext";
import { House } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const { loadStoreData } = useStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      await loadStoreData();
      navigate("/dashboard");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
    }
  };

  return (
    <section className="min-h-dvh flex items-center justify-center px-4">
      
      <div className="relative w-full max-w-md bg-slate-100 border border-border-light shadow-card rounded-3xl p-8 sm:p-10 animate-fade-up">

        <button
          onClick={() => navigate("/home")}
          className="btn-primary flex items-center gap-2"
        >
          <House size={18} />
          Home
        </button>

        <div className="flex justify-center my-8">
          <img src="/img/nexus.svg" alt="Nexus" className="w-36" />
        </div>

        <h2 className="text-2xl font-semibold text-center text-brand mb-8">
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-text-primary">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Usuario"
              className="input w-full text-sm"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-text-primary">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="input w-full text-sm"
            />
          </div>

          {error && (
            <p className="text-sm text-error text-center">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-1 mt-4 p-4 bg-brand-100 border border-border-light rounded-lg text-xs text-text-primary">
            <p className="font-medium text-text-primary">
              Credenciales de acceso:
            </p>
            <p>
              <strong>Usuario:</strong> stiven@gmail.com
            </p>
            <p>
              <strong>Contraseña:</strong> 12345678
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Autenticando..." : "Entrar"}
          </button>

        </form>
      </div>
    </section>
  );
}

export default Login;
