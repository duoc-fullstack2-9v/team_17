import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from '../../src/components/Nav';

describe('Componente Nav', () => {
    it('debe renderizar el enlace de Inicio', () => {
        render(
            <MemoryRouter>
                <Nav />
            </MemoryRouter>
        );

        expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    });
});