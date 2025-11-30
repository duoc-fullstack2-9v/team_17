import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../src/pages/Home';
import { AuthContext } from '../../src/context/AuthContext';

vi.mock('../../src/components/Nav', () => ({ default: () => <nav>Mock Nav</nav> }));
vi.mock('../../src/components/Footer', () => ({ default: () => <footer>Mock Footer</footer> }));

vi.mock('../../src/assets/assets_img/verduras.png', () => ({ default: 'verduras.png' }));
vi.mock('../../src/assets/assets_img/fruits.png', () => ({ default: 'fruits.png' }));
vi.mock('../../src/assets/assets_img/spices.png', () => ({ default: 'spices.png' }));
vi.mock('../../src/assets/assets_img/snack.png', () => ({ default: 'snack.png' }));
vi.mock('../../src/assets/assets_img/naranja2.png', () => ({ default: 'img' }));
vi.mock('../../src/assets/assets_img/papas2.png', () => ({ default: 'img' }));
vi.mock('../../src/assets/assets_img/platano2.png', () => ({ default: 'img' }));
vi.mock('../../src/assets/assets_img/apple2.png', () => ({ default: 'img' }));
vi.mock('../../src/assets/assets_img/cebolla2.png', () => ({ default: 'img' }));

describe('Página <Home />', () => {

    it('Debe renderizar la presentación de la tienda', () => {
        render(
            <AuthContext.Provider value={{ currentUser: null }}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText(/HuertoHogar es una tienda online/i)).toBeInTheDocument();
        expect(screen.getByText(/Nuestra misión es conectar/i)).toBeInTheDocument();
    });

    it('Debe mostrar las categorías principales', () => {
        render(
            <AuthContext.Provider value={{ currentUser: null }}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Verduras')).toBeInTheDocument();
        expect(screen.getByText('Frutas')).toBeInTheDocument();
        expect(screen.getByText('Especias')).toBeInTheDocument();
        expect(screen.getByText('Snacks')).toBeInTheDocument();
    });
});