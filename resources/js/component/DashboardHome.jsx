import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    CircularProgress,
    Alert,
    Chip,
    Button,
} from "@mui/material";
import { PageContainer } from "@toolpad/core/PageContainer";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TodayIcon from "@mui/icons-material/Today";
import GroupIcon from "@mui/icons-material/Group";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";

import { fetchUsers } from "./auth/authService";
import { fetchPaket } from "./paket/paketService";
import { fetchPengiriman } from "./pengiriman/pengirimanService";
import { useAuth } from "../context/AuthContext";

function DashboardHome() {
    const { user, role, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Stats untuk admin
    const [adminStats, setAdminStats] = useState([
        {
            title: "Total Semua Paket",
            value: 0,
            icon: <LocalShippingIcon fontSize="large" color="primary" />,
            bgColor: "#e3f2fd",
        },
        {
            title: "Paket Hari Ini",
            value: 0,
            icon: <TodayIcon fontSize="large" color="secondary" />,
            bgColor: "#fce4ec",
        },
        {
            title: "Total Kurir",
            value: 0,
            icon: <GroupIcon fontSize="large" color="success" />,
            bgColor: "#e8f5e9",
        },
        {
            title: "Total Pengiriman",
            value: 0,
            icon: <AssignmentIcon fontSize="large" color="info" />,
            bgColor: "#e1f5fe",
        },
        {
            title: "Paket Diproses",
            value: 0,
            icon: <HourglassTopIcon fontSize="large" color="warning" />,
            bgColor: "#fff3e0",
        },
        {
            title: "Paket Dikirim",
            value: 0,
            icon: <SendIcon fontSize="large" color="info" />,
            bgColor: "#e1f5fe",
        },
        {
            title: "Paket Selesai",
            value: 0,
            icon: <CheckCircleIcon fontSize="large" color="success" />,
            bgColor: "#f1f8e9",
        },
        {
            title: "Paket Dibatalkan",
            value: 0,
            icon: <CancelIcon fontSize="large" color="error" />,
            bgColor: "#ffebee",
        },
    ]);

    // Stats untuk kurir
    const [kurirStats, setKurirStats] = useState([
        {
            title: "Pengiriman Saya",
            value: 0,
            icon: <AssignmentIcon fontSize="large" color="primary" />,
            bgColor: "#e3f2fd",
        },
        {
            title: "Pengiriman Hari Ini",
            value: 0,
            icon: <TodayIcon fontSize="large" color="secondary" />,
            bgColor: "#fce4ec",
        },
        {
            title: "Sedang Diproses",
            value: 0,
            icon: <HourglassTopIcon fontSize="large" color="warning" />,
            bgColor: "#fff3e0",
        },
        {
            title: "Sedang Dikirim",
            value: 0,
            icon: <SendIcon fontSize="large" color="info" />,
            bgColor: "#e1f5fe",
        },
        {
            title: "Berhasil Dikirim",
            value: 0,
            icon: <CheckCircleIcon fontSize="large" color="success" />,
            bgColor: "#f1f8e9",
        },
        {
            title: "Dibatalkan",
            value: 0,
            icon: <CancelIcon fontSize="large" color="error" />,
            bgColor: "#ffebee",
        },
    ]);

    // Fungsi untuk mengecek apakah tanggal adalah hari ini
    const isToday = (dateString) => {
        const today = new Date();
        const date = new Date(dateString);

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    // Fungsi untuk menghitung statistik admin
    const calculateAdminStats = (users, pakets, pengiriman) => {
        const usersArray = Array.isArray(users) ? users : [];
        const paketsArray = Array.isArray(pakets) ? pakets : [];
        const pengirimanArray = Array.isArray(pengiriman) ? pengiriman : [];

        // Total Semua Paket
        const totalPaket = paketsArray.length;

        // Paket Hari Ini (berdasarkan created_at)
        const paketHariIni = paketsArray.filter((paket) => {
            if (!paket.created_at) return false;
            return isToday(paket.created_at);
        }).length;

        // Total Kurir
        const totalKurir = usersArray.filter(
            (user) => user && user.role === "kurir",
        ).length;

        // Total Pengiriman
        const totalPengiriman = pengirimanArray.length;

        // Paket berdasarkan status (dari data pengiriman)
        const paketDiproses = pengirimanArray.filter(
            (item) => item?.paket?.status === "proses",
        ).length;

        const paketDikirim = pengirimanArray.filter(
            (item) => item?.paket?.status === "dikirim",
        ).length;

        const paketSelesai = pengirimanArray.filter(
            (item) => item?.paket?.status === "diterima",
        ).length;

        const paketDibatalkan = pengirimanArray.filter(
            (item) => item?.paket?.status === "dibatalkan",
        ).length;

        return {
            totalPaket,
            paketHariIni,
            totalKurir,
            totalPengiriman,
            paketDiproses,
            paketDikirim,
            paketSelesai,
            paketDibatalkan,
        };
    };

    // Fungsi untuk menghitung statistik kurir
    const calculateKurirStats = (pengiriman, kurirId) => {
        const pengirimanArray = Array.isArray(pengiriman) ? pengiriman : [];

        // Filter pengiriman hanya untuk kurir yang login
        const myPengiriman = pengirimanArray.filter(
            (item) => item?.user_id === kurirId,
        );

        // Total Pengiriman Saya
        const totalMyPengiriman = myPengiriman.length;

        // Pengiriman Hari Ini
        const pengirimanHariIni = myPengiriman.filter((item) => {
            if (!item.created_at) return false;
            return isToday(item.created_at);
        }).length;

        // Berdasarkan status paket
        const sedangDiproses = myPengiriman.filter(
            (item) => item?.paket?.status === "proses",
        ).length;

        const sedangDikirim = myPengiriman.filter(
            (item) => item?.paket?.status === "dikirim",
        ).length;

        const berhasilDikirim = myPengiriman.filter(
            (item) => item?.paket?.status === "diterima",
        ).length;

        const dibatalkan = myPengiriman.filter(
            (item) => item?.paket?.status === "dibatalkan",
        ).length;

        return {
            totalMyPengiriman,
            pengirimanHariIni,
            sedangDiproses,
            sedangDikirim,
            berhasilDikirim,
            dibatalkan,
        };
    };

    // Fungsi untuk mengambil data dashboard
    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            if (role === "admin") {
                // Admin bisa mengakses semua data
                try {
                    const [usersResponse, paketsResponse, pengirimanResponse] =
                        await Promise.all([
                            fetchUsers().catch((err) => {
                                console.warn("Error fetching users:", err);
                                return { data: [] };
                            }),
                            fetchPaket().catch((err) => {
                                console.warn("Error fetching pakets:", err);
                                return { data: [] };
                            }),
                            fetchPengiriman().catch((err) => {
                                console.warn("Error fetching pengiriman:", err);
                                return { data: [] };
                            }),
                        ]);

                    const usersData =
                        usersResponse?.data || usersResponse || [];
                    const paketsData =
                        paketsResponse?.data || paketsResponse || [];
                    const pengirimanData =
                        pengirimanResponse?.data || pengirimanResponse || [];

                    const calculatedStats = calculateAdminStats(
                        usersData,
                        paketsData,
                        pengirimanData,
                    );

                    setAdminStats((prevStats) =>
                        prevStats.map((stat, index) => {
                            const values = [
                                calculatedStats.totalPaket,
                                calculatedStats.paketHariIni,
                                calculatedStats.totalKurir,
                                calculatedStats.totalPengiriman,
                                calculatedStats.paketDiproses,
                                calculatedStats.paketDikirim,
                                calculatedStats.paketSelesai,
                                calculatedStats.paketDibatalkan,
                            ];
                            return { ...stat, value: values[index] || 0 };
                        }),
                    );
                } catch (adminError) {
                    console.error("Admin dashboard error:", adminError);
                    setError(
                        "Gagal memuat data dashboard admin. Periksa koneksi atau permission.",
                    );
                }
            } else if (role === "kurir") {
                // Kurir hanya bisa mengakses data pengiriman
                try {
                    const pengirimanResponse = await fetchPengiriman();
                    const pengirimanData =
                        pengirimanResponse?.data || pengirimanResponse || [];

                    const calculatedStats = calculateKurirStats(
                        pengirimanData,
                        user?.id,
                    );

                    setKurirStats((prevStats) =>
                        prevStats.map((stat, index) => {
                            const values = [
                                calculatedStats.totalMyPengiriman,
                                calculatedStats.pengirimanHariIni,
                                calculatedStats.sedangDiproses,
                                calculatedStats.sedangDikirim,
                                calculatedStats.berhasilDikirim,
                                calculatedStats.dibatalkan,
                            ];
                            return { ...stat, value: values[index] || 0 };
                        }),
                    );
                } catch (kurirError) {
                    console.error("Kurir dashboard error:", kurirError);
                    setError(
                        "Gagal memuat data pengiriman. Periksa koneksi atau login ulang.",
                    );
                }
            } else {
                setError("Role pengguna tidak valid. Silakan login ulang.");
            }
        } catch (error) {
            console.error("Dashboard loading error:", error);
            setError(
                "Terjadi kesalahan saat memuat dashboard. Silakan refresh halaman.",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Load data setelah user dan role tersedia dari AuthContext
        if (user && role && !authLoading) {
            loadDashboardData();
        }
    }, [user, role, authLoading]);

    // Loading state untuk auth dan data
    if (authLoading || loading) {
        return (
            <PageContainer>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="400px"
                >
                    <CircularProgress size={60} />
                    <Typography variant="h6" sx={{ ml: 2 }}>
                        {authLoading
                            ? "Memuat data pengguna..."
                            : "Memuat dashboard..."}
                    </Typography>
                </Box>
            </PageContainer>
        );
    }

    // Jika user belum login
    if (!user) {
        return (
            <PageContainer>
                <Alert severity="warning" sx={{ mb: 2 }}>
                    Anda belum login. Silakan login terlebih dahulu.
                </Alert>
            </PageContainer>
        );
    }

    // Jika role tidak valid
    if (!role || (role !== "admin" && role !== "kurir")) {
        return (
            <PageContainer>
                <Alert severity="error" sx={{ mb: 2 }}>
                    Role pengguna tidak valid. Hubungi administrator.
                </Alert>
            </PageContainer>
        );
    }

    if (error) {
        return (
            <PageContainer>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={loadDashboardData}
                    sx={{ mt: 2 }}
                >
                    Muat Ulang Data
                </Button>
            </PageContainer>
        );
    }

    const currentStats = role === "admin" ? adminStats : kurirStats;

    return (
        <PageContainer>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard {role === "admin" ? "Admin" : "Kurir"}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Chip
                        label={role === "admin" ? "Administrator" : "Kurir"}
                        color={role === "admin" ? "primary" : "secondary"}
                        icon={
                            role === "admin" ? (
                                <PersonIcon />
                            ) : (
                                <LocalShippingIcon />
                            )
                        }
                    />
                    <Typography variant="body1" color="text.secondary">
                        Selamat datang, {user?.fullname || user?.name || "User"}
                    </Typography>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {currentStats.map((item, index) => (
                    <Grid
                        key={index}
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={role === "admin" ? 3 : 4}
                    >
                        <Card
                            sx={{
                                backgroundColor: item.bgColor,
                                boxShadow: 3,
                                borderRadius: 2,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: 6,
                                },
                                cursor: "pointer",
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Box mr={2}>{item.icon}</Box>
                                    <Typography
                                        variant="h6"
                                        fontWeight="bold"
                                        sx={{
                                            fontSize: {
                                                xs: "0.9rem",
                                                sm: "1.1rem",
                                            },
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                </Box>
                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    sx={{
                                        fontSize: {
                                            xs: "1.8rem",
                                            sm: "2.5rem",
                                        },
                                        color: "text.primary",
                                    }}
                                >
                                    {item.value.toLocaleString("id-ID")}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Informasi tambahan untuk kurir */}
            {role === "kurir" && (
                <Box sx={{ mt: 4 }}>
                    <Alert severity="info">
                        <Typography variant="body2">
                            Dashboard ini menampilkan statistik pengiriman yang
                            ditugaskan kepada Anda. Data diperbarui secara
                            real-time berdasarkan status pengiriman.
                        </Typography>
                    </Alert>
                </Box>
            )}
        </PageContainer>
    );
}

export default DashboardHome;
