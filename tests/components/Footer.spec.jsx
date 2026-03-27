import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../../src/components/Footer';

describe('Componente <Footer />', () => {

    it('Debe renderizar la información de contacto correctamente', () => {
        render(<Footer />);

        // Verificamos textos clave
        expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
        expect(screen.getByText(/info@huertohogar.cl/i)).toBeInTheDocument();
        expect(screen.getByText(/Santiago/i)).toBeInTheDocument();
    });

    it('Debe contener los enlaces a redes sociales', () => {
        render(<Footer />);

        // Verificamos que existan los links
        expect(screen.getByText('Facebook')).toBeInTheDocument();
        expect(screen.getByText('Instagram')).toBeInTheDocument();

        // Opcional: Verificar que tengan href (aunque sea #)
        const linkFace = screen.getByText('Facebook');
        expect(linkFace).toHaveAttribute('href', '#');
    });

    it('Debe mostrar el copyright del año actual o fijo', () => {
        render(<Footer />);
        expect(screen.getByText(/Todos los derechos reservados/i)).toBeInTheDocument();
    });
});