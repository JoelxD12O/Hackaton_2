import { useAuth } from "../contexts/AuthContext";
import { useSummary } from "../hooks/useSummary";
import SummaryView from "../components/Summary/SummaryView";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { summary, loading } = useSummary(token!);

  if (loading) return <p>Cargando resumen de gastos...</p>;
  if (!summary || summary.length === 0) return <p>No hay datos disponibles.</p>;

  return (
    <div>
      <h1>Bienvenido a Ahorrista</h1>
      <SummaryView data={summary} />
      <div className="mt-6">
        <button
          onClick={() => navigate('/detail')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Ver detalle de gastos por categoría
        </button>
      </div>
    </div>
  );
}
