import React from 'react';
import Nav from "../components/Nav";
import Footer from "../components/Footer";

function Blogs() {
    const articulos = [
        {
            id: 1,
            titulo: "5 Recetas con Manzanas de Temporada",
            resumen: "Descubre cómo aprovechar al máximo las manzanas Fuji y Verdes con estas recetas dulces y saladas.",
            fecha: "20 Marzo, 2025",
            img: "https://vimafoods.com/wp-content/uploads/2024/10/manzana-secundario.webp"
        },
        {
            id: 2,
            titulo: "¿Cómo conservar tus verduras frescas más tiempo?",
            resumen: "Trucos infalibles para que la lechuga y el cilantro te duren toda la semana en el refrigerador.",
            fecha: "15 Octubre, 2025",
            img: "https://images.ecestaticos.com/j_8Urv403LNbERG1WTHBeZlZNjQ=/0x0:2051x2381/557x418/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd95%2Ff6f%2Fa07%2Fd95f6fa0762aedd7a59085ee3c37772a.jpg"
        },
        {
            id: 3,
            titulo: "Beneficios de los Frutos Secos",
            resumen: "Nueces, almendras y maní: por qué deberías incluirlos en tu dieta diaria como snack saludable.",
            fecha: "10 Diciembre, 2025",
            img: "https://meditts.com/wp-content/uploads/2025/09/surtido-frutos-secos-y-frutas-deshidratadas-1.jpg"
        }
    ];

    return (
        <>
            <Nav />
            <main>
                <div className="espaciado"></div>

                <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
                    <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#8B4513', textAlign: 'center', marginBottom: '10px' }}>
                        Blog HuertoHogar
                    </h1>
                    <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px' }}>
                        Noticias, consejos y recetas para una vida más natural.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {articulos.map(art => (
                            <article key={art.id} style={{ backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', transition: 'transform 0.3s' }}>
                                <img src={art.img} alt={art.titulo} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ padding: '20px' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#256d43', fontWeight: 'bold' }}>{art.fecha}</span>
                                    <h3 style={{ margin: '10px 0', color: '#333', fontSize: '1.2rem' }}>{art.titulo}</h3>
                                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>{art.resumen}</p>
                                    <button style={{ marginTop: '15px', background: 'none', border: 'none', color: '#8B4513', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>
                                        Leer más →
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Blogs;