import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../src/pages/Home';

vi.mock('../../src/components/Nav', () => ({
    default: () => <nav>Nav Mock</nav>
}));

vi.mock('../../src/components/Footer', () => ({
    default: () => <footer>Footer Mock</footer>
}));

describe('Página Home', () => {


    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });


    it('debe renderizar el texto de presentación y las categorías', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText(/HuertoHogar es una tienda online/i)).toBeInTheDocument();
        expect(screen.getByText('Verduras')).toBeInTheDocument();
    });


    it('debe mostrar la primera imagen del slider al cargar', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByAltText('Imagen 1')).toBeInTheDocument();
    });


    it('debe mostrar la siguiente imagen al hacer clic en "next"', async () => {

        const user = userEvent.setup({ delay: null });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );


        const slidesContainer = screen.getByTestId('slides-container');

        const nextButton = document.querySelector('.next');

        expect(slidesContainer.style.transform).toBe('');

        await user.click(nextButton);

        expect(slidesContainer.style.transform).toBe('translateX(-100%)');
    });

    it('debe avanzar el slider automáticamente después de 2.5 segundos', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        const slidesContainer = screen.getByTestId('slides-container');

        expect(slidesContainer.style.transform).toBe('');

        act(() => {
            vi.advanceTimersByTime(2500);
        });

        expect(slidesContainer.style.transform).toBe('translateX(-100%)');
    });
});