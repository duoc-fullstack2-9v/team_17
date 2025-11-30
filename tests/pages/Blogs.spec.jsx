import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Blogs from '../../src/pages/Blogs';
import { AuthContext } from '../../src/context/AuthContext';

vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Mock Nav</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Mock Footer</footer> }));

describe('Página <Blogs />', () => {

    it('Debe renderizar el título y subtítulo del Blog', () => {
        render(
            <AuthContext.Provider value={{ currentUser: null }}>
                <BrowserRouter>
                    <Blogs />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText(/Blog HuertoHogar/i)).toBeInTheDocument();

        expect(screen.getByText(/Noticias, consejos y recetas/i)).toBeInTheDocument();
    });

    it('Debe listar los artículos correctamente', () => {
        render(
            <AuthContext.Provider value={{ currentUser: null }}>
                <BrowserRouter>
                    <Blogs />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText(/Recetas con Manzanas/i)).toBeInTheDocument();
        expect(screen.getByText(/conservar tus verduras/i)).toBeInTheDocument();
        expect(screen.getByText(/Beneficios de los Frutos/i)).toBeInTheDocument();

        const botones = screen.getAllByText(/Leer más/i);
        expect(botones.length).toBeGreaterThan(0);
    });
});