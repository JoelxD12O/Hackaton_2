type SummaryItem = {
  category: string;
  total: number;
};

export default function SummaryView({ data }: { data: SummaryItem[] }) {
  return (
    <div>
      <h2>Resumen de Gastos</h2>
      <ul>
        {data.map((item) => (
          <li key={item.category}>
            {item.category}: S/. {item.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
