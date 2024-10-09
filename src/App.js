import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./header/header";
import Buscar from "./buscar/buscar";
import Carrito from "./carrito/carrito";
import { CarritoProvider } from "./carritoContext/carritoContext";
import DetalleProducto from "./detalles/detalles";
import Listado from "./listado/listado";



const App = () => {
  return (
    <CarritoProvider>
      <div>
          <Header/>
        <Routes>
          <Route path="/" element={<Buscar />} />
          <Route path="/listado" element={<Listado />} />
          <Route path="/detalle/:id" element={<DetalleProducto />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </div>
    </CarritoProvider>
  );
};

export default App;
