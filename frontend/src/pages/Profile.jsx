import React, { useEffect, useState } from 'react';
import UserReviewCard from '../components/ui/UserReviewCard';
import StatsCard from '../components/ui/StatsCard';
import { BookCheck, Star, BarChart3 } from 'lucide-react';
import { getUserGames, getGameDetails, deleteUserGame, updateAvatar } from '../api/gameOptions';
import GameCardProfile from '../components/ui/GameCardProfile';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('library');
  const [userGames, setUserGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useAuth();
  const gamesPerPage = 12;
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    minHours: 0,
    status: '',
    minRating: 0
  });
  const handleFilterChange = (key, value) => {
    if (key === 'minRating') {
      const clampedValue = Math.max(0, Math.min(5, value));
      setFilters((prev) => ({ ...prev, [key]: clampedValue }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const base64 = reader.result;

        const res = await updateAvatar(base64)

        setProfileImage(res.data.avatar);
      } catch (err) {
        console.error('Error al subir la imagen:', err);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    console.log(user)
    if (user?.avatar) {
      setProfileImage(user.avatar);
    }
  }, [user]);
  const filteredGames = userGames.filter((g) => {
    const playedEnough = Number(g.duration) >= filters.minHours;
    const matchesStatus = filters.status ? g.status === filters.status : true;
    const meetsRating = g.rating >= filters.minRating;
    return playedEnough && matchesStatus && meetsRating;
  });

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);
  const totalPages = Math.ceil(filteredGames.length / gamesPerPage);

  useEffect(() => {
    async function fetchUserLibrary() {
      try {
        const { data } = await getUserGames();
        const enrichedGames = await Promise.all(
          data.map(async (userGame) => {
            const gameDetails = await getGameDetails(userGame.game);
            return {
              ...userGame,
              gameDetails
            };
          })
        );
        setUserGames(enrichedGames);
      } catch (err) {
        console.error('Error cargando juegos del usuario:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUserLibrary();
  }, []);

  const stats = {
    completed: userGames.filter((g) => g.status === 'finished').length,
    reviews: userGames.filter((g) => g.review?.trim()).length,
    hoursPlayed: userGames.reduce((total, g) => total + (Number(g.duration) || 0), 0)
  };

  function onClick(game_id) {
    navigate(`/game/${game_id}`);
  }

  const handleDeleteReview = async (userGameId) => {
    try {
      await deleteUserGame(userGameId);
      setUserGames((prev) => prev.filter((g) => g.game !== userGameId));
    } catch (error) {
      console.error('Error eliminando la reseña:', error);
    }
  };

  const renderPagination = () => {
    const getPageNumbers = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
          pages.push(i);
        } else if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }
      return pages;
    };

    return (
      <div className="flex justify-center mt-6 space-x-2">
        {getPageNumbers().map((num, i) => (
          <button
            key={i}
            onClick={() => typeof num === 'number' && setCurrentPage(num)}
            className={`px-3 py-1 rounded-md border ${
              num === currentPage
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            } ${num === '...' ? 'cursor-default' : ''}`}
            disabled={num === '...'}
          >
            {num}
          </button>
        ))}
      </div>
    );
  };

  if (loading) return <div className="text-white p-4">Cargando perfil...</div>;

  return (
    <div className="p-6 text-white min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950">
      <div className="mb-6">
      <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={profileImage || 'https://ui-avatars.com/api/?name=' + user.username}
              alt="Foto de perfil"
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-400"
            />
            <label className="absolute bottom-0 right-0 bg-blue-500 p-1 rounded-full cursor-pointer hover:bg-blue-600">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="text-white text-xs">✎</span>
            </label>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-400">{user.username}</h1>
            <p className="text-gray-400">Your games, reviews and stats</p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm text-gray-400">Minimum Time</label>
          <input
            type="number"
            min={0}
            value={filters.minHours}
            onChange={(e) => handleFilterChange('minHours', Number(e.target.value))}
            className="bg-gray-800 text-white rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="bg-gray-800 text-white rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="playing">Playing</option>
            <option value="finished">Finished</option>
            <option value="abandoned">Dropped</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-400">Rating</label>
          <input
            type="number"
            min={0}
            max={5}
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
            className="bg-gray-800 text-white rounded px-2 py-1"
          />
        </div>
      </div>

      <div className="flex space-x-4 mb-4 border-b border-gray-700">
        {['library', 'reviews', 'stats'].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-3 border-b-2 ${
              activeTab === tab
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'library' ? 'Library' : tab === 'reviews' ? 'Reviews' : 'Stats'}
          </button>
        ))}
      </div>

      {activeTab === 'library' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentGames.map(({ gameDetails, rating, status, duration }) => (
              <GameCardProfile
                key={gameDetails.id}
                game={gameDetails}
                userRating={rating}
                userStatus={status}
                userDuration={duration}
                onClick={() => onClick(gameDetails.id)}
              />
            ))}
          </div>
          {totalPages > 1 && renderPagination()}
        </>
      )}

      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {filteredGames
            .filter((g) => g.review?.trim())
            .map((g) => (
              <div key={g._id} className="relative bg-gray-800 p-4 rounded-xl">
                <UserReviewCard
                  review={{
                    gameName: g.gameDetails.name,
                    comment: g.review,
                    rating: g.rating,
                    status: g.status
                  }}
                  onDelete={handleDeleteReview}
                  gameId={g.gameDetails.id}
                />
              </div>
            ))}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard title="Finished games" value={stats.completed} icon={BookCheck} />
          <StatsCard title="Reviews written" value={stats.reviews} icon={Star} />
          <StatsCard title="Played hours" value={stats.hoursPlayed} icon={BarChart3} />
        </div>
      )}
    </div>
  );
}
