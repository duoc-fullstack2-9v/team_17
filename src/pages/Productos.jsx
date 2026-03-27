import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Footer from "../components/Footer.jsx";
import Nav from "../components/Nav.jsx";
import ProductoCard from '../components/ProductoCard.jsx';
import '../assets/assets_css/productos.css';

import * as productoService from '../services/ProductoService.jsx';
import * as carritoService from '../services/CarritoService.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Productos() {
    const [productos, setProductos] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState('Todos');
    const [paginaActual, setPaginaActual] = useState(1);
    const [loading, setLoading] = useState(true);

    const { currentUser } = useAuth();
    const location = useLocation();
    const productosPorPagina = 15;

    const CATEGORIAS_PRINCIPALES = ['Verduras', 'Frutas', 'Especias', 'Snacks'];

    useEffect(() => {
        const categoriaInicial = location.state?.categoria || 'Todos';
        cargarProductos(categoriaInicial);
        window.history.replaceState({}, document.title);
    }, [location.state]);

    const cargarProductos = async (categoriaSeleccionada) => {
        setLoading(true);
        try {
            const todosLosProductos = await productoService.listarProductos();

            let productosFiltrados;

            if (categoriaSeleccionada === 'Todos') {
                productosFiltrados = todosLosProductos;

            } else if (CATEGORIAS_PRINCIPALES.includes(categoriaSeleccionada)) {
                productosFiltrados = todosLosProductos.filter(p =>
                    p.categoria === categoriaSeleccionada
                );

            } else if (categoriaSeleccionada === 'Otros') {
                productosFiltrados = todosLosProductos.filter(p =>
                    !CATEGORIAS_PRINCIPALES.includes(p.categoria)
                );
            } else {
                productosFiltrados = todosLosProductos;
            }

            setProductos(productosFiltrados);
            setCategoriaActual(categoriaSeleccionada);
            setPaginaActual(1);

        } catch (error) {
            console.error("Error al cargar productos:", error);
            setProductos([]);
        }
        setLoading(false);
    };

    const handleAgregarCarrito = async (producto) => {
        if (!currentUser) {
            alert("Por favor, inicia sesión para agregar productos al carrito.");
            return;
        }
        try {
            await carritoService.agregarAlCarrito(currentUser.uid, producto.id, 1);
            alert(`¡${producto.nombre} agregado al carrito!`);
        } catch (error) {
            console.error("Error al agregar:", error);
            alert("Hubo un problema al agregar el producto.");
        }
    };

    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosVisibles = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    const cambiarPagina = (nuevaPagina) => {
        if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
            setPaginaActual(nuevaPagina);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>
                <div className="hero-prod">
                    <div className="hero-prod_content">

                        <div className="hero-prod_content_categorias">
                            {['Todos', ...CATEGORIAS_PRINCIPALES, 'Otros'].map((cat) => (
                                <button
                                    key={cat}
                                    className={`button_categoria ${categoriaActual === cat ? 'active' : ''}`}
                                    onClick={() => cargarProductos(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div className="hero-prod_content_productos">
                            {loading ? (
                                <p style={{ fontSize: '1.5rem', color: '#fff', gridColumn: '1/-1', textAlign: 'center' }}>
                                    Cargando productos...
                                </p>
                            ) : productosVisibles.length > 0 ? (
                                productosVisibles.map((prod) => (
                                    <ProductoCard
                                        key={prod.id}
                                        producto={prod}
                                        onAgregar={handleAgregarCarrito}
                                    />
                                ))
                            ) : (
                                <p style={{ fontSize: '1.5rem', color: '#fff', gridColumn: '1/-1', textAlign: 'center' }}>
                                    No hay productos disponibles en la categoría "{categoriaActual}".
                                </p>
                            )}
                        </div>

                        {totalPaginas > 1 && (
                            <div className="paginacion-container">
                                <button
                                    className="detalle_button"
                                    onClick={() => cambiarPagina(paginaActual - 1)}
                                    disabled={paginaActual === 1}
                                    style={{ opacity: paginaActual === 1 ? 0.5 : 1 }}
                                >
                                    Anterior
                                </button>

                                <span className="paginacion-info">
                                    Página {paginaActual} de {totalPaginas}
                                </span>

                                <button
                                    className="detalle_button"
                                    onClick={() => cambiarPagina(paginaActual + 1)}
                                    disabled={paginaActual === totalPaginas}
                                    style={{ opacity: paginaActual === totalPaginas ? 0.5 : 1 }}
                                >
                                    Siguiente
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Productos;