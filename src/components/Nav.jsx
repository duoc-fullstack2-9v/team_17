import logo from '../assets/assets_img/Logo_huerto_hogar_transparente.png'
import img_inicio from '../assets/assets_img/iniciar_sesion4.png'
import img_carrito from '../assets/assets_img/basket2.png'

import '../assets/assets_css/main.css'

import { Link } from 'react-router-dom';


function Nav() {
    return <nav className="navbar">

        <img className="Logo" src={logo} alt="Logo" />

        <ul className="nav-links">
            <Link className="nav-link" to="/Home">Inicio</Link>
            <Link className="a" to="/Productos">Productos</Link>
            <Link className="a" to="/nosotros">Nosotros</Link>
            <Link className="a" to="/productos">Blogs</Link>
            <Link className="a" to="/productos">Contacto</Link>
        </ul>

        <Link to="/Ingreso">
            <img className="navbar-usuario-img" src={img_inicio} alt="Logo" />
        </Link>

        <Link to="/carrito">
            <img className="navbar-usuario-img" src={img_carrito} alt="Logo" />
        </Link>

    </nav>
}
export default Nav;