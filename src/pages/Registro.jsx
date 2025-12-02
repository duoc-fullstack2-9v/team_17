import React, { useState } from 'react';
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import '../assets/assets_css/autenticacion.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Registro() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        direccion: '',
        email: '',
        password: '',
        confirmarPassword: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmarPassword) {
            return setError('Las contraseñas no coinciden');
        }

        try {
            setError('');
            setLoading(true);

            await signup(
                formData.email,
                formData.password,
                formData.nombre,
                formData.apellido,
                formData.telefono,
                formData.direccion
            );

            navigate('/');
        } catch (err) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('El correo ya está registrado.');
            } else if (err.code === 'auth/weak-password') {
                setError('La contraseña es muy débil (mínimo 6 caracteres).');
            } else {
                setError('Error al registrarse. Intente nuevamente.');
            }
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
                            <p className="titulo">Crear Cuenta</p>
                        </div>

                        {error && (
                            <div className="alerta-error" style={{ color: '#dc3545', textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="hero-auth-contenido-campos">

                                <div className="campo">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        id="nombre" name="nombre" type="text" autoComplete="given-name"
                                        placeholder="Ingresa tu nombre" required
                                        value={formData.nombre} onChange={handleChange}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input
                                        id="apellido" name="apellido" type="text" autoComplete="family-name"
                                        placeholder="Ingresa tu apellido" required
                                        value={formData.apellido} onChange={handleChange}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="telefono">Teléfono</label>
                                    <input
                                        id="telefono" name="telefono" type="tel" autoComplete="tel"
                                        placeholder="+56 9 1234 5678" required
                                        value={formData.telefono} onChange={handleChange}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="direccion">Dirección</label>
                                    <input
                                        id="direccion" name="direccion" type="text" autoComplete="street-address"
                                        placeholder="Av. Siempre Viva 742" required
                                        value={formData.direccion} onChange={handleChange}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <input
                                        id="email" name="email" type="email" inputMode="email" autoComplete="email"
                                        placeholder="ejemplo@gmail.com" required
                                        value={formData.email} onChange={handleChange}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        id="password" name="password" type="password" autoComplete="new-password"
                                        minLength="6" placeholder="Crea una contraseña" required
                                        value={formData.password} onChange={handleChange}
                                    />
                                </div>

                                <div className="campo">
                                    <label htmlFor="confirmarPassword">Confirmar Contraseña</label>
                                    <input
                                        id="confirmarPassword" name="confirmarPassword" type="password" autoComplete="new-password"
                                        minLength="6" placeholder="Repite la contraseña" required
                                        value={formData.confirmarPassword} onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="hero-auth-contenido-piso">
                                <button className="button-ingresar" type="submit" disabled={loading}>
                                    {loading ? 'Registrando...' : 'Registrarme'}
                                </button>

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
    );
}

export default Registro;