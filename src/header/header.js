import React from 'react';
import { Link } from 'react-router-dom';
import ContadorCarrito from '../contadorCarrito/contadorCarrito'; // Asegúrate de que la ruta sea correcta

const Header = () => {
    return (
        <header className='bg-light p-3 sticky-top'>
            <div className="container d-flex justify-content-between align-items-center">
                <h1 className="me-auto">E-commerce DDS</h1>
                <nav className="d-flex align-items-center">
                    <ul className="nav me-3">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                    </ul>
                    <div className="d-flex align-items-center ms-3"> {/* Añadido para margen */}
                        <ContadorCarrito />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
