import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate

const DetalleProducto = () => {
  const { id } = useParams(); // Obtener el ID del producto desde los parámetros de la URL
  const navigate = useNavigate(); // Instancia del hook para la navegación
  const [producto, setProducto] = useState(null);
  const [descripcion, setDescripcion] = useState(''); // Estado separado para la descripción
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch para los detalles del producto
  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);
      try {
        // Primera llamada para obtener los detalles del producto
        const responseProducto = await fetch(`https://api.mercadolibre.com/items/${id}`);
        if (!responseProducto.ok) {
          throw new Error('Error al obtener los detalles del producto');
        }
        const dataProducto = await responseProducto.json();
        setProducto(dataProducto);

        // Segunda llamada para obtener la descripción del producto
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

  // Función para volver a la página anterior
  const handleVolver = () => {
    navigate(-1); // Navegar a la página anterior en el historial
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
          <button onClick={handleVolver}>Volver</button>
        </>
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
};

export default DetalleProducto;
