// resources/js/component/config/navigation.js
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

export const getNavigationByRole = (role) => {
    const baseMenu = [
        {
            segment: "dashboard",
            title: "Dashboard",
            icon: <DashboardIcon />,
        },
    ];

    if (role === "admin") {
        baseMenu.push(
            {
                segment: "paket",
                title: "Paket",
                icon: <ShoppingCartIcon />,
            },
            {
                segment: "users",
                title: "Users",
                icon: <PeopleIcon />,
            },
            {
                segment: "pengiriman",
                title: "Pengiriman",
                icon: <LayersIcon />,
            },
        );
    }

    if (role === "kurir") {
        baseMenu.push({
            segment: "pengiriman",
            title: "Pengiriman",
            icon: <LayersIcon />,
        });
    }

    baseMenu.push({
        segment: "logout",
        title: "Logout",
        icon: <LogoutIcon />,
    });

    return baseMenu;
};
