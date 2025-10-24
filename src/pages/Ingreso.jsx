import Footer from "../components/Footer";
import Nav from "../components/Nav";
import '../assets/assets_css/autenticacion.css'
import { Link } from 'react-router-dom';

function Ingreso() {
    return <>
        <Nav></Nav>
        <main>
            <div className="espaciado"></div>
            <div className="hero-auth">
                <div className="hero-auth-contenido">

                    <div className="hero-auth-contenido-techo">
                        <p className="titulo">Iniciar sesión</p>
                    </div>

                    <div className="hero-auth-contenido-campos">
                        <div className="campo">
                            <label>Correo electrónico</label>
                            <input id="email" name="email" type="email" inputmode="email" autocomplete="email"
                                placeholder="ejemplo@gmail.com" required />
                        </div>

                        <div className="campo">
                            <label>Contraseña</label>
                            <input id="password" name="password" type="password" inputmode="password"
                                autocomplete="current-password" minlength="6" placeholder="********" required />
                        </div>

                        <div className="hero-auth-opciones-recordar">
                            <div className="opcion-recordar">
                                <input type="checkbox" id="recordarme" name="recordarme" />
                                <label for="recordarme">Recordarme</label>
                            </div>
                            <a href="#" className="enlace-olvidaste">¿Olvidaste tu contraseña?</a>
                        </div>

                    </div>

                    <div className="hero-auth-contenido-piso">
                        <button className="button-ingresar" type="submit">Ingresar</button>

                        <p className="enlace-registro">
                            ¿Aún no tienes cuenta? <Link to="/Registro">Regístrate aquí</Link>
                        </p>
                    </div>

                </div>
            </div>

        </main>
        <Footer></Footer>
    </>
}
export default Ingreso;