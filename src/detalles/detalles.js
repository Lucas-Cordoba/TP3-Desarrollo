import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import './detalles.css';

const DetalleProducto = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [producto, setProducto] = useState(null);
  const [descripcion, setDescripcion] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);
      try {
        const responseProducto = await fetch(`https://api.mercadolibre.com/items/${id}`);
        if (!responseProducto.ok) {
          throw new Error('Error al obtener los detalles del producto');
        }
        const dataProducto = await responseProducto.json();
        setProducto(dataProducto);

        const responseDescripcion = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
        if (!responseDescripcion.ok) {
          throw new Error('Error al obtener la descripción del producto');
        }
        const dataDescripcion = await responseDescripcion.json();
        setDescripcion(dataDescripcion.plain_text); // Guardar la descripción en el estado
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

  if (loading) {
    return <p>Cargando detalles...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {producto ? (
        <>
          <h2>{producto.title}</h2>
          <img src={producto.pictures[0]?.url} alt={producto.title} />
          <p>Precio: ${producto.price}</p>
          <p>Descripción: {descripcion || 'No hay descripción disponible.'}</p>
          {/* Botón para volver */}
          <button className='boton-volver' onClick={handleVolver}>Volver</button>
        </>
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
};

export default DetalleProducto;
