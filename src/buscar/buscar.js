import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './buscar.css';

const Buscar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/listado?query=${query}`);
    }
  };

  return (
    <div className="busqueda-container">
    <h1 className="titulo-busqueda">Buscar Productos</h1>
    <form onSubmit={handleSearch} className="busqueda-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar productos..."
        className="busqueda-input"
      />
      <button type="submit" className="busqueda-button">Buscar</button>
    </form>
  </div>
  
  );
};

export default Buscar;
