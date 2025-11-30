import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/assets_img/Logo_huerto_hogar_transparente.png';
import '../assets/assets_css/main.css';
import { useAuth } from '../context/AuthContext';

function Nav() {
    // 1. Ahora extraemos 'userData' también
    const { currentUser, userRole, userData, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    // 2. LÓGICA DE NOMBRE MEJORADA:
    // Prioridad 1: Nombre en base de datos MySQL (userData.nombre)
    // Prioridad 2: Nombre en Firebase (currentUser.displayName)
    // Prioridad 3: "Usuario"
    const nombreUsuario = userData?.nombre
        ? userData.nombre
        : (currentUser?.displayName ? currentUser.displayName.split(' ')[0] : "Usuario");

    // 3. VALIDACIÓN DE ADMIN MÁS ROBUSTA:
    // Convertimos a minúsculas para comparar, así funciona con "Admin", "admin" o "ADMIN"
    const esAdmin = userRole && userRole.toLowerCase() === 'admin';

    return (
        <nav className="navbar">
            <Link to="/">
                <img className="Logo" src={logo} alt="Huerto Hogar Logo" />
            </Link>

            <ul className="nav-links">
                <Link className="nav-link" to="/">Inicio</Link>
                <Link className="nav-link" to="/Productos">Productos</Link>
                <Link className="nav-link" to="/Nosotros">Nosotros</Link>
                <Link className="nav-link" to="/Blogs">Blogs</Link>
                <Link className="nav-link" to="/Contacto">Contacto</Link>
            </ul>

            <div className="nav-actions">

                {/* Botón Admin: Usamos la variable 'esAdmin' corregida */}
                {currentUser && esAdmin && (
                    <Link to="/Mantenedor" className="btn-nav btn-admin">
                        ⚙️ Admin
                    </Link>
                )}



                {currentUser ? (
                    <button onClick={handleLogout} className="btn-nav btn-logout">
                        Cerrar sesión
                    </button>
                ) : (
                    <Link to="/Ingreso" className="btn-nav btn-login">
                        Iniciar sesión
                    </Link>
                )}

                {currentUser ? (
                    <Link to="/Carrito" className="btn-nav btn-carrito">
                        Ver Carrito
                    </Link>
                ) : (
                    <button className="btn-nav btn-carrito-disabled" disabled title="Inicia sesión para ver">
                        Ver Carrito
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Nav;