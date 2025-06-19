// src/components/Modal/AddExpenseModal.tsx
import { type FC, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const categories = [
  { id: 1,  name: "Alimentación" },
  { id: 2,  name: "Transporte" },
  { id: 3,  name: "Vivienda" },
  { id: 4,  name: "Servicios (agua, luz, internet)" },
  { id: 5,  name: "Educación" },
  { id: 6,  name: "Salud" },
  { id: 7,  name: "Entretenimiento" },
  { id: 8,  name: "Ropa y calzado" },
  { id: 9,  name: "Ahorros" },
  { id: 10, name: "Impuestos" },
  { id: 11, name: "Mascotas" },
  { id: 12, name: "Viajes" },
  { id: 13, name: "Donaciones" },
  { id: 14, name: "Seguros" },
  { id: 15, name: "Hijos y familia" },
  { id: 16, name: "Gimnasio y deporte" },
  { id: 17, name: "Tecnología y gadgets" },
  { id: 18, name: "Mantenimiento del hogar" },
  { id: 19, name: "Bebidas y snacks" },
  { id: 20, name: "Otros gastos personales" },
];

export const AddExpenseModal: FC<AddExpenseModalProps> = ({
  isOpen,
  onClose,
  onSaved,
}) => {
  const { token } = useAuth();
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setDate(new Date().toISOString().slice(0, 10));
      setAmount("");
      setCategoryId("");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Debes iniciar sesión para agregar un gasto.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/expenses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: parseFloat(amount),
            date,
            category: { id: Number(categoryId) },
          }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        console.error("Error response:", text);
        throw new Error("Error al guardar el gasto");
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("No se pudo guardar el gasto.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Nuevo gasto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Monto</label>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Fecha</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block mb-1">Categoría</label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded px-2 py-1"
            >
              <option value="">Selecciona...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-red-500 text-white"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
