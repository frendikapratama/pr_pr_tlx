// resources/js/component/index.jsx
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { NAVIGATION } from "./navigation";
import { demoTheme } from "./config/theme";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardHome from "./DashboardHome";
import HomePage from "./pages/homePage";
import PaketList from "./paket/index";
import { AuthList } from "./auth";
import PengirimanList from "./pengiriman";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function DashboardWrapper({ children }) {
    const navigate = useNavigate();
    const location = useLocation();

    const router = React.useMemo(
        () => ({
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: (path) => navigate(String(path)),
        }),
        [location.pathname, location.search, navigate],
    );

    return (
        <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
            <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
    );
}

// Main App Component
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                    path="/dashboard"
                    element={
                        <DashboardWrapper>
                            <DashboardHome />
                        </DashboardWrapper>
                    }
                />
                <Route
                    path="/paket"
                    element={
                        <DashboardWrapper>
                            <PaketList />
                        </DashboardWrapper>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <DashboardWrapper>
                            <AuthList />
                        </DashboardWrapper>
                    }
                />
                <Route
                    path="/pengiriman"
                    element={
                        <DashboardWrapper>
                            <PengirimanList />
                        </DashboardWrapper>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
