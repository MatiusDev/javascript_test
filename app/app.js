import Header from "./layout/Header.js";
import Footer from "./layout/Footer.js";

import Login from "./components/Login.js";
import Register from "./components/Register.js";

const App = (() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    async function render(view) {
        if (view === Login || view === Register) {
            return `
                <main class="container" id="main-content">
                    ${view()}
                </main>
            `;
        }

        if (!user) {
            return `
                <main class="container" id="main-content">
                    ${Login()}
                </main>
            `;
        }

        return `
            ${Header()}
            <main class="container" id="main-content">
                ${await view()}
            </main>
            ${Footer()}
        `;
    }

    return { render };
})();

export default App;