// resources/js/app.js
import React from "react";
import ReactDOM from "react-dom/client";
import PaketList from "./component/paket";
import App from "./component";

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <div className=" bg-amber-300">
                <App />
            </div>
        </React.StrictMode>
    );
}
