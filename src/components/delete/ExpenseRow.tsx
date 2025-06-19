// src/components/delete/ExpenseRow.tsx
import { type FC } from "react";
import { Trash2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useExpensesContext, type RawSummaryEntry } from "../../contexts/ExpensesContext";

interface ExpenseRowProps {
  entry: RawSummaryEntry & { date: string; amount: number };
  onDelete?: () => void;        // ← nuevo prop opcional
}

export const ExpenseRow: FC<ExpenseRowProps> = ({ entry, onDelete }) => {
  const { token }   = useAuth();
  const { refetch } = useExpensesContext();

  const handleDelete = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar este gasto?")) return;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/expenses/${entry.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error(await res.text());

      // si nos pasan onDelete, lo llamamos,
      // si no, hacemos el refetch global de summary
      if (onDelete) {
        onDelete();
      } else {
        refetch();
      }
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el gasto.");
    }
  };

  return (
    <tr>
      <td className="px-4 py-2">{entry.date}</td>
      <td className="px-4 py-2 text-right">{entry.amount.toFixed(2)}</td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={handleDelete}
          className="hover:text-red-600 focus:outline-none"
          title="Eliminar gasto"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
};
