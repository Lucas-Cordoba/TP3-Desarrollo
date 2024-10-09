import React from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../carritoContext/carritoContext";
import "./carrito.css";

const Carrito = () => {
  const { carrito, setCarrito } = useCarrito();
  const navigate = useNavigate();

  const handleEliminarDelCarrito = (productoAEliminar) => {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.id !== productoAEliminar.id
    );
    setCarrito(nuevoCarrito);
  };

  const precioTotal = carrito.reduce(
    (total, producto) => total + producto.price * producto.cantidad,
    0
  );

  const handleVolver = () => {
    navigate(-1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Contenido del Carrito</h2>

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul className="list-unstyled">
            {carrito.map((producto) => (
              <li
                key={producto.id}
                className="d-flex align-items-center mb-3 border p-3"
              >
                <img
                  src={producto.pictures[0]?.url}
                  alt={producto.title}
                  className="img-fluid me-3 m-h-100"
                />
                <div className="flex-grow-1">
                  <h5 className="mb-1">{producto.title}</h5>
                  <p className="mb-1">Precio: ${formatPrice(producto.price)}</p>
                  <p className="mb-1">Cantidad: {producto.cantidad}</p>
                  <button
                    onClick={() => handleEliminarDelCarrito(producto)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-center mt-4">
            <h3>Total: ${formatPrice(precioTotal.toFixed(2))}</h3>
          </div>
        </div>
      )}

      <div className="text-center mt-4 mb-2">
        <button className="btn btn-secondary" onClick={handleVolver}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default Carrito;
