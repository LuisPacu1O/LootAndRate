import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import Filters from '../components/ui/Filters';
import GameCard from '../components/ui/GameCard';
import Pagination from '../components/ui/Pagination';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { games, getGameParams, genres, platforms, getGenres, getPlatforms, count, publishers, getPublishers, developers, getDevelopers } = useGame();
  const [filters, setFilters] = useState({ search: '', genre: '', platform: '', publishers: '', developers: '' });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const page_size = 16;
  const navigate = useNavigate();

  useEffect(() => {
    getGenres();
    getPlatforms();
    getPublishers();
    getDevelopers();
  }, []);
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setLoading(true)
    const hasFilters = filters.search || filters.genre || filters.platform || filters.publishers || filters.developers;

    let params = {
      page,
      page_size
    };

    if (hasFilters) {
      if (filters.search) params.search = filters.search;
      if (filters.genre) params.genres = filters.genre;
      if (filters.platform) params.platforms = filters.platform;
      if (filters.publishers) params.publishers = filters.publishers;
      if (filters.developers) params.developers = filters.developers;
    }
    await getGameParams(params);
    setLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [filters, page]);

  useEffect(() => {
    setPage(1);
  }, [filters])

  function onClick(game_id){
    navigate(`/game/${game_id}`)
  }
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-8xl mx-auto">
        
        <Filters
          filters={filters}
          setFilters={setFilters}
          genres={genres}
          platforms={platforms}
          publishers={publishers}
          developers={developers}
        />

        <div className="mt-8 min-h-[200px] flex justify-center items-center">
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-blue-400">Loading games...</span>
            </div>
          ) : games.length === 0 ? (
            <div className="text-gray-300 text-lg text-center bg-gray-800 border border-gray-700 p-6 rounded-xl w-full max-w-md">
              Didn't find games with those filters
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {games.map((game) => (
                <GameCard key={game.id} game={game} onClick={() => onClick(game.id)} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil((count || 0) / page_size)}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );

}
