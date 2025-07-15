import { getUserByUsername, newUser } from "../api/usersAPI.js";

const Register = () => {
    window.location.href = '#/register';

    function validateUser(username, password, fullname, email) {
        if (!username || username === "") {
            console.log("Debes ingresar un usuario válido.");
            return false;
        }

        if (username.length < 4) {
            console.log("El usuario debe tener más de 3 caracteres.");
            return false;
        }

        if (!password || password === "") {
            console.log("Debes ingresar una constraseña válida.");
            return false;
        }

        if (password.length < 6) {
            console.log("La contraseña debe tener más de 5 caracteres.");
            return false;
        }

        if (!email || email === "" || !email.includes('@') || !email.includes('.')) {
            console.log("Debes ingresar un correo electrónico válido.");
            return false;
        }

        if (!fullname || fullname === "") {
            console.log("Debes ingresar un nombre válido.");
            return false;
        }

        return true;
    }

    async function handleRegister(evt) {
        evt.preventDefault();

        const userElement = document.getElementById("username");
        const passwordElement = document.getElementById("password");
        const fullnameElement = document.getElementById("fullname");
        const emailElement = document.getElementById("email");

        const username = userElement.value;
        const password = passwordElement.value;
        const fullname = fullnameElement.value;
        const email = emailElement.value;

        if (!validateUser(username, password, fullname, email)) return;

        const userExist = await getUserByUsername(username);      

        if (userExist) {
            console.log("Ya existe un usuario con este nombre de usuario.");
            return;
        }

        const user = {
            username,
            email,
            fullname,
            url: `https://i.pravatar.cc/300?u=${Math.floor(Math.random() * 100)}`,
            password,
            isAdmin: false
        }

        const dbUser = await newUser(user);
        localStorage.setItem("user", JSON.stringify({
            id: dbUser.id,
            username: dbUser.username,
            fullname: dbUser.fullname,
            url: dbUser.url,
            email: dbUser.email,
            isAdmin: dbUser.isAdmin
        }));
        window.location.reload();
    }

    setTimeout(() => {
        const btnRegister = document.getElementById('btnRegister');
        btnRegister.addEventListener('click', handleRegister);
    }, 0);

    return `
        <div class="hero is-medium">
            <div class="hero-body">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input id="username" class="input" type="text" placeholder="Usuario">
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input id="fullname" class="input" type="text" placeholder="Nombre completo">
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input id="email" class="input" type="email" placeholder="Correo Electrónico">
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input id="password" class="input" type="password" placeholder="Contraseña">
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button id="btnRegister" class="button is-success">Registrarse</button>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <a href="#/login" data-link>Loguearse</a>
                    </p>
                </div>
            </div>
        </div>
    `;
};

export default Register;