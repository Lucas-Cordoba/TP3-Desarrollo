import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <Link to="/buscar">Ir a la búsqueda</Link>
    </div>
  );
};

export default Inicio;
