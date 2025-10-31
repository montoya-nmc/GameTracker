import React, { useState, useEffect } from 'react';
import GameCard from '../components/cards/GameCard';
import { API_URL } from '../config/api';
import './Library.css';

const Library = ({ refreshTrigger }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gameToEdit, setGameToEdit] = useState(null);

  useEffect(() => {
    fetchGames();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

  const fetchGames = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const formattedGames = data.map(game => ({
        id: game.id,
        title: game.name,
        genre: game.category,
        image: game.imageUrl || 'https://via.placeholder.com/300x200',
        price: game.price
      }));
      setGames(formattedGames);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      setGames(games.filter(game => game.id !== id));
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const handleUpdate = (game) => {
    setGameToEdit(game);
  };

  if (loading) return <div className="loading">Cargando juegos...</div>;

  return (
    <div className="library-container">
      <div className="sidebar">
        <div className="filter-section">
          <h3>FILTROS</h3>
        </div>
      </div>
      <div className="games-grid">
        {games.map(game => (
          <GameCard 
            key={game.id} 
            game={game}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
