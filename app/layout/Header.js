const Header = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return `
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <a href="#/dashboard/events" class="navbar-item" data-link>Eventos</a>
                    ${!user.isAdmin
                        ? `<a href="#/dashboard/enrollments" class="navbar-item" data-link>Mis Eventos</a>`
                        : ``
                    }
                    
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <img style="border-radius: 50%;" src="${user.url}" alt="Profile-photo" />
                    </div>
                    <div class="navbar-item">
                        <p>${user.fullname}</p>
                    </div>
                    <div class="navbar-item">
                        <div class="buttons">
                            <button id="btnLogout" class="button is-danger">Cerrar sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;
};

export default Header;