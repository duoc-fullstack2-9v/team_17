import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Ingreso from '../../src/pages/Ingreso';

vi.mock('../../src/components/Nav', () => ({
    default: () => <nav>Nav Mock</nav>
}));

vi.mock('../../src/components/Footer', () => ({
    default: () => <footer>Footer Mock</footer>
}));

describe('Página Ingreso', () => {

    it('debe renderizar el título "Iniciar sesión"', () => {
        render(
            <MemoryRouter>
                <Ingreso />
            </MemoryRouter>
        );
        expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    });

    it('debe renderizar los campos de email y contraseña', () => {
        render(
            <MemoryRouter>
                <Ingreso />
            </MemoryRouter>
        );

        expect(screen.getByText('Correo electrónico')).toBeInTheDocument();
        expect(screen.getByText('Contraseña')).toBeInTheDocument();

        expect(screen.getByPlaceholderText('ejemplo@gmail.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('********')).toBeInTheDocument();
    });

    it('debe renderizar el botón de Ingresar y el enlace a Registro', () => {
        render(
            <MemoryRouter>
                <Ingreso />
            </MemoryRouter>
        );

        expect(screen.getByRole('button', { name: /Ingresar/i })).toBeInTheDocument();

        expect(screen.getByRole('link', { name: /Regístrate aquí/i })).toBeInTheDocument();
    });

});