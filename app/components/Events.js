import { getEvents } from "../api/eventsAPI.js";
import { newModal } from "../bulma.js";

const btnTriggerName = "create-trigger";

function newEvent() {
    const template = `
    <h1>Prueba</h1>
    `;
    newModal(btnTriggerName, template)
}

const Events = async () => {
    window.location.href = '#/dashboard/events';
    const events = await getEvents();
    const user = JSON.parse(localStorage.getItem("user"));
    return `
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; padding: 30px 0px;" class="card">
            ${user.isAdmin
                ? `<div style="width: 100%; display: flex; justify-content: right;">
                        <button data-button-new class="button mr-6 mb-2 js-modal-trigger" data-target="${btnTriggerName}">Nuevo evento</button>
                    </div>`
                : ``
            }
            ${events.map(event => {
                return `
                    <div style="max-width: 350px; min-width: 350px;" class="card-content">
                        <div class="content">
                            <p class="title is-4">${event.name}</p>
                            <p>
                                ${event.description}
                            </p>
                            <br />
                            <time>${event.date}</time>
                            <footer class="card-footer">
                                ${user.events.some(userEvent => userEvent.id === event.id)
                                    ? `<button data-event-id="${event.id}" data-button-suscribe class="card-footer-item">Desuscribirse</button>`
                                    : `<button data-event-id="${event.id}" data-button-suscribe class="card-footer-item">Suscribirse</button>`
                                }
                                ${user.isAdmin  
                                    ? `
                                    <button data-event-id="${event.id}" data-button-edit class="card-footer-item">Edit</button>
                                    <button data-event-id="${event.id}" data-button-delete class="card-footer-item">Delete</button>
                                    `
                                    : ``
                                }
                            </footer>
                        </div>
                    </div>
                `
            }).join('')}
        </div>
    `;
};

export default Events;