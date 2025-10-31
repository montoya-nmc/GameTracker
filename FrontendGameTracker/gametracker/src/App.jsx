import React, { useState } from 'react';
import Library from './pages/Library';
import GameForm from './components/forms/GameForm';
import { API_URL } from './config/api';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="nav-sections">
          <span className="nav-item active">BIBLIOTECA</span>
          <button className="nav-button add-game" onClick={() => setShowForm(true)}>
            + AGREGAR JUEGO
          </button>
          <button className="nav-button refresh" onClick={handleRefresh}>
            ↻ ACTUALIZAR
          </button>
        </div>
        <div className="nav-controls">
          <input type="text" placeholder="Buscar juegos..." />
        </div>
      </nav>
      <div className="main-content">
        {showForm && (
          <GameForm 
            onClose={() => setShowForm(false)}
            apiUrl={API_URL}
          />
        )}
        <Library refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default App;
