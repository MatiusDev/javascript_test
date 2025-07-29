import App from "./app/app.js";
import { routeHandler } from "./app/components/Router.js";
import { getEventById, patchEvent, deleteEvent, getEvents } from "./app/api/eventsAPI.js";
import { patchUser } from "./app/api/usersAPI.js";
import Events, { renderCreateEventModalWithSubmit, renderEditEventModalWithSubmit } from "./app/components/Events.js";

function initUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        return user;
    }
    return null;
}

async function renderView(view, root) {
    root.innerHTML = await App.render(view);
}

async function rerenderEvents(root) {
    await renderView(Events, root);
    attachEventsHandlers(root);
}

function attachEventsHandlers(root) {
    // Botón para crear evento (solo admins)
    const btnNewEvent = document.getElementById("btnNewEvent");
    if (btnNewEvent) {
        btnNewEvent.onclick = (e) => {
            e.preventDefault();
            renderCreateEventModalWithSubmit(() => rerenderEvents(root));
        };
    }

    // Botones de editar evento (solo admins)
    document.querySelectorAll('[data-button-edit]').forEach(btn => {
        btn.onclick = async (e) => {
            e.preventDefault();
            const eventId = btn.getAttribute('data-event-id');
            const event = await getEventById(eventId);
            renderEditEventModalWithSubmit(event, () => rerenderEvents(root));
        };
    });

    // Botones de eliminar evento (solo admins)
    document.querySelectorAll('[data-button-delete]').forEach(btn => {
        btn.onclick = async (e) => {
            e.preventDefault();
            const eventId = btn.getAttribute('data-event-id');
            await deleteEvent(eventId);
            rerenderEvents(root);
        };
    });

    // Botones de suscribirse/desuscribirse
    document.querySelectorAll('[data-button-suscribe]').forEach(btn => {
        btn.onclick = async (e) => {
            e.preventDefault();
            const user = initUser();
            if (!user) return;
            if (!user.events) user.events = [];
            const eventId = btn.getAttribute('data-event-id');
            let events = [];
            if (user.events.some(userEvent => userEvent.id === eventId)) {
                const event = await getEventById(eventId);
                events = user.events.filter(userEvent => userEvent.id !== eventId);
                const capacity = event.capacity + 1;
                await patchEvent(eventId, { ...event, capacity });
            } else {
                const event = await getEventById(eventId);
                const capacity = event.capacity - 1;
                if (capacity < 0) {
                    console.log("No se pueden suscribir más personas al evento.");
                    return;
                }
                const dbEvent = await patchEvent(eventId, { ...event, capacity });
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
            rerenderEvents(root);
        };
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = initUser();
    const userIsLogged = user !== null;
    const location = window.location.hash;
    const view = routeHandler(location, userIsLogged);
    const root = document.getElementById('root');
    await renderView(view, root);
    attachEventsHandlers(root);

    document.body.addEventListener('click', async (evt) => {
        // Navegación SPA
        if (evt.target.matches('[data-link]')) {
            evt.preventDefault();
            const route = evt.target.getAttribute('href');
            const currentView = routeHandler(route);
            await renderView(currentView, root);
            attachEventsHandlers(root);
        }
        // Logout
        const btnLogout = document.getElementById("btnLogout");
        if (evt.target === btnLogout) {
            if (localStorage.getItem("user")) {
                localStorage.removeItem("user");
                window.location.href = '#/';
                await renderView(routeHandler('#/', false), root);
            }
        }
    });
});