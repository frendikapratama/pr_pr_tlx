// resources/js/app.js
import React from "react";
import ReactDOM from "react-dom/client";
import PaketList from "./component/paket";

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <PaketList />
        </React.StrictMode>
    );
}
