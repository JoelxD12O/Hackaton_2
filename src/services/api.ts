

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function getSummary(token: string) {
  console.log("TOKEN ENVIADO:", token);

  const res = await fetch(`${API_BASE_URL}/expenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const msg = await res.text(); // 🔍 captura detalle del error del backend
    console.error("RESPUESTA DEL SERVIDOR:", msg);
    throw new Error("Error al cargar los gastos");
  }

  const json = await res.json();
  console.log("GASTOS RECIBIDOS:", json);

  if (!Array.isArray(json)) throw new Error("La respuesta no es un arreglo");

  const resumen: Record<string, number> = {};

  json.forEach((item) => {
    const categoria = item.expenseCategory?.name;
    const monto = item.amount;
    if (categoria && typeof monto === "number") {
      resumen[categoria] = (resumen[categoria] || 0) + monto;
    }
  });

  return Object.entries(resumen).map(([category, total]) => ({ category, total }));
}
