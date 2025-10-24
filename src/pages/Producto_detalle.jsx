import Footer from "../components/Footer";
import Nav from "../components/Nav";
import '../assets/assets_css/producto_detalle.css'
import { useParams, useNavigate } from 'react-router-dom';
import productosData from '../data/productos.json';
import naranja from '../assets/assets_img/naranja2.png';
import papas from '../assets/assets_img/papas2.png';
import platano from '../assets/assets_img/platano2.png';
import manzana from '../assets/assets_img/apple2.png';
import cebolla from '../assets/assets_img/cebolla2.png';

const imagenes = {
    "naranja2.png": naranja,
    "papas2.png": papas,
    "platano2.png": platano,
    "apple2.png": manzana,
    "cebolla2.png": cebolla
};

function Producto_detalle() {
    const { id } = useParams();
    const navigate = useNavigate();

    const producto = productosData.find(p => p.id === parseInt(id));

    return <>
        <Nav></Nav>
        <main>
            <div className="espaciado"></div>
            <div className="hero-prodDet-prodDet">
                <div className="hero-prodDet-prodDet_content">

                    <div className="hero-prodDet-prodDet_content_image">
                        <img src={imagenes[producto.img]} alt={producto.nombre} />
                    </div>

                    <div className="hero-prodDet-prodDet_content_detalle">
                        <div className="hero-prodDet-prodDet_content_detalle_desc">
                            <p className="desc_titulo">{producto.nombre}</p>
                            <p className="desc_resto">
                                {producto.descripcion}
                            </p>
                        </div>

                        <div className="hero-prodDet-prodDet_content_detalle_botones">
                            <button className="detalle_button" onClick={() => navigate('/Productos')}>Volver</button>
                            <button className="detalle_button">Agregar</button>
                        </div>

                    </div>

                </div>
            </div>
        </main>
        <Footer></Footer>
    </>
}
export default Producto_detalle