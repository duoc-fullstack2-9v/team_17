import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MantenedorUsuarios from '../../src/pages/MantenedorUsuarios';

vi.mock('../../src/components/Nav', () => ({
    default: () => <nav>Nav Mock</nav>
}));

vi.mock('../../src/components/Footer', () => ({
    default: () => <footer>Footer Mock</footer>
}));

vi.mock('../../src/data/usuarios.json', () => ({
    default: [
        { "id": 1, "nombre": "Ana", "apellido": "González", "email": "ana@correo.com", "rol": "Admin" },
        { "id": 2, "nombre": "Carlos", "apellido": "Pérez", "email": "carlos@correo.com", "rol": "Cliente" }
    ]
}));

describe('Página MantenedorUsuarios', () => {

    const user = userEvent.setup();

    it('debe renderizar la lista inicial de usuarios del JSON', () => {
        render(
            <MemoryRouter>
                <MantenedorUsuarios />
            </MemoryRouter>
        );

        expect(screen.getByText('Mantenedor de Usuarios')).toBeInTheDocument();

        expect(screen.getByText('Ana')).toBeInTheDocument();
        expect(screen.getByText('carlos@correo.com')).toBeInTheDocument();
    });

    it('debe filtrar la lista cuando el usuario escribe en la búsqueda', async () => {
        render(
            <MemoryRouter>
                <MantenedorUsuarios />
            </MemoryRouter>
        );

        expect(screen.getByText('Ana')).toBeInTheDocument();
        expect(screen.getByText('Carlos')).toBeInTheDocument();

        const searchBar = screen.getByPlaceholderText(/Buscar por nombre/i);
        await user.type(searchBar, 'Ana');

        expect(screen.getByText('Ana')).toBeInTheDocument();
        expect(screen.queryByText('Carlos')).not.toBeInTheDocument();
    });

    it('debe abrir el modal de "Agregar" con campos vacíos', async () => {
        render(
            <MemoryRouter>
                <MantenedorUsuarios />
            </MemoryRouter>
        );

        await user.click(screen.getByRole('button', { name: /Agregar Nuevo Usuario/i }));

        expect(screen.getByRole('heading', { name: /Agregar Nuevo Usuario/i })).toBeInTheDocument();

        expect(screen.getByLabelText(/Nombre/i)).toHaveValue('');
        expect(screen.getByLabelText(/Email/i)).toHaveValue('');
    });

    it('debe abrir el modal de "Editar" con los campos llenos', async () => {
        render(
            <MemoryRouter>
                <MantenedorUsuarios />
            </MemoryRouter>
        );

        const filaCarlos = screen.getByText('Carlos').closest('tr');
        const botonEditar = filaCarlos.querySelector('.btn-editar');

        await user.click(botonEditar);

        expect(screen.getByRole('heading', { name: /Editar Usuario/i })).toBeInTheDocument();

        expect(screen.getByLabelText(/Nombre/i)).toHaveValue('Carlos');
        expect(screen.getByLabelText(/Email/i)).toHaveValue('carlos@correo.com');
    });

    it('debe eliminar un usuario al hacer clic en Eliminar y confirmar', async () => {
        vi.spyOn(window, 'confirm').mockImplementation(() => true);

        render(
            <MemoryRouter>
                <MantenedorUsuarios />
            </MemoryRouter>
        );

        expect(screen.getByText('Ana')).toBeInTheDocument();

        const filaAna = screen.getByText('Ana').closest('tr');
        const botonEliminar = filaAna.querySelector('.btn-eliminar');
        await user.click(botonEliminar);

        expect(window.confirm).toHaveBeenCalled();

        expect(screen.queryByText('Ana')).not.toBeInTheDocument();
    });
});