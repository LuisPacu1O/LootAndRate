import React, { useState, useEffect } from 'react';
import { postUserGame, putUserGame, getUserGame } from '../../api/gameOptions';
import { StarFull, StarHalf, StarEmpty } from './StarIcon';
import { toast, Toaster } from 'react-hot-toast'; 
import { useNavigate } from 'react-router-dom';

export default function UserReviewForm({ gameId, gameName }) {
  const [status, setStatus] = useState('pending');
  const [review, setReview] = useState('');
  const [hoursPlayed, setHoursPlayed] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [existingReviewId, setExistingReviewId] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchReview() {
      try {
        const data = await getUserGame(gameId);
        if (data) {
          setStatus(data.status || 'pending');
          setReview(data.review || '');
          setHoursPlayed(data.duration || '');
          setRating(data.rating || 0);
          setExistingReviewId(data._id);
        }
      } catch (err) {
        console.error('No hay reseña previa o error:', err);
      }
    }
    fetchReview();
  }, [gameId]);

  const validate = () => {
    const newErrors = {};
    const validStatuses = ['pending', 'playing', 'finished', 'abandoned'];

    if (!validStatuses.includes(status)) {
      newErrors.status = 'Estado no válido.';
    }

    if (showHoursInput) {
      const num = Number(hoursPlayed);
      if (isNaN(num) || num < 0) {
        newErrors.hoursPlayed = 'Introduce una duración válida (número positivo).';
      } else if (num > 10000) {
        newErrors.hoursPlayed = 'La duración no puede superar las 10.000 horas.';
      }
    }

    if (rating < 0 || rating > 5) {
      newErrors.rating = 'La valoración debe estar entre 0 y 5.';
    }

    if (review.length > 500) {
      newErrors.review = 'El comentario no puede tener más de 500 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      game: gameId,
      status,
      review,
      duration: hoursPlayed,
      rating,
    };

    try {
      if (existingReviewId) {
        await putUserGame(gameId, payload);
        toast.success('Reseña actualizada con éxito!');
      } else {
        await postUserGame(payload);
        toast.success('Juego guardado en tu biblioteca!');
      }
    } catch (err) {
      toast.error('Hubo un error al guardar el juego.');
      console.error('Error guardando juego:', err);
    }
    navigate('/profile');
  };

  const showHoursInput = ['playing', 'finished', 'abandoned'].includes(status);

return (
  <div className="px-4 sm:px-6 lg:px-8 py-6">
    <div className="max-w-screen-md mx-auto">
      <Toaster position="top-right" reverseOrder={false} />

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-md">
        <h2 className="text-xl text-blue-300 font-semibold mb-4">
          {existingReviewId ? 'Edit your review' : 'Review'}
        </h2>

        <div className="mb-4">
          <label className="block text-white mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="pending">Pending</option>
            <option value="playing">Playing</option>
            <option value="finished">Finished</option>
            <option value="abandoned">Dropped</option>
          </select>
          {errors.status && <p className="text-red-400 text-sm">{errors.status}</p>}
        </div>

        {showHoursInput && (
          <div className="mb-4">
            <label className="block text-white mb-1">Played time</label>
            <input
              type="number"
              min="0"
              max="10000"
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="Introduce las horas jugadas"
              value={hoursPlayed}
              onChange={(e) => setHoursPlayed(e.target.value)}
            />
            {errors.hoursPlayed && <p className="text-red-400 text-sm">{errors.hoursPlayed}</p>}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-white mb-1">Your review</label>
          <textarea
            className="w-full p-3 rounded bg-gray-700 text-white resize-none"
            rows={5}
            placeholder={`Write your review of ${gameName}...`}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          {errors.review && <p className="text-red-400 text-sm">{errors.review}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Rating</label>
          <div className="flex gap-2 items-center flex-wrap">
            {[1, 2, 3, 4, 5].map((value) => {
              const displayValue = hoverRating || rating;
              const isFull = displayValue >= value;
              const isHalf = displayValue >= value - 0.5 && displayValue < value;
              const currentColor =
                displayValue >= value
                  ? 'text-green-400'
                  : displayValue >= value - 0.5
                  ? 'text-yellow-400'
                  : 'text-gray-500';

              return (
                <div
                  key={value}
                  className="relative w-6 h-6 cursor-pointer group"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <div
                    className="absolute left-0 top-0 w-1/2 h-full z-10"
                    onMouseEnter={() => setHoverRating(value - 0.5)}
                    onClick={() => setRating(value - 0.5)}
                  />
                  <div
                    className="absolute right-0 top-0 w-1/2 h-full z-10"
                    onMouseEnter={() => setHoverRating(value)}
                    onClick={() => setRating(value)}
                  />
                  <div className="w-full h-full transform transition-transform duration-200 ease-in-out group-hover:scale-125 pointer-events-none">
                    {isFull ? (
                      <StarFull className={`w-6 h-6 ${currentColor}`} />
                    ) : isHalf ? (
                      <StarHalf className={`w-6 h-6 ${currentColor}`} />
                    ) : (
                      <StarEmpty className={`w-6 h-6 ${currentColor}`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-sm text-gray-300 mt-1">
            {rating ? `${rating.toFixed(1)} / 5` : 'No rating yet'}
          </div>
          {errors.rating && <p className="text-red-400 text-sm">{errors.rating}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          {existingReviewId ? 'Update' : 'Save'}
        </button>
      </form>
    </div>
  </div>
);

}
