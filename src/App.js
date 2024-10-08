import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Buscar from './buscar/buscar';
import Listado from './listado/listado';

const App = () => {
  return (
    <div>
      <Routes>
        {/* La barra de búsqueda y la vista de listado estarán disponibles */}
        <Route path="/" element={<Buscar />} />
        <Route path="/listado" element={<Listado />} />
      </Routes>
    </div>
  );
};

export default App;
