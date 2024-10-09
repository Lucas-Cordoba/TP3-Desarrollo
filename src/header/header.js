import React from 'react';
import { Link } from 'react-router-dom';
import ContadorCarrito from '../contadorCarrito/contadorCarrito';

const Header = () => {
    return (
        <header className='bg-light shadow p-3 mb-5 bg-white rounded sticky-top'>
            <div className="container">
                <div className="row flex-column flex-lg-row">
                    <div className="col-lg-4 col-md-12 mb-3 d-flex align-items-center justify-content-center">
                        <h1 className="text-center">E-commerce DDS</h1>
                    </div>
                    <div className="col-lg-4 col-md-12 mb-3 d-flex justify-content-end align-items-center">
                        <nav>
                            <ul className="nav m-0"> {/* Eliminar márgenes aquí */}
                                <li className="nav-item me-0"> {/* Eliminar margen derecho */}
                                    <Link className="nav-link" to="/">Inicio</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-lg-4 col-md-12 mb-3 d-flex justify-content-center align-items-center">
                        <ContadorCarrito className="ms-0" /> {/* Asegúrate de que no tenga margen izquierdo */}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
