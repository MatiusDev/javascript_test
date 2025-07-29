import { getEvents, newEvent, patchEvent } from "../api/eventsAPI.js";
import { newModal } from "../bulma.js";

const btnTriggerName = "create-trigger";
const btnEditTriggerName = "edit-trigger";

// Utilidad para mostrar mensajes en el modal
function showModalMessage(form, type, message) {
    let msg = form.querySelector('.modal-message');
    if (!msg) {
        msg = document.createElement('div');
        msg.className = 'modal-message notification is-' + type;
        msg.style.marginBottom = '1rem';
        form.prepend(msg);
    }
    msg.textContent = message;
    msg.className = 'modal-message notification is-' + type;
}

// Renderiza una tarjeta de evento
function renderEventCard(event, user) {
    const isSubscribed = user.events.some(userEvent => userEvent.id === event.id);
    return `
        <div style="max-width: 350px; min-width: 350px;" class="card-content">
            <div class="content">
                <p class="title is-4">${event.name}</p>
                <p>${event.description}</p>
                <br />
                <time>${event.date}</time>
                <footer class="card-footer">
                    <button data-event-id="${event.id}" data-button-suscribe class="card-footer-item">
                        ${isSubscribed ? "Desuscribirse" : "Suscribirse"}
                    </button>
                    ${user.isAdmin ? `
                        <button data-event-id="${event.id}" data-button-edit class="card-footer-item">Editar</button>
                        <button data-event-id="${event.id}" data-button-delete class="card-footer-item">Eliminar</button>
                    ` : ""}
                </footer>
            </div>
        </div>
    `;
}

// Modal de crear evento con feedback
function renderCreateEventModalWithSubmit(onSuccess) {
    const content = `
        <form id="create-event-form" method="post" action="javascript:void(0);">
            <h2 class="title is-4">Crear nuevo evento</h2>
            <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                    <input name="name" class="input" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Descripción</label>
                <div class="control">
                    <input name="description" class="input" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Fecha</label>
                <div class="control">
                    <input name="date" class="input" type="date" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Capacidad</label>
                <div class="control">
                    <input name="capacity" class="input" type="number" min="1" required />
                </div>
            </div>
            <button class="button is-primary" type="submit">Crear</button>
        </form>
    `;
    newModal(btnTriggerName, content);
    setTimeout(() => {
        const form = document.getElementById("create-event-form");
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                // Limpia mensajes previos
                form.querySelector('.modal-message')?.remove();
                // Validación básica extra
                const data = Object.fromEntries(new FormData(form));
                if (!data.name || !data.description || !data.date || !data.capacity) {
                    showModalMessage(form, 'danger', 'Todos los campos son obligatorios.');
                    return;
                }
                data.capacity = parseInt(data.capacity, 10);
                // Loading
                const btn = form.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.textContent = 'Creando...';
                try {
                    await newEvent(data);
                    showModalMessage(form, 'success', 'Evento creado exitosamente.');
                    setTimeout(() => {
                        document.getElementById(btnTriggerName)?.remove();
                        if (onSuccess) onSuccess();
                    }, 800);
                } catch (err) {
                    showModalMessage(form, 'danger', 'Error al crear el evento.');
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Crear';
                }
            };
        }
    }, 0);
}

// Modal de editar evento con feedback
function renderEditEventModalWithSubmit(event, onSuccess) {
    const content = `
        <form id="edit-event-form" method="post" action="javascript:void(0);">
            <h2 class="title is-4">Editar evento</h2>
            <div class="field">
                <label class="label">Nombre</label>
                <div class="control">
                    <input name="name" class="input" value="${event.name}" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Descripción</label>
                <div class="control">
                    <input name="description" class="input" value="${event.description}" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Fecha</label>
                <div class="control">
                    <input name="date" class="input" type="date" value="${event.date}" required />
                </div>
            </div>
            <div class="field">
                <label class="label">Capacidad</label>
                <div class="control">
                    <input name="capacity" class="input" type="number" min="1" value="${event.capacity}" required />
                </div>
            </div>
            <button class="button is-primary" type="submit">Guardar cambios</button>
        </form>
    `;
    newModal(btnEditTriggerName, content);
    setTimeout(() => {
        const form = document.getElementById("edit-event-form");
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                form.querySelector('.modal-message')?.remove();
                const data = Object.fromEntries(new FormData(form));
                if (!data.name || !data.description || !data.date || !data.capacity) {
                    showModalMessage(form, 'danger', 'Todos los campos son obligatorios.');
                    return;
                }
                data.capacity = parseInt(data.capacity, 10);
                const btn = form.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.textContent = 'Guardando...';
                try {
                    await patchEvent(event.id, { ...event, ...data });
                    showModalMessage(form, 'success', 'Evento actualizado exitosamente.');
                    setTimeout(() => {
                        document.getElementById(btnEditTriggerName)?.remove();
                        if (onSuccess) onSuccess();
                    }, 800);
                } catch (err) {
                    showModalMessage(form, 'danger', 'Error al actualizar el evento.');
                } finally {
                    btn.disabled = false;
                    btn.textContent = 'Guardar cambios';
                }
            };
        }
    }, 0);
}

// Render principal de la vista de eventos
const Events = async () => {
    window.location.href = '#/dashboard/events';
    const events = await getEvents();
    const user = JSON.parse(localStorage.getItem("user"));
    return `
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; padding: 30px 0px;" class="card">
            ${user.isAdmin
                ? `<div style="width: 100%; display: flex; justify-content: right;">
                        <button id="btnNewEvent" class="button mr-6 mb-2">Nuevo evento</button>
                    </div>`
                : ""
            }
            ${events.map(event => renderEventCard(event, user)).join('')}
        </div>
    `;
};

export default Events;
export { renderCreateEventModalWithSubmit, renderEditEventModalWithSubmit };