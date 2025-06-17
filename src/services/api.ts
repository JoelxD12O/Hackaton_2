export async function getSummary(token: string) {
  const res = await fetch("http://198.211.105.95:8080/expenses_summary", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al cargar el resumen");

  return await res.json();
}
