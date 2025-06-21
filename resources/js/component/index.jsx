// resources/js/component/index.jsx
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";
import { getNavigationByRole } from "./navigation";
import { demoTheme } from "./config/theme";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import DashboardHome from "./DashboardHome";
import HomePage from "./pages/homePage";
import PaketList from "./paket/index";
import { AuthList } from "./auth";
import PengirimanList from "./pengiriman";
import LoginPage from "./pages/login";
import { AuthProvider } from "../context/AuthContext.jsx";
import EditStatusPengiriman from "./pengiriman/EditStatusPengiriman.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useAuth } from "../context/AuthContext.jsx";

function DashboardWrapper({ children }) {
    const { role, loading, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const router = React.useMemo(
        () => ({
            pathname: location.pathname,
            searchParams: new URLSearchParams(location.search),
            navigate: (path) => {
                if (path === "/logout") {
                    handleLogout();
                } else {
                    navigate(String(path));
                }
            },
        }),
        [location.pathname, location.search, navigate],
    );

    if (loading) return <p>Loading Sidebar...</p>;

    const navigation = getNavigationByRole(role, handleLogout);

    return (
        <AppProvider navigation={navigation} router={router} theme={demoTheme}>
            <DashboardLayout>{children}</DashboardLayout>
        </AppProvider>
    );
}

// Main App Component
function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
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
                    <Route
                        path="/pengiriman/:id/edit-status"
                        element={<EditStatusPengiriman />}
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
