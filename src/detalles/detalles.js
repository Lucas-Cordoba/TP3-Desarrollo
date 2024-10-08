import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCarrito } from "../carritoContext/carritoContext";
import "../listado/listado.css";
import "./detalles.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  const [producto, setProducto] = useState(null);
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);
      try {
        const responseProducto = await fetch(
          `https://api.mercadolibre.com/items/${id}`
        );
        if (!responseProducto.ok) {
          throw new Error("Error al obtener los detalles del producto");
        }
        const dataProducto = await responseProducto.json();
        setProducto(dataProducto);

        const responseDescripcion = await fetch(
          `https://api.mercadolibre.com/items/${id}/description`
        );
        if (!responseDescripcion.ok) {
          throw new Error("Error al obtener la descripción del producto");
        }
        const dataDescripcion = await responseDescripcion.json();
        setDescripcion(dataDescripcion.plain_text);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const handleVolver = () => {
    navigate(-1);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % producto.pictures.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + producto.pictures.length) % producto.pictures.length
    );
  };

  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito(producto);
      alert(`${producto.title} ha sido agregado al carrito!`); // Mensaje de confirmación
    }
  };

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  if (loading) {
    return <p>Cargando detalles...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!producto) {
    return <p>No se encontró el producto.</p>;
  }

  const { title, price, pictures, attributes } = producto;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const characterLimit = 1000;

  return (
    <div className="container mt-4">
      <div className="bg-light p-4 rounded">
        <h2 className="text-center mb-4">{title}</h2>
        <div className="d-flex justify-content-center align-items-center mb-4 flex-column flex-md-row">
          <button
            className="btn btn-secondary mb-2 mb-md-0 me-2"
            onClick={handlePrevImage}
            disabled={pictures.length <= 1}
          >
            {"<"}
          </button>
          <img
            className="producto-imagen img-fluid max-height-400"
            src={pictures[currentImageIndex].url}
            alt={title}
          />
          <button
            className="btn btn-secondary mb-2 mb-md-0 ms-2"
            onClick={handleNextImage}
            disabled={pictures.length <= 1}
          >
            {">"}
          </button>
        </div>

        <div className="detalles mb-4">
          <p className="h5">Precio: ${formatPrice(price)}</p>
          <p>
            Descripción:{" "}
            {isExpanded ? descripcion : descripcion.slice(0, characterLimit)}
            {descripcion.length > characterLimit && (
              <span
                className="text-primary cursor-pointer"
                onClick={handleToggleDescription}
              >
                {isExpanded ? " Ver menos" : " ...Ver más"}
              </span>
            )}
          </p>
          <button className="btn btn-primary" onClick={handleAgregarAlCarrito}>
            Agregar al carrito
          </button>
        </div>

        {attributes && attributes.length > 0 && (
          <div className="atributos mb-4">
            <h3 className="text-center mb-3">Atributos del producto:</h3>
            <div className="row">
              {attributes.map((attr, index) => (
                <div key={index} className="col-md-4 mb-2">
                  <div className="card p-2">
                    <strong>{attr.name}:</strong> {attr.value_name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button className="btn btn-secondary" onClick={handleVolver}>
          Volver
        </button>
      </div>
    </div>
  );
};

export default DetalleProducto;
