import React from 'react';
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import '../assets/assets_css/main.css';

function Nosotros() {
    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>

                <div style={{ backgroundColor: '#256d43', color: 'white', padding: '10px 10px', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', margin: 0 }}>Nuestra Raíz</h1>
                    <p style={{ fontSize: '1.2rem', marginTop: '10px' }}>Cultivando confianza desde hace 6 años</p>
                </div>

                <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', fontFamily: "'Montserrat', sans-serif" }}>

                    <section style={{ marginBottom: '60px', display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 400px' }}>
                            <h2 style={{ color: '#8B4513', fontSize: '2rem' }}>¿Quiénes Somos?</h2>
                            <p style={{ lineHeight: '1.6', color: '#555' }}>
                                <strong>HuertoHogar</strong> nació de una idea simple: la mejor comida viene directamente de la tierra, no de una fábrica.
                                Comenzamos en el sur de Chile, conectando a pequeños agricultores de Villarrica con familias que buscaban
                                sabores auténticos.
                            </p>
                            <p style={{ lineHeight: '1.6', color: '#555' }}>
                                Hoy, operamos en más de 9 ciudades, pero nuestra esencia sigue intacta. Somos el puente entre el esfuerzo
                                del campesino y la mesa de tu hogar, garantizando un comercio justo y productos cosechados en su punto exacto de madurez.
                            </p>
                        </div>
                        <div style={{ flex: '1 1 300px' }}>
                            <img
                                src="https://ecomuhuertos.com/wp-content/uploads/2023/07/Mantenimiento-y-gestion-de-un-huerto.jpg"
                                alt="Agricultor"
                                style={{ width: '100%', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
                            />
                        </div>
                    </section>

                    <section>
                        <h2 style={{ color: '#8B4513', textAlign: 'center', marginBottom: '40px' }}>Nuestros Pilares</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>

                            <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🌱</div>
                                <h3 style={{ color: '#256d43' }}>Sustentabilidad</h3>
                                <p>Preferimos envases biodegradables y apoyamos cultivos que respetan los ciclos de la tierra.</p>
                            </div>

                            <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🤝</div>
                                <h3 style={{ color: '#256d43' }}>Comercio Justo</h3>
                                <p>Pagamos precios dignos a nuestros productores locales, eliminando intermediarios innecesarios.</p>
                            </div>

                            <div style={{ background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🚚</div>
                                <h3 style={{ color: '#256d43' }}>Frescura Garantizada</h3>
                                <p>Del campo a tu puerta en tiempo récord. Si no está fresco, te lo reponemos.</p>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Nosotros;