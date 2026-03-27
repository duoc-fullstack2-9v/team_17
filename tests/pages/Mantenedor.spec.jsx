import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Mantenedor from '../../src/pages/Mantenedor';
import { AuthContext } from '../../src/context/AuthContext';

// Mocks
vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Nav</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Footer</footer> }));
vi.mock('../../src/components/mantenedor/TablaUsuarios', () => ({ default: () => <div>Tabla Usuarios</div> }));
vi.mock('../../src/components/mantenedor/TablaProductos', () => ({ default: () => <div>Tabla Productos</div> }));

describe('Página <Mantenedor />', () => {
    it('Debe mostrar "Verificando permisos" si no es admin', () => {
        render(
            <AuthContext.Provider value={{ currentUser: { uid: '1' }, userRole: 'cliente' }}>
                <BrowserRouter>
                    <Mantenedor />
                </BrowserRouter>
            </AuthContext.Provider>
        );
        expect(screen.getByText(/Verificando permisos/i)).toBeInTheDocument();
    });

    it('Debe mostrar el Panel si es admin', () => {

        render(
            <AuthContext.Provider value={{ currentUser: { uid: '1' }, userRole: 'admin' }}>
                <BrowserRouter>
                    <Mantenedor />
                </BrowserRouter>
            </AuthContext.Provider>
        );

    });
});