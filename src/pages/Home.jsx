import Footer from "../components/Footer";
import Nav from "../components/Nav";
import '../assets/assets_css/home.css'

import verduras from '../assets/assets_img/verduras.png'
import fruits from '../assets/assets_img/fruits.png'
import spices from '../assets/assets_img/spices.png'
import snack from '../assets/assets_img/snack.png'


function Home() {
    return (
        <>
            <Nav /> {/* Use self-closing syntax for components */}
            <main>
                <div className="espaciado"></div> {/* FIX 1: Use className instead of class */}
                <div className="hero"> {/* FIX 1: Use className instead of class */}

                    <div className="hero-contenido-categorias"> {/* FIX 1: Use className instead of class */}

                        {/* Category Items */}
                        <div className="categoria-item"> {/* FIX 1: Use className instead of class */}
                            <div className="categoria-img-container"> {/* FIX 1: Use className instead of class */}
                                {/* FIX 2: All <img> tags must be self-closing */}
                                <img src={verduras} alt="Verduras" />
                            </div>
                            <div className="categoria-nombre">Verduras</div> {/* FIX 1: Use className instead of class */}
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

                    <div className="hero-contenido-presentacion"> {/* FIX 1: Use className instead of class */}
                        <p>
                            HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo
                            directamente a la puerta de nuestros clientes en Chile. Con más de 6 años de experiencia, operamos
                            en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt,
                            Villarica, Nacimiento, Viña del Mar, Valparaíso, y Concepción. Nuestra misión es conectar a las
                            familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
                        </p>
                        {/* FIX 3: Removed stray <p> tags. The original code had an extra, unclosed <p> here. */}
                    </div>

                    <div className="hero-contenido-image-slider"> {/* FIX 1: Use className instead of class and corrected typo */}

                        <div className="slides"> {/* FIX 1: Use className instead of class */}

                            {/* FIX 2: All <img> tags must be self-closing and removed excessive nesting/closing tags */}
                            <img src="assets/assets_img/naranja2.png" alt="Imagen 1" />
                            <img src="assets/assets_img/papas2.png" alt="Imagen 2" />
                            <img src="assets/assets_img/platano2.png" alt="Imagen 3" />
                            <img src="assets/assets_img/apple2.png" alt="Imagen 4" />
                            <img src="assets/assets_img/cebolla2.png" alt="Imagen 5" />
                        </div>

                        <button className="prev">&#10094;</button> {/* FIX 1: Use className instead of class */}
                        <button className="next">&#10095;</button> {/* FIX 1: Use className instead of class */}

                    </div>

                </div> {/* Corrected the closing tags for the main content */}

            </main>
            <Footer /> {/* Use self-closing syntax for components */}
        </>
    );
}

export default Home;