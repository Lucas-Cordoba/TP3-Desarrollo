import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Buscar from './buscar/buscar';
import Listado from './listado/listado';
import DetalleProducto from './detalles/detalles'; 

const App = () => {
  return (
    <div>
      <Routes>
        {/* Ruta para la barra de búsqueda */}
        <Route path="/" element={<Buscar />} />
        
        {/* Ruta para la vista de listado */}
        <Route path="/listado" element={<Listado />} />
        
        {/* Ruta para la vista de detalles */}
        <Route path="/detalle/:id" element={<DetalleProducto />} /> {/* :id será dinámico */}
      </Routes>
    </div>
  );
};

export default App;
