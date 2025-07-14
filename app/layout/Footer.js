const Footer = () => {
    return `
        <footer class="footer">
            <div class="content has-text-centered">
                <p>&copy; Todos los derechos reservados ${new Date().getFullYear()}.</p>
                <p>Desarrollado por <a href="https://github.com/matiusdev" target="_blank"><strong>Mateo Monsalve</strong></a>.</p>
            </div>
        </footer>
    `;
};

export default Footer;