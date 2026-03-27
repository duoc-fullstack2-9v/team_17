import Footer from "../components/Footer";
import Nav from "../components/Nav";
import React, { useState, useEffect, useRef } from 'react';
import '../assets/assets_css/home.css'
import verduras from '../assets/assets_img/verduras.png'
import fruits from '../assets/assets_img/fruits.png'
import spices from '../assets/assets_img/spices.png'
import snack from '../assets/assets_img/snack.png'
import naranja from '../assets/assets_img/naranja2.png'
import papas from '../assets/assets_img/papas2.png'
import platano from '../assets/assets_img/platano2.png'
import manzana from '../assets/assets_img/apple2.png'
import cebolla from '../assets/assets_img/cebolla2.png'

function Home() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesRef = useRef(null);
    const images = [
        naranja,
        papas,
        platano,
        manzana,
        cebolla
    ];

    const totalImages = images.length;

    const showSlide = (newIndex) => {
        let nextIndex = newIndex;

        if (newIndex < 0) {
            nextIndex = totalImages - 1;
        } else if (newIndex >= totalImages) {
            nextIndex = 0;
        }

        setCurrentIndex(nextIndex);


        if (slidesRef.current) {
            slidesRef.current.style.transform = `translateX(${-nextIndex * 100}%)`;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 2500);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const handlePrev = () => showSlide(currentIndex - 1);
    const handleNext = () => showSlide(currentIndex + 1);

    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>
                <div className="hero">

                    <div className="hero-contenido-categorias">

                        <div className="categoria-item">
                            <div className="categoria-img-container">
                                <img src={verduras} alt="Verduras" />
                            </div>
                            <div className="categoria-nombre">Verduras</div>
                        </div>

                        <div className="categoria-item">
                            <div className="categoria-img-container">
                                <img src={fruits} alt="Frutas" />
                            </div>
                            <div className="categoria-nombre">Frutas</div>
                        </div>

                        <div className="categoria-item">
                            <div className="categoria-img-container">
                                <img src={spices} alt="Especias" />
                            </div>
                            <div className="categoria-nombre">Especias</div>
                        </div>

                        <div className="categoria-item">
                            <div className="categoria-img-container">
                                <img src={snack} alt="Snacks" />
                            </div>
                            <div className="categoria-nombre">Snacks</div>
                        </div>

                    </div>

                    <div className="hero-contenido-presentacion">
                        <p>
                            HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo
                            directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos
                            en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt,
                            Villarica, Nacimiento, Viña del Mar, Valparaíso, y Concepción. Nuestra misión es conectar a las
                            familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
                        </p>
                    </div>

                    <div className="hero-contenido-image-slider">

                        <div className="slides" ref={slidesRef} data-testid="slides-container">

                            {images.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Imagen ${index + 1}`}
                                />
                            ))}

                        </div>

                        <button className="prev" onClick={handlePrev}>&#10094;</button>
                        <button className="next" onClick={handleNext}>&#10095;</button>

                    </div>

                </div>

            </main>
            <Footer />
        </>
    );
}

export default Home;