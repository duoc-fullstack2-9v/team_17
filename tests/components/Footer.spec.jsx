import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../src/components/Footer';

describe('Componente Footer', () => {

    it('debe renderizar el título "Contáctanos"', () => {
        render(<Footer />);

        expect(screen.getByRole('heading', { name: /Contáctanos/i })).toBeInTheDocument();
    });

    it('debe renderizar los enlaces a redes sociales', () => {
        render(<Footer />);

        expect(screen.getByRole('link', { name: /Facebook/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Instagram/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /WhatsApp/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /Twitter/i })).toBeInTheDocument();
    });

    it('debe renderizar el aviso de copyright', () => {
        render(<Footer />);
        expect(screen.getByText(/2025 HuertoHogar. Todos los derechos reservados./i)).toBeInTheDocument();
    });

});