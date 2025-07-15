const Dashboard = () => {
    window.location.href = '#/dashboard';
    return `
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <p class="title is-4">Eventos</p>
                    <p>
                        Revisa todos los eventos disponibles en la pagina web dando click en el enlace de abajo.
                    </p>
                    <p>
                        <a href="#/dashboard/events" data-link>Ver eventos ...</a>
                    </p>
                </div>
            </div>

            <div class="card-content">
                <div class="content">
                    <p class="title is-4">Mis Eventos</p>
                    <p>
                        Revisa todos los eventos a los que estás suscrito dando click en el enlace de abajo.
                    </p>
                    <p>
                        <a href="#/dashboard/enrollments" data-link>Ver eventos ...</a>
                    </p>
                </div>
            </div>
        </div>
    `;
};

export default Dashboard;