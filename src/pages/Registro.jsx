import Footer from "../components/Footer";
import Nav from "../components/Nav";
import '../assets/assets_css/autenticacion.css'
import { Link } from 'react-router-dom';

function Registro() {
    return <>
        <Nav></Nav>
        <main>
            <div className="espaciado"></div>
            <div className="hero-auth">
                <div className="hero-auth-contenido">

                    <div className="hero-auth-contenido-techo">
                        <p className="titulo">Crear Cuenta</p>
                    </div>

                    <form>
                        <div className="hero-auth-contenido-campos">

                            <div className="campo">
                                <label for="nombre">Nombre</label>
                                <input id="nombre" name="nombre" type="text" autocomplete="given-name"
                                    placeholder="Ingresa tu nombre" required />
                            </div>

                            <div className="campo">
                                <label for="apellido">Apellido</label>
                                <input id="apellido" name="apellido" type="text" autocomplete="family-name"
                                    placeholder="Ingresa tu apellido" required />
                            </div>

                            <div className="campo">
                                <label for="email">Correo electrónico</label>
                                <input id="email" name="email" type="email" inputmode="email" autocomplete="email"
                                    placeholder="ejemplo@gmail.com" required />
                            </div>

                            <div className="campo">
                                <label for="password">Contraseña</label>
                                <input id="password" name="password" type="password" inputmode="password"
                                    autocomplete="new-password" minlength="8" placeholder="Crea una contraseña" required />
                            </div>

                            <div className="campo">
                                <label for="confirmar-password">Confirmar Contraseña</label>
                                <input id="confirmar-password" name="confirmar-password" type="password" inputmode="password"
                                    autocomplete="new-password" minlength="8" placeholder="Repite la contraseña" required />
                            </div>

                        </div>

                        <div className="hero-auth-contenido-piso">
                            <button className="button-ingresar" type="submit">Registrarme</button>

                            <p className="enlace-registro">
                                ¿Ya tienes cuenta? <Link to="/Ingreso">Inicia sesión aquí</Link>
                            </p>
                        </div>
                    </form>

                </div>
            </div>

        </main>
        <Footer></Footer>
    </>
}
export default Registro;