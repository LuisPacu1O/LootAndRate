import { Star } from 'lucide-react'; 

export default function GameCard({ game, onClick }) {
    const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-400';
    if (rating >= 2) return 'text-yellow-400';
    return 'text-red-400';
  };

  const ratingColor = getRatingColor(game.rating);
  return (
    <div
      className="relative bg-gray-900 text-white rounded-2xl shadow-md overflow-hidden cursor-pointer group transition duration-300"
      onClick={onClick}
    >
      <div className="overflow-hidden h-48">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110 group-hover:brightness-50"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
        <h3 className="text-xl font-bold text-white text-center px-2 drop-shadow-md">
          {game.name}
        </h3>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{game.name}</h3>
        <p className="text-sm text-gray-400">{game.released}</p>
        <div className={`flex items-center gap-1 mt-1 ${ratingColor}`}>
          <Star size={16} fill="currentColor" strokeWidth={0} />
          <span className="text-sm">{game.rating?.toFixed(1) || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}
