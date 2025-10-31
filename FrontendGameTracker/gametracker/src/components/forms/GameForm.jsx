import React, { useState } from 'react';
import './GameForm.css';

const GameForm = ({ onClose, onGameAdded, apiUrl, gameToEdit }) => {
  const [formData, setFormData] = useState({
    name: gameToEdit?.name || '',
    price: gameToEdit?.price || '',
    category: gameToEdit?.category || '',
    imageUrl: gameToEdit?.imageUrl || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = gameToEdit ? 'PUT' : 'POST';
    const url = gameToEdit ? `${apiUrl}/${gameToEdit.id}` : apiUrl;

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      onGameAdded();
      onClose();
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  return (
    <div className="game-form-overlay">
      <div className="game-form">
        <h2>{gameToEdit ? 'Editar Juego' : 'Agregar Nuevo Juego'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre del juego"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <input
            type="text"
            placeholder="Género"
            value={formData.category}
            onChange={e => setFormData({...formData, category: e.target.value})}
          />
          <input
            type="number"
            placeholder="Precio"
            value={formData.price}
            onChange={e => setFormData({...formData, price: e.target.value})}
          />
          <input
            type="text"
            placeholder="URL de la imagen"
            value={formData.imageUrl}
            onChange={e => setFormData({...formData, imageUrl: e.target.value})}
          />
          <div className="form-buttons">
            <button type="submit">{gameToEdit ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
