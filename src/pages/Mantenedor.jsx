import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

import TablaUsuarios from '../components/mantenedor/TablaUsuarios';
import TablaProductos from '../components/mantenedor/TablaProductos';

import '../assets/assets_css/mantenedor.css';
import '../assets/assets_css/autenticacion.css';

function Mantenedor() {
    const { userRole, currentUser } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('usuarios');

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!currentUser || userRole?.toLowerCase() !== 'admin') {
                navigate('/');
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [currentUser, userRole, navigate]);

    if (!currentUser || userRole?.toLowerCase() !== 'admin') {
        return (
            <>
                <Nav />
                <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Verificando permisos de administrador...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>
                <div className="hero-auth">
                    <div className="hero-auth-contenido" style={{ width: '95%', maxWidth: '1200px' }}>

                        <div className="hero-auth-contenido-techo">
                            <p className="titulo">Panel de Administración</p>
                        </div>

                        <div className="mantenedor-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'usuarios' ? 'active' : ''}`}
                                onClick={() => setActiveTab('usuarios')}
                            >
                                👥 Usuarios
                            </button>
                            <button
                                className={`tab-btn ${activeTab === 'productos' ? 'active' : ''}`}
                                onClick={() => setActiveTab('productos')}
                            >
                                🍎 Productos
                            </button>
                        </div>

                        {activeTab === 'usuarios' ? (
                            <TablaUsuarios />
                        ) : (
                            <TablaProductos />
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Mantenedor;