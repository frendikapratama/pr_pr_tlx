// resources/js/paket/StatusEditForm.jsx
import React, { useState } from "react";
import { updatePaket } from "./paketService";

export default function StatusEditForm({ initialData, onSuccess, onCancel }) {
    const [status, setStatus] = useState(initialData?.status || "");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updatePaket(initialData.id, { ...initialData, status });
            onSuccess();
        } catch (err) {
            console.error("Gagal update status:", err);
            alert("Gagal mengupdate status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">
                    <strong>Paket:</strong> {initialData?.nama_paket}
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label">
                    <strong>No Resi:</strong> {initialData?.no_resi}
                </label>
            </div>
            <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="form-control"
                    required
                >
                    <option value="proses">Proses</option>
                    <option value="dikirim">Dikirim</option>
                    <option value="diterima">Diterima</option>
                    <option value="dibatalkan">Dibatalkan</option>
                </select>
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
                    className="btn btn-warning"
                >
                    {loading ? "Menyimpan..." : "Update Status"}
                </button>
            </div>
        </form>
    );
}
