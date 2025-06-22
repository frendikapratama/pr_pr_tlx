import React, { useState } from "react";
import axios from "axios";

function CekResi() {
    const [noResi, setNoResi] = useState("");
    const [paket, setPaket] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setError("");
        setPaket(null);

        if (!noResi.trim()) {
            setError("No Resi tidak boleh kosong");
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:8000/api/paket/search`,
                {
                    params: { no_resi: noResi },
                },
            );

            if (response.data.status) {
                setPaket(response.data.paket);
            } else {
                setError("Paket tidak ditemukan");
            }
        } catch (err) {
            setError("Terjadi kesalahan atau resi tidak ditemukan");
        }
    };

    return (
        <div className="container mt-5">
            <h3>Cek Resi Pengiriman</h3>
            <div className="input-group mb-3 mt-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan No Resi"
                    value={noResi}
                    onChange={(e) => setNoResi(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSearch}>
                    Cari
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {paket && (
                <div className="card mt-4">
                    <div className="card-header">
                        <strong>Detail Paket</strong>
                    </div>
                    <div className="card-body">
                        <p>
                            <strong>No Resi:</strong> {paket.no_resi}
                        </p>
                        <p>
                            <strong>Nama Paket:</strong> {paket.nama_paket}
                        </p>
                        <p>
                            <strong>Status:</strong> {paket.status}
                        </p>
                        <hr />
                        <p>
                            <strong>Pengirim:</strong> {paket.nama_pengirim} (
                            {paket.no_hp_pengirim})
                        </p>
                        <p>
                            <strong>Penerima:</strong> {paket.nama_penerima} (
                            {paket.no_hp_penerima})
                        </p>
                        <p>
                            <strong>Alamat Penerima:</strong>{" "}
                            {paket.alamat_penerima}
                        </p>
                        <p>
                            <strong>Waktu Dibuat:</strong>{" "}
                            {new Date(paket.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CekResi;
