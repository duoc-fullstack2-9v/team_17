import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductoCard({ producto, onAgregar }) {
    const IMAGEN_POR_DEFECTO = "https://placehold.co/400x300?text=Sin+Imagen";

    const handleImageError = (e) => {
        e.target.src = IMAGEN_POR_DEFECTO;
    };

    return (
        <div className="hero-prod_content_productos_cuadro">
            <Link to={`/Producto/${producto.id}`}>
                <img
                    src={producto.img || IMAGEN_POR_DEFECTO}
                    alt={producto.nombre}
                    onError={handleImageError}
                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
                />
            </Link>

            <p className="producto-nombre">{producto.nombre}</p>

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