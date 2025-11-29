import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductoCard({ producto, onAgregar }) {
    // Imagen de respaldo por si la URL de la base de datos falla o viene vacía
    const IMAGEN_POR_DEFECTO = "https://placehold.co/400x300?text=Sin+Imagen";

    // Función que se ejecuta si la imagen no carga (404, error de red, etc.)
    const handleImageError = (e) => {
        e.target.src = IMAGEN_POR_DEFECTO;
    };

    return (
        <div className="hero-prod_content_productos_cuadro">
            {/* El Link envuelve la imagen para ir al detalle */}
            <Link to={`/Producto/${producto.id}`}>
                <img
                    src={producto.img || IMAGEN_POR_DEFECTO}
                    alt={producto.nombre}
                    onError={handleImageError}
                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                />
            </Link>

            <p className="producto-nombre">{producto.nombre}</p>

            {/* Formato de moneda (ej: $1.500) */}
            <p className="producto-precio">
                ${producto.precio?.toLocaleString('es-CL')}
            </p>

            <button
                className="producto-boton"
                onClick={() => onAgregar(producto)}
            >
                Agregar al carrito
            </button>
        </div>
    );
}