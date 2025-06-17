// resources/js/paket/FormPaket.jsx
import React, { useState, useEffect } from "react";
import { createUsers, updateUsers } from "./authService";
export default function FormUsers({ initialData, onSuccess, onCancel }) {
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        no_telpon: "",
        role: "admin",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (initialData?.id) {
                await updateUsers(initialData.id, form);
            } else {
                await createUsers(form);
            }
            onSuccess();
        } catch (err) {
            console.error("Gagal submit:", err);

            const errors = err.response?.data?.errors;

            if (errors) {
                const allMessages = Object.values(errors).flat().join("\n");
                alert(allMessages);
            } else {
                alert("Gagal menyimpan data");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Fullname</label>
                    <input
                        type="text"
                        name="fullname"
                        value={form.fullname}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan nama lengkap"
                        maxLength={100}
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan email"
                        maxLength={100}
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan password"
                        maxLength={100}
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">No HP</label>
                    <input
                        type="text"
                        name="no_telpon"
                        value={form.no_telpon}
                        className="form-control"
                        placeholder="Contoh: 081234567890"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value) && value.length <= 13) {
                                handleChange(e);
                            }
                        }}
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Role</label>
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="form-control"
                        required
                    >
                        <option value="">-- Pilih Role --</option>
                        <option value="admin">Admin</option>
                        <option value="kurir">Kurir</option>
                    </select>
                </div>
            </div>

            <div className="d-flex gap-2 justify-content-end">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-secondary"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary"
                >
                    {loading
                        ? "Menyimpan..."
                        : initialData
                        ? "Update"
                        : "Tambah"}
                </button>
            </div>
        </form>
    );
}
