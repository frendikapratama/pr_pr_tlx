import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePengiriman } from "./pengirimanService";

export default function EditStatusPengiriman() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const statusOptions = [
        { value: "dikirim", label: "Dikirim" },
        { value: "diterima", label: "Diterima" },
        { value: "dibatalkan", label: "Dibatalkan" },
    ];

    const handleStatusChange = (e) => {
        const selectedStatus = e.target.value;
        setStatus(selectedStatus);

        if (selectedStatus !== "diterima") {
            setFile(null);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validasi ukuran file (maksimal 2MB)
            if (selectedFile.size > 2 * 1024 * 1024) {
                alert("Ukuran file terlalu besar. Maksimal 2MB");
                e.target.value = "";
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!status) {
            alert("Pilih status terlebih dahulu");
            return;
        }

        if (status === "diterima" && !file) {
            alert("Upload file bukti wajib untuk status diterima");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("status", status);
            if (status === "diterima" && file) {
                formData.append("foto_bukti_diterima", file);
            }

            const response = await updatePengiriman(id, formData);
            console.log("Update response:", response);

            alert("Status berhasil diupdate");

            // Paksa reload halaman atau navigasi ulang
            window.location.href = "/pengiriman";
            // atau gunakan: window.location.reload();
        } catch (error) {
            console.error("Error updating status:", error);
            const errors = error.response?.data?.errors;
            if (errors) {
                const allMessages = Object.values(errors).flat().join("\n");
                alert(allMessages);
            } else if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Gagal mengupdate status");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h3>Ubah Status Pengiriman</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Pilih Status */}
                        <div className="mb-3">
                            <label className="form-label">
                                Step 1: Pilih Status Baru
                            </label>
                            <select
                                className="form-select"
                                value={status}
                                onChange={handleStatusChange}
                                required
                            >
                                <option value="">Pilih Status</option>
                                {statusOptions.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Step 2: Upload File */}
                        {status === "diterima" && (
                            <div className="mb-3">
                                <label className="form-label">
                                    Step 2: Upload File Bukti
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={handleFileChange}
                                    accept="image/jpeg,image/jpg,image/png"
                                    required
                                />
                                <div className="form-text">
                                    Format yang diizinkan: JPG, JPEG, PNG.
                                    Maksimal 2MB
                                </div>
                            </div>
                        )}

                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={
                                    loading ||
                                    !status ||
                                    (status === "diterima" && !file)
                                }
                            >
                                {loading ? "Menyimpan..." : "Simpan"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/pengiriman")}
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
