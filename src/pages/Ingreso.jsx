import React, { useState } from 'react';
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import '../assets/assets_css/autenticacion.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Ingreso() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);

            await login(email, password);

            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Correo o contraseña incorrectos.');
        }
        setLoading(false);
    };

    return (
        <>
            <Nav></Nav>
            <main>
                <div className="espaciado"></div>
                <div className="hero-auth">
                    <div className="hero-auth-contenido">

                        <div className="hero-auth-contenido-techo">
                            <p className="titulo">Iniciar sesión</p>
                        </div>

                        {error && (
                            <div className="alerta-error" style={{ color: '#dc3545', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
                                {error}
                            </div>
                        )}

                        <div className="hero-auth-contenido-campos">
                            <form onSubmit={handleSubmit}>
                                <div className="campo">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input
                                        id="email" name="email" type="email" inputMode="email" autoComplete="email"
                                        placeholder="ejemplo@gmail.com" required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        id="password" name="password" type="password" inputMode="password"
                                        autoComplete="current-password" minLength="6" placeholder="********" required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="hero-auth-opciones-recordar">
                                    <div className="opcion-recordar">
                                        <input type="checkbox" id="recordarme" name="recordarme" />
                                        <label htmlFor="recordarme">Recordarme</label>
                                    </div>
                                    <a href="#" className="enlace-olvidaste">¿Olvidaste tu contraseña?</a>
                                </div>

                                <div className="hero-auth-contenido-piso">
                                    <button className="button-ingresar" type="submit" disabled={loading}>
                                        {loading ? 'Ingresando...' : 'Ingresar'}
                                    </button>

                                    <p className="enlace-registro">
                                        ¿Aún no tienes cuenta? <Link to="/Registro">Regístrate aquí</Link>
                                    </p>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </main>
            <Footer></Footer>
        </>
    );
}

export default Ingreso;