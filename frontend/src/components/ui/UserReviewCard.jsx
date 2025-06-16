import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Pencil } from 'lucide-react';

export default function UserReviewCard({ review, onDelete, gameId }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/game/${gameId}`);
  };

  const handleDelete = () => {
    if (confirm(`¿Eliminar reseña de "${review.gameName}"?`)) {
      onDelete(gameId);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl text-white shadow-md space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-400">{review.gameName}</h3>
        <span className="text-sm text-gray-400">★ {review.rating}/5</span>
      </div>

      <p className="text-gray-300">{review.comment}</p>
      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-gray-500">Estado: {review.status}</div>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-1 rounded hover:bg-blue-600 transition"
            title="Editar reseña"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-red-600 transition"
            title="Eliminar reseña"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
