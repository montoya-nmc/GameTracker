import React, { useEffect, useState } from 'react';
import GameCard from '../components/cards/GameCard';
import { gameService } from '../services/gameService';
import './Library.css';

const Library = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const data = await gameService.getAllGames();
      setGames(data);
    } catch (err) {
      setError('Error al cargar los juegos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Cargando biblioteca...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="library-container">
      <div className="sidebar">
        <div className="filter-section">
          <h3>FILTROS</h3>
        </div>
      </div>
      <div className="games-content">
        {games.length === 0 ? (
          <div className="empty-library">
            <h2>Tu biblioteca está vacía</h2>
            <p>Agrega juegos para comenzar tu colección</p>
          </div>
        ) : (
          <div className="games-grid">
            {games.map(game => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
