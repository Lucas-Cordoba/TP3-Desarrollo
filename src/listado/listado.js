import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Buscar from '../buscar/buscar';

const Listado = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const location = useLocation();

  // Obtiene el query de la URL cuando se carga el componente
  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get('query');
    if (queryParam) {
      setQuery(queryParam);
      fetchProductos(queryParam, 1); // Carga la primera página
    }
  }, [location]);

  const fetchProductos = async (searchQuery, currentPage) => {
    setLoading(true);
    setError(null);
    
    const offset = (currentPage - 1) * limit; // Calcular el offset según la página

    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}&limit=${limit}&offset=${offset}`);
      
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }

      const data = await response.json();
      setProductos(data.results);
      setTotalPages(Math.ceil(data.paging.total / limit)); // Calcular el número total de páginas
      setPage(currentPage); // Establecer la página actual después de obtener los productos
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // Reiniciar a la primera página
    fetchProductos(newQuery, 1); // Cargar la primera página
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProductos(query, nextPage); // Cargar la siguiente página
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchProductos(query, prevPage); // Cargar la página anterior
    }
  };

  return (
    <div>
      <Buscar onSearch={handleSearch} />
      <h2>Resultados de búsqueda para: {query}</h2>

      {loading ? (
        <p>Cargando productos...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <ul>
            {productos.map((producto) => (
              <li key={producto.id}>
                <img src={producto.thumbnail} alt={producto.title} />
                <p>{producto.title}</p>
                <p>Precio: ${producto.price}</p>
              </li>
            ))}
          </ul>

          <div className="paginacion">
            <button onClick={handlePrevPage} disabled={page === 1}>
              Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button onClick={handleNextPage} disabled={page === totalPages}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Listado;
