import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./buscar.css";

const Buscar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/listado?query=${query}`);
    }
  };

  return (
    <div className="container text-center mb-4">
      <h1 className="mb-4 pt-5">Buscar Productos</h1>
      <form
        onSubmit={handleSearch}
        className="d-flex justify-content-center shadow-box"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="form-control me-2"
          aria-label="Buscar productos"
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Buscar;
