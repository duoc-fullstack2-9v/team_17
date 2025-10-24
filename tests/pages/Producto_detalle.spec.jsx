import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Producto_detalle from '../../src/pages/Producto_detalle';

vi.mock('../../src/components/Nav', () => ({
    default: () => <nav>Nav Mock</nav>
}));

vi.mock('../../src/components/Footer', () => ({
    default: () => <footer>Footer Mock</footer>
}));

describe('Página Producto_detalle', () => {

    it('debe mostrar los detalles de la Naranja (ID 1) cuando la URL es /Producto/1', () => {

        render(
            <MemoryRouter initialEntries={['/Producto/1']}>
                <Routes>
                    <Route path="/Producto/:id" element={<Producto_detalle />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText('Naranjas')).toBeInTheDocument();
        expect(screen.getByText(/Jugosas y ricas en vitamina C/i)).toBeInTheDocument();
        expect(screen.getByAltText('Naranjas')).toBeInTheDocument();
    });

    it('debe navegar a /Productos cuando el usuario hace clic en "Volver"', async () => {
        const user = userEvent.setup();

        const PaginaProductosMock = () => <div>Página de Productos</div>;

        render(
            <MemoryRouter initialEntries={['/Producto/1']}>
                <Routes>
                    <Route path="/Producto/:id" element={<Producto_detalle />} />
                    <Route path="/Productos" element={<PaginaProductosMock />} />
                </Routes>
            </MemoryRouter>
        );

        await user.click(screen.getByRole('button', { name: /Volver/i }));

        expect(screen.getByText('Página de Productos')).toBeInTheDocument();
    });

});