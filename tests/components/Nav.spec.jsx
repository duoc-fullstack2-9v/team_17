import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Nav from '../../src/components/Nav';
import { AuthContext } from '../../src/context/AuthContext';

// Mock de la imagen
vi.mock('../../src/assets/assets_img/Logo_huerto_hogar_transparente.png', () => ({ default: 'logo-mock.png' }));

// Helper para renderizar
const renderNav = (authState) => {
    return render(
        <AuthContext.Provider value={authState}>
            <BrowserRouter>
                <Nav />
            </BrowserRouter>
        </AuthContext.Provider>
    );
};

describe('Componente <Nav />', () => {

    // CASO 1: Usuario NO Logueado
    it('Debe mostrar botones de "Iniciar sesión" y Carrito deshabilitado si no hay usuario', () => {
        const estadoVisitante = {
            currentUser: null,
            userRole: null,
            userData: null,
            logout: vi.fn()
        };

        renderNav(estadoVisitante);

        // Verificamos botón de login
        expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();

        // Verificamos que NO aparece cerrar sesión ni Admin
        expect(screen.queryByText('Cerrar sesión')).not.toBeInTheDocument();
        expect(screen.queryByText(/Admin/i)).not.toBeInTheDocument();

        // Verificamos Carrito Deshabilitado
        // Nota: Si usas <button disabled>, .toBeDisabled() funciona.
        // Si usas un <a> con estilos css, verifica que tenga la clase correcta.
        const btnCarrito = screen.getByText('Ver Carrito');
        expect(btnCarrito).toBeDisabled();
    });

    // CASO 2: Usuario Logueado (Cliente)
    it('Debe mostrar "Cerrar sesión" y Carrito habilitado si es cliente', () => {
        const estadoCliente = {
            currentUser: { uid: '123', displayName: 'Juan' },
            userRole: 'usuario',
            userData: { nombre: 'Juan' },
            logout: vi.fn()
        };

        renderNav(estadoCliente);

        // YA NO buscamos "Bienvenido" porque lo quitaste del componente
        // expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument(); <--- ELIMINADO

        // Verificamos logout
        expect(screen.getByText('Cerrar sesión')).toBeInTheDocument();

        // Verificamos que el carrito esté habilitado (ahora es un enlace/Link)
        const btnCarrito = screen.getByText('Ver Carrito');
        expect(btnCarrito).not.toBeDisabled();
        // Opcional: verificar que apunte a la ruta correcta
        expect(btnCarrito.closest('a')).toHaveAttribute('href', '/Carrito');

        // Verificamos que NO vea el botón de Admin
        expect(screen.queryByText(/Admin/i)).not.toBeInTheDocument();
    });

    // CASO 3: Usuario Administrador
    it('Debe mostrar el botón de "Admin" si el rol es administrador', () => {
        const estadoAdmin = {
            currentUser: { uid: '999' },
            userRole: 'admin',
            userData: { nombre: 'Jefe' },
            logout: vi.fn()
        };

        renderNav(estadoAdmin);

        expect(screen.getByText(/Admin/i)).toBeInTheDocument();
    });

    // CASO 4: Funcionalidad Logout
    it('Debe llamar a la función logout al hacer click en "Cerrar sesión"', () => {
        const mockLogout = vi.fn();
        const estadoLogueado = {
            currentUser: { uid: '123' },
            userRole: 'usuario',
            userData: { nombre: 'Test' },
            logout: mockLogout
        };

        renderNav(estadoLogueado);

        const btnLogout = screen.getByText('Cerrar sesión');
        fireEvent.click(btnLogout);

        expect(mockLogout).toHaveBeenCalledTimes(1);
    });
});