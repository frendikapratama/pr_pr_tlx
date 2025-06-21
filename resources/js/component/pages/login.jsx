import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth(); // Tambahkan ini

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:8000/api/login",
                {
                    email,
                    password,
                },
            );

            const { access_token, user } = response.data;

            login(user, access_token);

            navigate("/dashboard");
        } catch (err) {
            setError("Email atau password salah.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={6} sx={{ padding: 4, marginTop: 8 }}>
                <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ color: "#1976d2" }}
                >
                    Login
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, backgroundColor: "#1976d2" }}
                    >
                        Login
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;
