import Login from "./Login.js";
import Register from "./Register.js";
import Dashboard from "./Dashboard.js";
import Events from "./Events.js";
import Enrollment from "./Enrollment.js";
import NotFound from "./NotFound.js";

function routeHandler(route, userIsLogged) {
    if (route === null) {
        route = 'login';
    };

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

export { routeHandler }