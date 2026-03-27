import '../assets/assets_css/main.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">

                <div className="footer-info">
                    <h3>Contáctanos 📧</h3>
                    <p>
                        Encuéntranos en: Santiago 📍, Puerto Montt 🏞️, Viña del Mar 🏖️ y Concepción 🏭.
                        <br />
                        Llámanos al: +56 9 1234 5678 📞 o escríbenos a info@huertohogar.cl 📧.
                        <br />
                        ¡Siempre llevando la frescura de la granja a tu hogar! 🥬🥕🍎
                    </p>
                </div>

                <div className="footer-socials">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">WhatsApp</a>
                    <a href="#">Twitter</a>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; 2025 HuertoHogar. Todos los derechos reservados.
            </div>
        </footer>
    );
}

export default Footer;