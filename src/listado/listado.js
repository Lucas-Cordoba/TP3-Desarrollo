import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Buscar from '../buscar/buscar'; // Importamos el componente de búsqueda

const Listado = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  const fetchProductos = useCallback(async (page) => {
    if (!query) return; // No buscar si no hay query

    setLoading(true);
    const offset = (page - 1) * limit;
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=${limit}&offset=${offset}`);
    const data = await response.json();

    setProductos(data.results);
    setTotalPages(Math.ceil(data.paging.total / limit));
    setLoading(false);
  }, [query, limit]);

  useEffect(() => {
    // Reiniciar la página a 1 y buscar productos cada vez que el query cambia
    setPage(1); // Reiniciar a la primera página
    fetchProductos(1); // Buscar productos de la primera página
  }, [fetchProductos, query]); // Dependemos solo de query

  useEffect(() => {
    if (query) {
      fetchProductos(page); // Fetch productos de la página actual
    }
  }, [fetchProductos, page, query]);

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <div>
      <Buscar /> {/* Mantenemos la barra de búsqueda visible */}
      <h2>Resultados de búsqueda para: {query}</h2>
      {loading ? (
        <p>Cargando productos...</p>
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
