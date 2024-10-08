// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Buscar from './buscar/buscar';
import Listado from './listado/listado';
import DetalleProducto from './detalles/detalles'; 
import { CarritoProvider } from './carritoContext/carritoContext'; // Importa el contexto
import ContadorCarrito from './contadorCarrito/contadorCarrito'; // Importa el contador
import Carrito from './carrito/carrito';

const App = () => {
  return (
    <CarritoProvider>
      <div>
        <header>
          <ContadorCarrito /> {/* Agrega el contador aquí */}
          {/* Agrega tu barra de navegación aquí si es necesario */}
        </header>
        <Routes>
          {/* Ruta para la barra de búsqueda */}
          <Route path="/" element={<Buscar />} />
          
          {/* Ruta para la vista de listado */}
          <Route path="/listado" element={<Listado />} />
          
          {/* Ruta para la vista de detalles */}
          <Route path="/detalle/:id" element={<DetalleProducto />} />
          {/* Agrega la ruta para el carrito aquí si no la tienes */}
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </div>
    </CarritoProvider>
  );
};

export default App;
