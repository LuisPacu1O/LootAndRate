import React from 'react';

export default function GameInfoSection({ game }) {
  return (
    <div className="bg-gray-900 rounded-xl p-4 sm:p-6 shadow-xl mb-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full md:w-1/3 rounded-xl object-cover max-h-72 md:max-h-none"
        />
        <div className="flex-1 space-y-2 md:space-y-3 text-sm sm:text-base">
          <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">{game.name}</h1>
          <p className="text-gray-300">📅 Lanzamiento: {game.released}</p>
          <p className="text-gray-300">⭐ Rating: {game.rating}/5</p>
          <p className="text-gray-300">
            🕹 Plataformas: {game.platforms?.map(p => p.platform.name).join(', ')}
          </p>
          <p className="text-gray-300">
            🎮 Géneros: {game.genres?.map(g => g.name).join(', ')}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">{game.description_raw}</p>
        </div>
      </div>
    </div>
  );
}
