import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Buscar Productos</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default Buscar;
