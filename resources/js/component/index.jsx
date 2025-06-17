import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PaketList from "./paket/index";
import { AuthList } from "./auth";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/paket" element={<PaketList />} />
                <Route path="/users" element={<AuthList />} />
            </Routes>
        </Router>
    );
}

export default App;
