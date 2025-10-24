import React from 'react';
import './GameCard.css';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <img src={game.image} alt={game.title} className="game-cover" />
      <div className="game-info">
        <h3>{game.title}</h3>
        <span className="game-genre">{game.genre}</span>
      </div>
    </div>
  );
};

export default GameCard;
