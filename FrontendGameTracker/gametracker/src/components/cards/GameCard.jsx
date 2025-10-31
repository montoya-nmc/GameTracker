import React from 'react';
import './GameCard.css';

const GameCard = ({ game, onDelete, onUpdate }) => {
  return (
    <div className="game-card">
      <img 
        src={game.image || 'https://via.placeholder.com/300x200'} 
        alt={game.title} 
        className="game-cover" 
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/300x200';
        }}
      />
      <div className="game-info">
        <h3>{game.title}</h3>
        <span className="game-genre">{game.genre}</span>
        {game.price && <span className="game-price">${game.price}</span>}
      </div>
      <div className="game-actions">
        <button className="btn-update" onClick={() => onUpdate(game)}>
          Actualizar
        </button>
        <button className="btn-delete" onClick={() => onDelete(game.id)}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default GameCard;
