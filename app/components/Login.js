import { getUserByUsername } from '../api/usersAPI.js'

const Login = () => {
    window.location.href = '#/login';
    function validateUser(username, password) {
        if (!username || username === "") {
            console.log("Debes ingresar un usuario válido");
            return false;
        }

        if (!password || password === "") {
            console.log("Debes ingresar una constraseña válida");
            return false;
        }

        return true;
    }

    async function handleLogin(evt) {
        evt.preventDefault();

        const userElement = document.getElementById("username");
        const passwordElement = document.getElementById("password");

        const username = userElement.value;
        const password = passwordElement.value;

        if (!validateUser(username, password)) return;

        const user = await getUserByUsername(username);      

        if (!user) {
            console.log("El usuario no existe");
            return;
        }

        if (user.password !== password) {
            console.log("Usuario o contraseña incorrectos.");
            return;
        }

        localStorage.setItem("user", JSON.stringify({
            id: user.id,
            username,
            fullname: user.fullname,
            url: user.url,
            email: user.email,
            isAdmin: user.isAdmin,
            events: user.events || []
        }));
        window.location.reload();
    }

    setTimeout(() => {
        const btnLogin = document.getElementById('btnLogin');
        btnLogin.addEventListener('click', handleLogin);
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
                    <p class="control has-icons-left">
                        <input id="password" class="input" type="password" placeholder="Contraseña">
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <button id="btnLogin" class="button is-success">Login</button>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                        <a href="#/register" class="active" data-link>Registrarse</a>
                    </p>
                </div>
            </div>
        </div>
    `;
};

export default Login;