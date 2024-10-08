// src/Carrito.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../carritoContext/carritoContext'; // Asegúrate de que la ruta sea correcta
import './carrito.css'; // Puedes agregar estilos específicos para el carrito

const Carrito = () => {
  const { carrito, setCarrito } = useCarrito(); 
  const navigate = useNavigate(); 

  // Función para eliminar productos del carrito
  const handleEliminarDelCarrito = (productoAEliminar) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== productoAEliminar.id);
    setCarrito(nuevoCarrito);
  };

  // Calcular el precio total del carrito
  const precioTotal = carrito.reduce((total, producto) => total + producto.price * producto.cantidad, 0);

  const handleVolver = () => {
    navigate(-1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className='carrito-container'>
      <h2>Contenido del Carrito</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className='carrito-lista'>
            {carrito.map((producto) => (
              <li key={producto.id} className='carrito-item'>
                <img src={producto.pictures[0]?.url} alt={producto.title} className='imagen-carrito' />
                <div className='carrito-detalles'>
                  <h3>{producto.title}</h3>
                  <p>Precio: ${formatPrice(producto.price)}</p>
                  <p>Cantidad: {producto.cantidad}</p>
                  <button onClick={() => handleEliminarDelCarrito(producto)} className='boton-eliminar'>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className='carrito-total'>
            <h3>Total: ${formatPrice(precioTotal.toFixed(2))}</h3>
          </div>
        </div>
      )}

      <button className='boton-detalles' onClick={handleVolver}>Volver</button>
    </div>
  );
};

export default Carrito;
