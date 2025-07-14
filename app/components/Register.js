const Register = () => {
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
            isAdmin: user.isAdmin
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
                        <input class="input" type="text" placeholder="Usuario">
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Nombre completo">
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="Correo Electrónico">
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input" type="password" placeholder="Contraseña">
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