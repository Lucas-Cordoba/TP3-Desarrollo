import React from 'react';
import { Link } from 'react-router-dom';
import ContadorCarrito from '../contadorCarrito/contadorCarrito';

const Header = () => {
    return (
        <header className='bg-light shadow p-3 mb-2 bg-white rounded sticky-top'>
            <div className="container">
                <div className="row align-items-center">
                    {/* Título */}
                    <div className="col-lg-4 col-md-12 d-flex justify-content-center justify-content-lg-start mb-3">
                        <h1 className="text-center text-lg-start">E-commerce DDS</h1>
                    </div>
                    {/* Navegación y Carrito */}
                    <div className="col-lg-4 col-md-12 d-flex justify-content-center justify-content-lg-end mb-3">
                        <nav className="d-flex align-items-center">
                            <ul className="nav m-0">
                                <li className="nav-item me-2"> {/* Ajustar separación */}
                                    <Link className="nav-link text-dark fw-bold fs-5 border border-dark rounded" to="/">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <ContadorCarrito />
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {/* Espacio vacío para la alineación correcta */}
                    <div className="col-lg-4 d-none d-lg-flex justify-content-lg-end"></div>
                </div>
            </div>
        </header>
    );
};

export default Header;
