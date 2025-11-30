import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Ingreso from '../../src/pages/Ingreso';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../../src/context/AuthContext';

const mockLogin = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const mod = await vi.importActual('react-router-dom');
    return { ...mod, useNavigate: () => mockNavigate };
});

vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Mock Nav</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Mock Footer</footer> }));

describe('Página <Ingreso />', () => {

    const renderIngreso = () => {
        render(
            <AuthContext.Provider value={{ login: mockLogin }}>
                <BrowserRouter>
                    <Ingreso />
                </BrowserRouter>
            </AuthContext.Provider>
        );
    };

    it('Debe renderizar el formulario de login', () => {
        renderIngreso();
        expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    });

    it('Debe llamar a login con las credenciales ingresadas', async () => {
        renderIngreso();

        fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@duoc.cl' } });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });

        fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith('test@duoc.cl', '123456');
        });
    });
});