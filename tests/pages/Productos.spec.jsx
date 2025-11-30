import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../../src/pages/Productos';
import { AuthContext } from '../../src/context/AuthContext';

vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Nav Mock</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Footer Mock</footer> }));

vi.mock('../../src/services/ProductoService', () => ({
    listarProductos: vi.fn(() => Promise.resolve([
        { id: 1, nombre: 'Producto A', precio: 1200, img: 'img1.jpg', categoria: 'Verduras' },
        { id: 2, nombre: 'Producto E', precio: 1600, img: 'img2.jpg', categoria: 'Frutas' }
    ])),
    listarPorCategoria: vi.fn(() => Promise.resolve([]))
}));

describe('Página Productos', () => {

    it('debe renderizar los botones de categoría y los productos', async () => {
        const mockAuth = { currentUser: { uid: '123' } };

        render(
            <AuthContext.Provider value={mockAuth}>
                <MemoryRouter>
                    <Productos />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(await screen.findByText('Producto A')).toBeInTheDocument();
        expect(screen.getByText('$1.200')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Verduras/i })).toBeInTheDocument();
    });

    it('debe tener un enlace correcto para el producto', async () => {
        const mockAuth = { currentUser: { uid: '123' } };

        render(
            <AuthContext.Provider value={mockAuth}>
                <MemoryRouter>
                    <Productos />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const imgProductoA = await screen.findByAltText('Producto A');
        const link = imgProductoA.closest('a');
        expect(link).toHaveAttribute('href', '/Producto/1');
    });
});