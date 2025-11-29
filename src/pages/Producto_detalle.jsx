import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Componentes UI
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import '../assets/assets_css/producto_detalle.css';

// Importamos los servicios (usando 'import * as' para evitar errores)
import * as productoService from '../services/ProductoService';
import * as carritoService from '../services/CarritoService';
import { useAuth } from '../context/AuthContext';

function Producto_detalle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // Estados
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1); // Estado para la cantidad a comprar

    const IMAGEN_POR_DEFECTO = "https://placehold.co/500x500?text=Sin+Imagen";

    // 1. Cargar el producto desde el Backend
    useEffect(() => {
        const cargarDetalle = async () => {
            setLoading(true);
            try {
                const data = await productoService.obtenerProducto(id);
                setProducto(data);
            } catch (error) {
                console.error("Error al cargar producto:", error);
            }
            setLoading(false);
        };
        if (id) cargarDetalle();
    }, [id]);

    // 2. Lógica para aumentar/disminuir cantidad
    const decrementar = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
    };

    const incrementar = () => {
        // No permitir seleccionar más del stock disponible
        if (producto.stock && cantidad >= producto.stock) return;
        setCantidad(cantidad + 1);
    };

    // 3. Agregar al Carrito
    const handleAgregar = async () => {
        if (!currentUser) {
            alert("Debes iniciar sesión para comprar.");
            return;
        }
        try {
            await carritoService.agregarAlCarrito(currentUser.uid, producto.id, cantidad);
            alert(`Se agregaron ${cantidad} unidades al carrito.`);
        } catch (error) {
            console.error(error);
            alert("Error al agregar al carrito.");
        }
    };

    // Render de Carga
    if (loading) return (
        <>
            <Nav />
            <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h2>Cargando detalle...</h2>
            </div>
            <Footer />
        </>
    );

    // Render si no existe
    if (!producto) return (
        <>
            <Nav />
            <div style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <h2>Producto no encontrado</h2>
                <button className="detalle_button" onClick={() => navigate('/Productos')}>Volver al catálogo</button>
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>
                <div className="hero-prodDet">
                    <div className="hero-prodDet_content">

                        {/* COLUMNA IZQUIERDA: IMAGEN */}
                        <div className="hero-prodDet_content_image">
                            <img
                                src={producto.img || IMAGEN_POR_DEFECTO}
                                alt={producto.nombre}
                                onError={(e) => e.target.src = IMAGEN_POR_DEFECTO}
                            />
                        </div>

                        {/* COLUMNA DERECHA: INFORMACIÓN */}
                        <div className="hero-prodDet_content_detalle">
                            <div className="hero-prodDet_content_detalle_desc">
                                <p className="desc_titulo">{producto.nombre}</p>

                                <p className="desc_resto">
                                    {producto.descripcion || "Sin descripción disponible."}
                                </p>

                                {/* CUADRO DE COMPRA (Precio, Cantidad, Stock) */}
                                <div className="detalle-compra-card">
                                    <div className="precio-grande">
                                        ${producto.precio?.toLocaleString('es-CL')}
                                    </div>

                                    <div className="selector-cantidad">
                                        <button className="btn-cantidad" onClick={decrementar}>-</button>
                                        <span className="numero-cantidad">{cantidad}</span>
                                        <button className="btn-cantidad" onClick={incrementar}>+</button>
                                    </div>

                                    <p className="stock-info">
                                        {producto.stock > 0
                                            ? `Stock: ${producto.stock} disponibles`
                                            : <span style={{ color: 'red' }}>Sin Stock</span>
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* BOTONES DE ACCIÓN */}
                            <div className="hero-prodDet_content_detalle_botones">
                                <button className="detalle_button" onClick={() => navigate('/Productos')}>
                                    Volver
                                </button>
                                <button
                                    className="detalle_button"
                                    onClick={handleAgregar}
                                    // Se deshabilita si NO hay usuario O si NO hay stock
                                    disabled={!currentUser || producto.stock <= 0}
                                    title={!currentUser ? "Inicia sesión para comprar" : ""}
                                >
                                    {producto.stock <= 0 ? "Sin Stock" : "Agregar al Carrito"}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Producto_detalle;