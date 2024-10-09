import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./header/header";
import Buscar from "./buscar/buscar";
import Carrito from "./carrito/carrito";
import { CarritoProvider } from "./carritoContext/carritoContext";
import DetalleProducto from "./detalles/detalles";
import Listado from "./listado/listado";
import Footer from "./footer/footer"



const App = () => {
  return (
    <CarritoProvider>
      <div className="d-flex flex-column min-vh-100">
          <Header/>
          <div>
            <Routes className="flex-grow-1">
              <Route path="/" element={<Buscar />} />
              <Route path="/listado" element={<Listado />} />
              <Route path="/detalle/:id" element={<DetalleProducto />} />
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </div>
        
        <Footer/>
      </div>
    </CarritoProvider>
  );
};

export default App;
