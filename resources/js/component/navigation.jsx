// resources/js/component/config/navigation.js
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import PeopleIcon from "@mui/icons-material/People";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Navigation configuration
export const NAVIGATION = [
    {
        kind: "header",
        title: "Main items",
    },
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <DashboardIcon />,
    },
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
    {
        kind: "divider",
    },
    {
        kind: "header",
        title: "Analytics",
    },
    {
        segment: "reports",
        title: "Reports",
        icon: <BarChartIcon />,
        children: [
            {
                segment: "sales",
                title: "Sales",
                icon: <DescriptionIcon />,
            },
            {
                segment: "traffic",
                title: "Traffic",
                icon: <DescriptionIcon />,
            },
        ],
    },
];
