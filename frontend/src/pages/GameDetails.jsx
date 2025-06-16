import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGameDetails, getGameScreenshots } from '../api/gameOptions';
import GameInfoSection from '../components/ui/GameInfoSection';
import GameScreenshots from '../components/ui/GameScreenshots';
import UserReviewForm from '../components/ui/UserReviewForm';

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const gameData = await getGameDetails(id);
        const screenshotData = await getGameScreenshots(id);
        setGame(gameData);
        setScreenshots(screenshotData.results || []);
      } catch (error) {
        console.error('Error cargando detalles del juego:', error);
      }
    }
    fetchData();
  }, [id]);

  if (!game) return <div className="text-white p-4">Cargando...</div>;

return (
  <div className="px-4 sm:px-6 lg:px-8 py-6 text-white max-w-6xl mx-auto">
    <GameInfoSection game={game} />

    <div className="mt-8">
      <GameScreenshots screenshots={screenshots} />
    </div>

    <div className="mt-10">
      <UserReviewForm gameId={game.id} gameName={game.name} />
    </div>
  </div>
);

}
