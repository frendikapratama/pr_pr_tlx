// resources/js/paket/FormPaket.jsx
import React, { useState, useEffect } from "react";
import { createPaket, updatePaket } from "./paketService";
function FormPaket({ initialData, onSuccess, onCancel }) {
    const [form, setForm] = useState({
        nama_paket: "",
        nama_pengirim: "",
        nama_penerima: "",
        no_hp_penerima: "",
        alamat_penerima: "",
        no_hp_pengirim: "",
        status: "",
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
                await updatePaket(initialData.id, form);
            } else {
                await createPaket(form);
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
                    <label className="form-label">Nama Paket</label>
                    <input
                        type="text"
                        name="nama_paket"
                        value={form.nama_paket}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Nama Paket"
                        maxLength={100}
                        required
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Nama Pengirim</label>
                    <input
                        type="text"
                        name="nama_pengirim"
                        value={form.nama_pengirim}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Nama Pengirim"
                        maxLength={100}
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">No HP Pengirim</label>
                    <input
                        type="text"
                        name="no_hp_pengirim"
                        value={form.no_hp_pengirim}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="No HP Pengirim"
                        maxLength={20}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Nama Penerima</label>
                    <input
                        type="text"
                        name="nama_penerima"
                        value={form.nama_penerima}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Nama Penerima"
                        maxLength={100}
                        required
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">No HP Penerima</label>
                    <input
                        type="number"
                        name="no_hp_penerima"
                        value={form.no_hp_penerima}
                        className="form-control"
                        placeholder="No HP Penerima"
                        onChange={(e) => {
                            const value = e.target.value;
                            if (/^\d*$/.test(value) && value.length <= 20) {
                                handleChange(e);
                            }
                        }}
                    />
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Alamat Penerima</label>
                    <textarea
                        name="alamat_penerima"
                        value={form.alamat_penerima}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Alamat Penerima"
                        rows="3"
                        maxLength={200}
                    />
                </div>
            </div>
            {initialData?.id && (
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="form-control"
                            required
                        >
                            <option value="proses">Proses</option>
                            <option value="dikirim">Dikirim</option>
                            <option value="diterima">Diterima</option>
                            <option value="dibatalkan">Dibatalkan</option>
                        </select>
                    </div>
                </div>
            )}

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

export default FormPaket;
