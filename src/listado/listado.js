import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Buscar from "../buscar/buscar";
import "../detalles/detalles.css";
import "./listado.css";

const Listado = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const location = useLocation();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(
          "https://api.mercadolibre.com/sites/MLA/categories"
        );
        if (!response.ok) throw new Error("Error al obtener categorías");
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get("query");
    if (queryParam) {
      setQuery(queryParam);
      fetchProductos(queryParam, selectedCategory, 1);
    }
  }, [location]);

  const fetchProductos = async (searchQuery, category, currentPage) => {
    setLoading(true);
    setError(null);

    const offset = (currentPage - 1) * limit;

    try {
      const categoryQuery = category ? `&category=${category}` : "";
      const response = await fetch(
        `https://api.mercadolibre.com/sites/MLA/search?q=${searchQuery}${categoryQuery}&limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }

      const data = await response.json();
      setProductos(data.results);
      setTotalPages(Math.ceil(data.paging.total / limit));
      setPage(currentPage);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setSelectedCategory("");
    setPage(1);
    fetchProductos(newQuery, "", 1);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setPage(1);
    fetchProductos(query, newCategory, 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProductos(query, selectedCategory, nextPage);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchProductos(query, selectedCategory, prevPage);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="container mt-2">
      <Buscar onSearch={handleSearch} />

      <h2 className="mb-4">
        Resultados de búsqueda para:{" "}
        <span className="text-primary">{query}</span>
      </h2>

      <div className="mb-4">
        <label htmlFor="categorias" className="form-label">
          Filtrar por categoría:
        </label>
        <select
          id="categorias"
          className="form-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Todas las categorías</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : error ? (
        <p className="text-danger text-center">Error: {error}</p>
      ) : (
        <>
          <ul className="list-unstyled row">
            {productos.map((producto) => (
              <li
                key={producto.id}
                className="col-md-4 mb-4 d-flex flex-column"
              >
                <div className="card flex-fill">
                  <img
                    className="card-img-top"
                    src={producto.thumbnail}
                    alt={producto.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title truncate-text">
                      {producto.title}
                    </h5>
                    <p className="card-text">
                      Precio: ${formatPrice(producto.price)}
                    </p>
                    <Link to={`/detalle/${producto.id}`}>
                      <button className="btn btn-primary">Ver detalles</button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-secondary"
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Listado;
