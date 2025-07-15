import App from "./app/app.js";

import { routeHandler } from "./app/components/Router.js";

import { getEventById, patchEvent } from "./app/api/eventsAPI.js";
import { patchUser } from "./app/api/usersAPI.js";

function initUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        return user;
    }
    return null;
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = initUser();
    const userIsLogged = user !== null;

    const location = window.location.hash;
    const view = routeHandler(location, userIsLogged);

    const root = document.getElementById('root');
    root.innerHTML = await App.render(view);

    document.body.addEventListener('click', async (evt) => {
        evt.preventDefault();
        if (evt.target.matches('[data-link]')) {          
            const route = evt.target.getAttribute('href');
            const currentView = routeHandler(route);
            root.innerHTML = await App.render(currentView);
        }

        if (evt.target.matches('[data-button-suscribe]')) {
            if (!user) {
                return;
            }

            if (!user.events) {
                user.events = []
            }

            const eventId = evt.target.getAttribute('data-event-id');
            let events = [];

            if (user.events.some(userEvent => userEvent.id === eventId)) {
                const event = await getEventById(eventId);
                events = user.events.filter(userEvent => userEvent.id !== eventId);
                const capacity = event.capacity + 1;
                await patchEvent(eventId, { ...event, capacity })
            } else {
                const event = await getEventById(eventId);
                const capacity = event.capacity - 1;

                if (capacity < 0) {
                    console.log("No se pueden suscribir más personas al evento.");
                    return;
                }

                const dbEvent = await patchEvent(eventId, { ...event, capacity })
                events = [
                    ...user.events,
                    dbEvent
                ];
            }
            
            const userDB = await patchUser(user.id, { events });
            localStorage.setItem("user", JSON.stringify({
                id: userDB.id,
                username: userDB.username,
                fullname: userDB.fullname,
                url: userDB.url,
                email: userDB.email,
                isAdmin: userDB.isAdmin,
                events: userDB.events
            }));
            window.location.reload();
        }

        const btnLogout = document.getElementById("btnLogout");
        if (evt.target === btnLogout) {
            if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
                window.location.href = '#/';
                window.location.reload();
            }
        }
    });
});