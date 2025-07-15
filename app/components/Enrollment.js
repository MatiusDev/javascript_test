const Enrollment = () => {
    window.location.href = '#/dashboard/enrollments';
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.events && user.events.length <= 0) {
        return `<p class="title is-4 has-text-centered mt-6"> No te has suscrito a ningún evento</p>`
    }

    return `
        <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;" class="card">
            ${user.events.map(event => {
                return `
                    <div style="max-width: 350px; min-width: 350px;" class="card-content">
                        <div class="content">
                            <p class="title is-4">${event.name}</p>
                            <p>
                                ${event.description}
                            </p>
                            <br />
                            <time>${event.date}</time>
                        </div>
                    </div>
                `
            }).join('')}
        </div>
    `;
};

export default Enrollment;