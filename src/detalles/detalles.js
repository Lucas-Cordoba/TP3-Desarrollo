import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCarrito } from '../carritoContext/carritoContext'; // Asegúrate de tener el contexto del carrito
import './detalles.css';
import '../listado/listado.css';

const DetalleProducto = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { agregarAlCarrito } = useCarrito(); // Función para agregar productos al carrito
  const [producto, setProducto] = useState(null);
  const [descripcion, setDescripcion] = useState(''); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (producto.pictures.length));
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + producto.pictures.length) % (producto.pictures.length));
  };

  const handleAgregarAlCarrito = () => {
    if (producto) {
      agregarAlCarrito(producto);
      alert(`${producto.title} ha sido agregado al carrito!`); // Mensaje de confirmación
    }
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
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };
  
  return (
    <div className='container'>
      <h2>{title}</h2>
      <div className='grid'>
        <div className='carrusel'>
          <button className='boton-detalles' onClick={handlePrevImage} disabled={pictures.length <= 1}>{'<'}</button>
          <img className='producto-imagen' src={pictures[currentImageIndex].url} alt={title} />
          <button className='boton-detalles' onClick={handleNextImage} disabled={pictures.length <= 1}>{'>'}</button>
        </div>
        <div className='detalles container-detalles'>
          <p>Precio: ${formatPrice(price)}</p>
          <p>Descripción: {descripcion || 'No hay descripción disponible.'}</p>
          <button className='boton-detalles' onClick={handleAgregarAlCarrito}>Agregar al carrito</button>
        </div>
      </div>

      {attributes && attributes.length > 0 && (
        <div className='atributos'>
          <h3>Atributos del producto:</h3>
          <ul>
            {attributes.map((attr, index) => (
              <li key={index} className='atributo-item'>
                <strong>{attr.name}: </strong>{attr.value_name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className='boton-detalles' onClick={handleVolver}>Volver</button>
    </div>
  ); 
};

export default DetalleProducto;
