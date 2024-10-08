import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Buscar from '../buscar/buscar';
import './listado.css';

const Listado = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const location = useLocation();

  // Obtiene las categorías al cargar el componente
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch('https://api.mercadolibre.com/sites/MLA/categories');
        if (!response.ok) throw new Error('Error al obtener categorías');
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategorias();
  }, []);

  // Obtiene el query de la URL y los productos
  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get('query');
    if (queryParam) {
      setQuery(queryParam);
      fetchProductos(queryParam, selectedCategory, 1); // Carga la primera página
    }
  }, [location]);

  const fetchProductos = async (searchQuery, category, currentPage) => {
    setLoading(true);
    setError(null);

    const offset = (currentPage - 1) * limit; // Calcular el offset según la página

    try {
      const categoryQuery = category ? `&category=${category}` : '';
      const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}${categoryQuery}&limit=${limit}&offset=${offset}`);
      
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
    setSelectedCategory(''); // Reiniciar la categoría seleccionada
    setPage(1); // Reiniciar a la primera página
    fetchProductos(newQuery, '', 1); // Cargar la primera página
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setPage(1); // Reiniciar a la primera página al cambiar la categoría
    fetchProductos(query, newCategory, 1); // Cargar la primera página con la nueva categoría
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProductos(query, selectedCategory, nextPage); // Cargar la siguiente página
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchProductos(query, selectedCategory, prevPage); // Cargar la página anterior
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="listado-container">
      <Buscar onSearch={handleSearch} />
      
      <h2 className="titulo-busqueda">
        Resultados de búsqueda para: <span>{query}</span>
      </h2>

      <div className="categoria-selector">
        <label htmlFor="categorias">Filtrar por categoría:</label>
        <select id="categorias" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading-text">Cargando productos...</p>
      ) : error ? (
        <p className="error-text">Error: {error}</p>
      ) : (
        <>
          <ul className="productos-list">
            {productos.map((producto) => (
              <li key={producto.id} className="producto-item">
                <img className="producto-imagen" src={producto.thumbnail} alt={producto.title} />
                <div className="producto-info">
                  <p className="producto-titulo">{producto.title}</p>
                  <p className="producto-precio"> Precio: ${formatPrice(producto.price)}</p>
                </div>
                <Link to={`/detalle/${producto.id}`}>
                  <button>Ver detalles</button>
                </Link>
              </li>
            ))}
          </ul>

          <div className="paginacion">
            <button className="pagina-button" onClick={handlePrevPage} disabled={page === 1}>
              Anterior
            </button>
            <span className="pagina-indicador">Página {page} de {totalPages}</span>
            <button className="pagina-button" onClick={handleNextPage} disabled={page === totalPages}>
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Listado;
