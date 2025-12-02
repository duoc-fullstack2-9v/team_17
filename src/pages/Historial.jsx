import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuth } from '../context/AuthContext';
import * as ordenService from '../services/OrdenService';
import '../assets/assets_css/historial.css';

function Historial() {
    const { currentUser } = useAuth();
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (currentUser) {
            cargarHistorial();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    const cargarHistorial = async () => {
        try {
            const data = await ordenService.historialCompras(currentUser.uid);
            const ordenesOrdenadas = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
            setOrdenes(ordenesOrdenadas);
        } catch (error) {
            console.error("Error cargando historial:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatearFecha = (fechaString) => {
        if (!fechaString) return "Fecha desconocida";
        const fecha = new Date(fechaString);
        return fecha.toLocaleDateString('es-CL', {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (!currentUser) {
        return (
            <>
                <Nav />
                <div className="historial-mensaje">
                    <h2>Inicia sesión para ver tus compras</h2>
                    <Link to="/Ingreso" className="btn-volver">Ir a Login</Link>
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
                <div className="hero-historial">
                    <div className="header-historial">
                        <h1>Mis Compras Pasadas</h1>
                        <Link to="/Carrito" className="btn-volver-carrito">← Volver al Carrito</Link>
                    </div>

                    {loading ? (
                        <p>Cargando historial...</p>
                    ) : ordenes.length === 0 ? (
                        <div className="historial-mensaje">
                            <p>Aún no has realizado ninguna compra.</p>
                            <Link to="/Productos" className="btn-ir-tienda">Ir a la Tienda</Link>
                        </div>
                    ) : (
                        <div className="lista-ordenes">
                            {ordenes.map((orden) => (
                                <div key={orden.id} className="orden-card">
                                    <div className="orden-header">
                                        <div className="orden-info">
                                            <h3>Orden #{orden.id}</h3>
                                            <span className="fecha">{formatearFecha(orden.fecha)}</span>
                                        </div>
                                        <div className="orden-total">
                                            Total: ${orden.total?.toLocaleString('es-CL')}
                                        </div>
                                    </div>

                                    <div className="orden-body">
                                        <p className="estado">Estado: <strong>{orden.estado || "Completada"}</strong></p>

                                        {orden.detalles && orden.detalles.length > 0 && (
                                            <div className="orden-detalles">
                                                <h4>Productos:</h4>
                                                <ul>
                                                    {orden.detalles.map((detalle, index) => (
                                                        <li key={index}>
                                                            {detalle.productoNombre || "Producto"} x {detalle.cantidad}
                                                            <span className="precio-detalle">
                                                                (${detalle.precioUnitario?.toLocaleString('es-CL')})
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Historial;