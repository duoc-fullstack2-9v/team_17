import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Registro from '../../src/pages/Registro';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/context/AuthContext';

const mockSignup = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const mod = await vi.importActual('react-router-dom');
    return { ...mod, useNavigate: () => mockNavigate };
});

vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Nav</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Footer</footer> }));

describe('Página <Registro />', () => {

    const renderRegistro = () => {
        render(
            <AuthContext.Provider value={{ signup: mockSignup }}>
                <BrowserRouter>
                    <Registro />
                </BrowserRouter>
            </AuthContext.Provider>
        );
    };

    it('Debe renderizar todos los campos del formulario', () => {
        renderRegistro();
        expect(screen.getByLabelText(/^Nombre$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Apellido$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Teléfono/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Dirección$/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Correo electrónico$/i)).toBeInTheDocument();
    });

    it('Debe mostrar error si las contraseñas no coinciden', async () => {
        renderRegistro();

        fireEvent.change(screen.getByLabelText(/^Contraseña$/i), { target: { value: '123456' } });
        fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: '654321' } });

        fireEvent.click(screen.getByRole('button', { name: /Registrarme/i }));

        await waitFor(() => {
            expect(mockSignup).not.toHaveBeenCalled();
        });
    });

    it('Debe llamar a signup con todos los datos si el formulario es válido', async () => {
        renderRegistro();

        fireEvent.change(screen.getByLabelText(/^Nombre$/i), { target: { value: 'Vicente' } });
        fireEvent.change(screen.getByLabelText(/^Apellido$/i), { target: { value: 'Bravo' } });
        fireEvent.change(screen.getByLabelText(/^Teléfono/i), { target: { value: '987654321' } });
        fireEvent.change(screen.getByLabelText(/^Dirección$/i), { target: { value: 'Calle Falsa 123' } });
        fireEvent.change(screen.getByLabelText(/^Correo electrónico$/i), { target: { value: 'vicente@test.com' } });

        const pass = 'passwordSegura1';
        fireEvent.change(screen.getByLabelText(/^Contraseña$/i), { target: { value: pass } });
        fireEvent.change(screen.getByLabelText(/Confirmar Contraseña/i), { target: { value: pass } });

        const btn = screen.getByRole('button', { name: /Registrarme/i });
        fireEvent.click(btn);

        await waitFor(() => {
            expect(mockSignup).toHaveBeenCalledWith(
                'vicente@test.com',
                pass,
                'Vicente',
                'Bravo',
                '987654321',
                'Calle Falsa 123'
            );
        });
    });
});