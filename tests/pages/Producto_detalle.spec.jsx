import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Producto_detalle from '../../src/pages/Producto_detalle';
import { AuthContext } from '../../src/context/AuthContext';

vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Nav Mock</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Footer Mock</footer> }));

vi.mock('../../src/services/ProductoService', () => ({
    obtenerProducto: vi.fn((id) => Promise.resolve({
        id: id,
        nombre: 'Naranjas',
        descripcion: 'Jugosas y ricas en vitamina C',
        precio: 1500,
        stock: 10,
        img: 'naranja.jpg'
    }))
}));

describe('Página Producto_detalle', () => {

    it('debe mostrar los detalles del producto', async () => {
        const mockAuth = { currentUser: { uid: '123' } };

        render(
            <AuthContext.Provider value={mockAuth}>
                <MemoryRouter initialEntries={['/Producto/1']}>
                    <Routes>
                        <Route path="/Producto/:id" element={<Producto_detalle />} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(await screen.findByText('Naranjas')).toBeInTheDocument();
        expect(screen.getByText(/Jugosas y ricas/i)).toBeInTheDocument();
    });

    it('debe navegar a /Productos al hacer click en Volver', async () => {
        const user = userEvent.setup();
        const mockAuth = { currentUser: { uid: '123' } };
        const PaginaProductosMock = () => <div>Página de Productos</div>;

        render(
            <AuthContext.Provider value={mockAuth}>
                <MemoryRouter initialEntries={['/Producto/1']}>
                    <Routes>
                        <Route path="/Producto/:id" element={<Producto_detalle />} />
                        <Route path="/Productos" element={<PaginaProductosMock />} />
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        await screen.findByText('Naranjas');

        const btnVolver = screen.getByRole('button', { name: /Volver/i });
        await user.click(btnVolver);

        expect(screen.getByText('Página de Productos')).toBeInTheDocument();
    });
});