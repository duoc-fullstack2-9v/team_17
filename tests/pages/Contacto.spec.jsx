import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Contacto from '../../src/pages/Contacto';
import { AuthContext } from '../../src/context/AuthContext';

vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Mock Nav</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Mock Footer</footer> }));

describe('Página <Contacto />', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Debe renderizar la información de contacto y el formulario', () => {
        render(
            <AuthContext.Provider value={{ currentUser: null }}>
                <BrowserRouter>
                    <Contacto />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
        expect(screen.getByText(/Oficina Central/i)).toBeInTheDocument();
        expect(screen.getByText(/contacto@huertohogar.cl/i)).toBeInTheDocument();

        expect(screen.getByText('Nombre')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Mensaje')).toBeInTheDocument();
    });

    it('Debe permitir enviar el formulario correctamente', () => {
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => { });

        const { container } = render(
            <AuthContext.Provider value={{ currentUser: null }}>
                <BrowserRouter>
                    <Contacto />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        const inputNombre = container.querySelector('input[type="text"]');
        const inputEmail = container.querySelector('input[type="email"]');
        const inputMensaje = container.querySelector('textarea');

        fireEvent.change(inputNombre, { target: { value: 'Cliente Feliz' } });
        fireEvent.change(inputEmail, { target: { value: 'cliente@test.com' } });
        fireEvent.change(inputMensaje, { target: { value: 'Hola, quiero cotizar.' } });

        const btnEnviar = screen.getByRole('button', { name: /Enviar Mensaje/i });
        fireEvent.click(btnEnviar);

        expect(alertMock).toHaveBeenCalledWith(expect.stringContaining('Gracias Cliente Feliz'));
    });
});