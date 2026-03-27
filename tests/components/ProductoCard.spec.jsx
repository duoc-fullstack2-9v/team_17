import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
// Asegúrate de que esta ruta apunte correctamente a tu componente
import ProductoCard from '../../src/components/ProductoCard';

// Datos de prueba (Mock)
const productoMock = {
    id: 99,
    nombre: "Manzana Fuji",
    precio: 1500,
    img: "test.jpg",
    stock: 20
};

describe('Componente <ProductoCard />', () => {

    it('Debe mostrar el nombre y el precio formateado correctamente', () => {
        // Envolvemos en BrowserRouter porque ProductoCard usa <Link>
        render(
            <BrowserRouter>
                <ProductoCard producto={productoMock} onAgregar={() => { }} />
            </BrowserRouter>
        );

        // Verificamos que el nombre esté en el documento
        expect(screen.getByText("Manzana Fuji")).toBeInTheDocument();

        // Verificamos el precio. Usamos una función para ser flexibles con el formato ($ 1.500 o $1.500)
        expect(screen.getByText((content) => content.includes('1.500'))).toBeInTheDocument();
    });

    it('Debe llamar a la función onAgregar cuando se hace click en el botón', () => {
        // Creamos una función espía para verificar si se llama
        const handleAgregar = vi.fn();

        render(
            <BrowserRouter>
                <ProductoCard producto={productoMock} onAgregar={handleAgregar} />
            </BrowserRouter>
        );

        // Buscamos el botón. Ajusta el texto según lo que diga tu botón real (ej: "Agregar al carrito")
        const boton = screen.getByRole('button');

        // Simulamos el click
        fireEvent.click(boton);

        // Verificamos que la función se llamó 1 vez y con el producto correcto
        expect(handleAgregar).toHaveBeenCalledTimes(1);
        expect(handleAgregar).toHaveBeenCalledWith(productoMock);
    });
});