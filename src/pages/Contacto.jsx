import React, { useState } from 'react';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import '../assets/assets_css/autenticacion.css';

function Contacto() {
    const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`¡Gracias ${form.nombre}! Hemos recibido tu mensaje. Te contactaremos a ${form.email} pronto.`);
        setForm({ nombre: '', email: '', mensaje: '' });
    };

    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>

                <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', display: 'flex', flexWrap: 'wrap', gap: '50px' }}>

                    <div style={{ flex: '1 1 300px' }}>
                        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#8B4513', marginBottom: '20px' }}>Contáctanos</h1>
                        <p style={{ color: '#555', marginBottom: '30px' }}>
                            ¿Tienes dudas sobre tu pedido o quieres ser nuestro proveedor? ¡Escríbenos!
                        </p>

                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ color: '#256d43', marginBottom: '5px' }}>📍 Oficina Central</h3>
                            <p>Av. Siempre Viva 742, Santiago, Chile</p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ color: '#256d43', marginBottom: '5px' }}>📞 Teléfono</h3>
                            <p>+56 9 1234 5678</p>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ color: '#256d43', marginBottom: '5px' }}>📧 Correo</h3>
                            <p>contacto@huertohogar.cl</p>
                        </div>
                    </div>

                    <div style={{ flex: '1 1 400px', backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <form onSubmit={handleSubmit}>
                            <div className="campo" style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#442c18' }}>Nombre</label>
                                <input
                                    type="text"
                                    required
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                    value={form.nombre}
                                    onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                />
                            </div>

                            <div className="campo" style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#442c18' }}>Email</label>
                                <input
                                    type="email"
                                    required
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>

                            <div className="campo" style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#442c18' }}>Mensaje</label>
                                <textarea
                                    rows="5"
                                    required
                                    style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', resize: 'none' }}
                                    value={form.mensaje}
                                    onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="button-ingresar"
                                style={{ width: '100%', padding: '12px', background: '#256d43', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}

export default Contacto;