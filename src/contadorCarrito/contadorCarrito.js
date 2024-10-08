// src/components/ContadorCarrito.js
import React from 'react';
import { useCarrito } from '../carritoContext/carritoContext';
import { useNavigate } from 'react-router-dom';
import './contadorCarrito.css'; // Asegúrate de tener este archivo de estilos

const ContadorCarrito = () => {
  const { carrito } = useCarrito();
  const navigate = useNavigate();

  // Calcular la cantidad total de productos en el carrito
  const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);

  const handleClick = () => {
    navigate('/carrito'); // Redirige a la página del carrito
  };

  return (
    <div className='contador-carrito' onClick={handleClick}>
      <span className='icono-carrito'>🛒</span> {/* Icono de carrito */}
      <span className='cantidad'>{cantidadTotal > 0 ? cantidadTotal : 0}</span>
    </div>
  );
};

export default ContadorCarrito;
