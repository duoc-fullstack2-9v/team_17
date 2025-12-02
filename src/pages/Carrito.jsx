import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useAuth } from '../context/AuthContext';
import * as carritoService from '../services/CarritoService';
import * as ordenService from '../services/OrdenService';

import '../assets/assets_css/carrito.css';

function Carrito() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [procesandoCompra, setProcesandoCompra] = useState(false);

    useEffect(() => {
        if (currentUser) {
            cargarDatosCarrito();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    useEffect(() => {
        if (items && items.length > 0) {
            const nuevoTotal = items.reduce((acc, item) => {
                return acc + (item.producto.precio * item.cantidad);
            }, 0);
            setTotal(nuevoTotal);
        } else {
            setTotal(0);
        }
    }, [items]);

    const cargarDatosCarrito = async () => {
        try {
            const data = await carritoService.verCarrito(currentUser.uid);
            setItems(data);
        } catch (error) {
            console.error("Error cargando carrito:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEliminarItem = async (itemId) => {
        if (!window.confirm("¿Eliminar este producto?")) return;

        try {
            await carritoService.eliminarItemCarrito(itemId);
            setItems(prevItems => prevItems.filter(item => item.id !== itemId));
        } catch (error) {
            console.error("Error eliminando item:", error);
            alert("Hubo un error al eliminar el producto.");
        }
    };

    const handleVaciar = async () => {
        if (!window.confirm("¿Seguro que quieres vaciar todo el carrito?")) return;
        try {
            await carritoService.vaciarCarrito(currentUser.uid);
            setItems([]);
        } catch (error) {
            console.error("Error vaciando carrito:", error);
            alert("No se pudo vaciar el carrito.");
        }
    };

    const handlePagar = async () => {
        if (!window.confirm(`¿Confirmar compra por $${total.toLocaleString('es-CL')}?`)) return;

        setProcesandoCompra(true);
        try {
            await ordenService.comprar(currentUser.uid);
            alert("¡Compra realizada con éxito! Puedes ver el detalle en tu historial.");

            setItems([]);
            navigate('/Historial');
        } catch (error) {
            console.error("Error en la compra:", error);
            alert("Hubo un problema al procesar tu compra. Intenta nuevamente.");
        } finally {
            setProcesandoCompra(false);
        }
    };

    if (!currentUser) {
        return (
            <>
                <Nav />
                <div className="carrito-container-mensaje">
                    <h2>Inicia sesión para ver tu carrito</h2>
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

                <div className="hero-carrito">
                    <div className="header-carrito">
                        <h1 className="titulo-carrito">Tu Carrito</h1>

                        <div className="botones-header">
                            <Link to="/Historial" className="btn-historial">
                                📜 Historial de Compras
                            </Link>

                            {items.length > 0 && (
                                <button onClick={handleVaciar} className="btn-vaciar">
                                    Vaciar Carrito
                                </button>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <p className="cargando-texto">Cargando productos...</p>
                    ) : items.length === 0 ? (
                        <div className="carrito-container-mensaje">
                            <p>Tu carrito está vacío.</p>
                            <Link to="/Productos" className="btn-volver">Ir a comprar</Link>
                        </div>
                    ) : (
                        <div className="carrito-grid">
                            <div className="carrito-items">
                                {items.map((item) => (
                                    <div key={item.id} className="item-card">
                                        <div className="item-img">
                                            <img
                                                src={item.producto.img || "https://placehold.co/100"}
                                                alt={item.producto.nombre}
                                                onError={(e) => e.target.src = "https://placehold.co/100?text=Foto"}
                                            />
                                        </div>

                                        <div className="item-info">
                                            <h3>{item.producto.nombre}</h3>
                                            <p className="precio-unitario">
                                                Precio: ${item.producto.precio.toLocaleString('es-CL')}
                                            </p>
                                        </div>

                                        <div className="item-cantidad">
                                            <span>Cant: {item.cantidad}</span>
                                        </div>

                                        <div className="item-subtotal">
                                            <p>${(item.producto.precio * item.cantidad).toLocaleString('es-CL')}</p>
                                        </div>

                                        <div className="item-accion">
                                            <button
                                                onClick={() => handleEliminarItem(item.id)}
                                                className="btn-eliminar-item"
                                                title="Eliminar producto"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="carrito-resumen">
                                <h3>Resumen del Pedido</h3>
                                <div className="resumen-fila">
                                    <span>Subtotal</span>
                                    <span>${total.toLocaleString('es-CL')}</span>
                                </div>
                                <div className="resumen-fila">
                                    <span>Envío</span>
                                    <span>$0</span>
                                </div>
                                <hr />
                                <div className="resumen-total">
                                    <span>Total</span>
                                    <span>${total.toLocaleString('es-CL')}</span>
                                </div>

                                <button
                                    onClick={handlePagar}
                                    className="btn-checkout"
                                    disabled={procesandoCompra}
                                >
                                    {procesandoCompra ? 'Procesando...' : 'Pagar Ahora'}
                                </button>

                                <Link to="/Productos" className="link-seguir-comprando">
                                    Seguir comprando
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Carrito;