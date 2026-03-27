import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Nosotros from '../../src/pages/Nosotros';
import { AuthContext } from '../../src/context/AuthContext';

vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Mock Nav</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Mock Footer</footer> }));

describe('Página <Nosotros />', () => {

    it('Debe renderizar el título principal', () => {
        render(
            <AuthContext.Provider value={{ currentUser: null }}>
                <BrowserRouter>
                    <Nosotros />
                </BrowserRouter>
            </AuthContext.Provider>
        );


        expect(screen.getByText(/Nuestra Raíz/i)).toBeInTheDocument();


        expect(screen.getByText(/Cultivando confianza/i)).toBeInTheDocument();
    });

    it('Debe mostrar la sección de Pilares', () => {
        render(
            <AuthContext.Provider value={{ currentUser: null }}>
                <BrowserRouter>
                    <Nosotros />
                </BrowserRouter>
            </AuthContext.Provider>
        );


        expect(screen.getByText('Sustentabilidad')).toBeInTheDocument();
        expect(screen.getByText('Comercio Justo')).toBeInTheDocument();
        expect(screen.getByText('Frescura Garantizada')).toBeInTheDocument();
    });
});