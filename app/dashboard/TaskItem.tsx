"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TaskItemProps {
  id: number;
  title: string;
}

export default function TaskItem({ id, title }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Eliminar tarea
  const handleDelete = async () => {
    if (!confirm("¿Seguro que quieres eliminar esta tarea?")) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al eliminar la tarea");
      } else {
        router.refresh();
      }
    } catch {
      setError("Error al eliminar la tarea");
    } finally {
      setLoading(false);
    }
  };

  // Guardar edición
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title: editTitle })
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error al actualizar la tarea");
      } else {
        setIsEditing(false);
        router.refresh();
      }
    } catch {
      setError("Error al actualizar la tarea");
    } finally {
      setLoading(false);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleEdit} className="bg-white p-4 rounded-lg shadow-md border w-full max-w-md mx-auto space-y-3">
        <input
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md text-sm"
          disabled={loading}
          required
          placeholder="Editar título de tarea"
        />
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded-md text-sm hover:bg-green-700 transition"
            disabled={loading}
          >
            Guardar
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-1 rounded-md text-sm hover:bg-gray-500 transition"
            onClick={() => setIsEditing(false)}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border w-full max-w-md mx-auto mb-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-800 text-base font-medium">{title}</span>
        <div className="flex gap-2">
          <button
            className="text-yellow-600 hover:text-yellow-700 text-sm font-semibold"
            onClick={() => setIsEditing(true)}
            disabled={loading}
          >
            ✏️
          </button>
          <button
            className="text-red-600 hover:text-red-700 text-sm font-semibold"
            onClick={handleDelete}
            disabled={loading}
          >
            🗑️
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}