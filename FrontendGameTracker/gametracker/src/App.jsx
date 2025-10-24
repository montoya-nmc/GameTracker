import React, { useState } from 'react';
import Library from './pages/Library';
import Store from './pages/Store';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('store');

  return (
    <div className="app">
      <nav className="top-nav">
        <div className="nav-sections">
          <span 
            className={`nav-item ${currentPage === 'store' ? 'active' : ''}`}
            onClick={() => setCurrentPage('store')}
          >
            TIENDA
          </span>
          <span 
            className={`nav-item ${currentPage === 'library' ? 'active' : ''}`}
            onClick={() => setCurrentPage('library')}
          >
            BIBLIOTECA
          </span>
        </div>
        <div className="nav-controls">
          <input type="text" placeholder="Buscar juegos..." />
        </div>
      </nav>
      <div className="main-content">
        {currentPage === 'store' ? <Store /> : <Library />}
      </div>
    </div>
  );
}

export default App;
