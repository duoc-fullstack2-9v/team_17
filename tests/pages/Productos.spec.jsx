import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Productos from '../../src/pages/Productos';

vi.mock('../../src/components/Nav', () => ({
    default: () => <nav>Nav Mock</nav>
}));

vi.mock('../../src/components/Footer', () => ({
    default: () => <footer>Footer Mock</footer>
}));

describe('Página Productos', () => {

    it('debe renderizar los botones de categoría y los productos', () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );

        expect(screen.getByRole('button', { name: /Verduras/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Frutas/i })).toBeInTheDocument();

        expect(screen.getByText('Producto A')).toBeInTheDocument();
        expect(screen.getByText('$1.200')).toBeInTheDocument();
        expect(screen.getByText('Producto E')).toBeInTheDocument();
        expect(screen.getByText('$1.600')).toBeInTheDocument();
    });

    it('debe tener un enlace que apunte a /Producto/1 para el Producto A', () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );

        const linkProductoA = screen.getByAltText('Producto A').closest('a');

        expect(linkProductoA).toHaveAttribute('href', '/Producto/1');
    });

});