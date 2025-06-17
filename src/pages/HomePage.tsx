import { useAuth } from "../contexts/AuthContext";
import { useSummary } from "../hooks/useSummary";
import SummaryView from "../components/Summary/SummaryView";

export default function Homepage() {
  const { token } = useAuth();
  const { summary, loading } = useSummary(token!);

  if (loading) return <p>Cargando resumen de gastos...</p>;
  if (!summary || summary.length === 0) return <p>No hay datos disponibles.</p>;

  return (
    <div>
      <h1>Bienvenido a Ahorrista</h1>
      <SummaryView data={summary} />
    </div>
  );
}
