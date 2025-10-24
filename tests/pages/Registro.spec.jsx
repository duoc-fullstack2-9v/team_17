import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Registro from '../../src/pages/Registro';

vi.mock('../../src/components/Nav', () => ({
    default: () => <nav>Nav Mock</nav>
}));

vi.mock('../../src/components/Footer', () => ({
    default: () => <footer>Footer Mock</footer>
}));

describe('Página Registro', () => {

    it('debe renderizar el título "Crear Cuenta"', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );
        expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();
    });

    it('debe renderizar todos los campos del formulario de registro', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();

        expect(screen.getByLabelText(/^Contraseña$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmar Contraseña/i)).toBeInTheDocument();
    });

    it('debe renderizar el botón de Registrarme y el enlace a Ingreso', () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        expect(screen.getByRole('button', { name: /Registrarme/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Inicia sesión aquí/i })).toBeInTheDocument();
    });

});