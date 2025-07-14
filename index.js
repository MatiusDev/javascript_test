import App from "./app/app.js";

import Login from "./app/components/Login.js";
import Register from "./app/components/Register.js";
import Dashboard from "./app/components/Dashboard.js";
import Events from "./app/components/Events.js";
import Enrollment from "./app/components/Enrollment.js";
import NotFound from "./app/components/NotFound.js";

let userIsLogged = false;

function initUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        userIsLogged = true;
    }
}

function routeHandler(route) {
    if (route == null) return Login;

    let parsedRoute = route.split('#/').join('').toLowerCase();
    if (parsedRoute === "") {
        parsedRoute = 'login';
    }

    switch (parsedRoute) {
        case 'login':
            return userIsLogged ? Dashboard : Login;
        case 'register':
            return userIsLogged ? Dashboard : Register;
        case 'dashboard':
            return Dashboard;
        case 'dashboard/events':
            return Events;
        case 'dashboard/enrollments':
            return Enrollment;
        default:
            return NotFound;
    }
}



document.addEventListener('DOMContentLoaded', () => {
    initUser();

    const location = window.location.hash;
    const view = routeHandler(location);

    const root = document.getElementById('root');
    root.innerHTML = App.render(view);

    document.body.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (evt.target.matches('[data-link]')) {          
            const route = evt.target.getAttribute('href');
            const currentView = routeHandler(route);
            root.innerHTML = App.render(currentView);
        }
    });

    const btnLogout = document.getElementById("btnLogout");
    if (btnLogout) {
        btnLogout.addEventListener('click', (evt) => {
            evt.preventDefault();
            if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
                // window.location.reload();
            }
        });
    }
});