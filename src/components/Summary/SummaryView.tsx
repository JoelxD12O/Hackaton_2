type SummaryItem = {
  category: string;
  total: number;
};

export default function SummaryView({ data }: { data: SummaryItem[] }) {
  console.log("DATOS RECIBIDOS EN SummaryView:", data);

  if (data.length === 0) {
    return <p>No hay gastos para mostrar.</p>;
  }

  return (
    <div>
      <h2>Resumen de Gastos</h2>
      <ul>
        {data.map((item, index) =>
          item?.category && typeof item.total === "number" ? (
            <li key={index}>
              {item.category}: S/. {item.total.toFixed(2)}
            </li>
          ) : (
            <li key={index} style={{ color: "red" }}>
              Categoría inválida
            </li>
          )
        )}
      </ul>
    </div>
  );
}