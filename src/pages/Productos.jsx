import Footer from "../components/Footer";
import Nav from "../components/Nav";
import '../assets/assets_css/productos.css'
import { Link } from 'react-router-dom';
import naranja from '../assets/assets_img/naranja2.png'
import papas from '../assets/assets_img/papas2.png'
import platano from '../assets/assets_img/platano2.png'
import manzana from '../assets/assets_img/apple2.png'
import cebolla from '../assets/assets_img/cebolla2.png'

function Productos() {
    return <>
        <Nav></Nav>

        <main>
            <div className="espaciado"></div>
            <div className="hero-prod">
                <div className="hero-prod_content">

                    <div className="hero-prod_content_categorias">
                        <button className="button_categoria">Todos</button>
                        <button className="button_categoria">Verduras</button>
                        <button className="button_categoria">Frutas</button>
                        <button className="button_categoria">Especias</button>
                        <button className="button_categoria">Snacks</button>
                        <button className="button_categoria">Otros</button>
                    </div>

                    <div className="hero-prod_content_productos">
                        <div className="hero-prod_content_productos_cuadro">
                            <Link to="/producto/1">
                                <img src={naranja} alt="Producto A" />
                            </Link>
                            <p className="producto-nombre">Producto A</p>
                            <p className="producto-precio">$1.200</p>
                            <button className="producto-boton">Agregar al carrito</button>
                        </div>

                        <div className="hero-prod_content_productos_cuadro">
                            <Link to="/producto/2">
                                <img src={papas} alt="Producto B" />
                            </Link>
                            <p className="producto-nombre">Producto B</p>
                            <p className="producto-precio">$1.500</p>
                            <button className="producto-boton">Agregar al carrito</button>
                        </div>

                        <div className="hero-prod_content_productos_cuadro">
                            <Link to="/producto/3">
                                <img src={platano} alt="Producto C" />
                            </Link>
                            <p className="producto-nombre">Producto C</p>
                            <p className="producto-precio">$1.300</p>
                            <button className="producto-boton">Agregar al carrito</button>
                        </div>

                        <div className="hero-prod_content_productos_cuadro">
                            <Link to="/producto/4">
                                <img src={manzana} alt="Producto D" />
                            </Link>
                            <p className="producto-nombre">Producto D</p>
                            <p className="producto-precio">$1.100</p>
                            <button className="producto-boton">Agregar al carrito</button>
                        </div>

                        <div className="hero-prod_content_productos_cuadro">
                            <Link to="/producto/5">
                                <img src={cebolla} alt="Producto E" />
                            </Link>
                            <p className="producto-nombre">Producto E</p>
                            <p className="producto-precio">$1.600</p>
                            <button className="producto-boton">Agregar al carrito</button>
                        </div>
                    </div>

                </div>


            </div>
        </main>

        <Footer></Footer>
    </>
}
export default Productos;