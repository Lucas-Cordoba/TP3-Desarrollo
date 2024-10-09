import React from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../carritoContext/carritoContext";
import "./contadorCarrito.css";

const ContadorCarrito = () => {
  const { carrito } = useCarrito();
  const navigate = useNavigate();

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  const handleClick = () => {
    navigate("/carrito");
  };

  return (
    <div
      className="d-flex align-items-center p-2 border rounded bg-warning cursor-pointer z-1000"
      onClick={handleClick}
    >
      <span className="me-2 fs-4">🛒</span>
      <span className="fs-5">{cantidadTotal > 0 ? cantidadTotal : 0}</span>
      <span className="ms-2">Carrito</span>
    </div>
  );
};

export default ContadorCarrito;
