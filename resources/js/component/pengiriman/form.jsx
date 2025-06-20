import React, { useState, useEffect } from "react";
import { createPengiriman, updatePengiriman } from "./pengirimanService";
import { fetchUsers } from "../auth/authService";
import { fetchPaket } from "../paket/paketService";
import Select from "react-select";

function FormPengiriman({ initialData, onSuccess, onCancel }) {
    const [form, setForm] = useState({
        paket_id: "",
        user_id: "",
        foto_bukti_diterima: null,
        status: "proses",
    });

    const [loading, setLoading] = useState(false);
    const isEdit = initialData?.id;
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [paket, setPaket] = useState([]);
    const [loadingPaket, setLoadingPaket] = useState(false);

    useEffect(() => {
        if (initialData) {
            setForm(initialData);
        }
    }, [initialData]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoadingUsers(true);
                const response = await fetchUsers();
                const dataUser = response.data.filter(
                    (user) => user.role === "kurir",
                );
                setUsers(dataUser);
            } catch (error) {
                console.error("Gagal fetch users:", error);
                setUsers([]);
            } finally {
                setLoadingUsers(false);
            }
        };

        loadUsers();
    }, []);
    const userOptions = users.map((user) => ({
        value: user.id,
        label: `${user.fullname} - ${user.email}`,
        user: user,
    }));

    const selectedUser =
        userOptions.find((option) => option.value == form.user_id) || null;

    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoadingPaket(true);
                const response = await fetchPaket();
                const dataPaket = response.data.filter(
                    (paket) => paket.status === "proses",
                );
                setPaket(dataPaket);
            } catch (error) {
                console.error("Gagal fetch paket:", error);
                setPaket([]);
            } finally {
                setLoadingPaket(false);
            }
        };

        loadUsers();
    }, []);

    const paketOptions = paket.map((item) => ({
        value: item.id,
        label: `${item.no_resi} - ${item.status}`,
        item: item,
    }));

    const selectedPaket =
        paketOptions.find((option) => option.value == form.paket_id) || null;

    const handleChange = (e) => {
        if (e.target.type === "file") {
            setForm({ ...form, [e.target.name]: e.target.files[0] || null });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Buat FormData untuk handle file upload
            const formData = new FormData();

            // Tambahkan field yang ada nilai
            Object.keys(form).forEach((key) => {
                if (
                    form[key] !== null &&
                    form[key] !== undefined &&
                    form[key] !== ""
                ) {
                    formData.append(key, form[key]);
                }
            });

            if (initialData?.id) {
                await updatePengiriman(initialData.id, formData);
            } else {
                await createPengiriman(formData);
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
                    <label className="form-label">Pilih Paket</label>
                    <Select
                        name="paket_id"
                        value={selectedPaket}
                        onChange={(selectedOption) => {
                            setForm({
                                ...form,
                                paket_id: selectedOption
                                    ? selectedOption.value
                                    : "",
                            });
                        }}
                        options={paketOptions}
                        placeholder={
                            loadingPaket
                                ? "Loading paket..."
                                : "Pilih atau cari paket..."
                        }
                        isLoading={loadingPaket}
                        isDisabled={loadingPaket}
                        isSearchable={true}
                        isClearable={true}
                        noOptionsMessage={() => "Tidak ada paket ditemukan"}
                        loadingMessage={() => "Memuat data paket..."}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: "38px",
                                borderColor: "#dee2e6",
                            }),
                        }}
                    />
                    {paket.length === 0 && !loadingPaket && (
                        <small className="text-muted text-danger">
                            Tidak ada paket tersedia
                        </small>
                    )}
                </div>

                <div className="col-md-6 mb-3">
                    <label className="form-label">Pilih Kurir</label>
                    <Select
                        name="user_id"
                        value={selectedUser}
                        onChange={(selectedOption) => {
                            setForm({
                                ...form,
                                user_id: selectedOption
                                    ? selectedOption.value
                                    : "",
                            });
                        }}
                        options={userOptions}
                        placeholder={
                            loadingUsers
                                ? "Loading kurir..."
                                : "Pilih atau cari kurir..."
                        }
                        isLoading={loadingUsers}
                        isDisabled={loadingUsers}
                        isSearchable={true}
                        isClearable={true}
                        noOptionsMessage={() => "Tidak ada kurir ditemukan"}
                        loadingMessage={() => "Memuat data kurir..."}
                        className="react-select-container"
                        classNamePrefix="react-select"
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                minHeight: "38px",
                                borderColor: "#dee2e6",
                            }),
                        }}
                    />
                    {users.length === 0 && !loadingUsers && (
                        <small className="text-muted text-danger">
                            Tidak ada kurir tersedia
                        </small>
                    )}
                </div>
            </div>

            {/* Field yang hanya muncul saat edit */}
            {isEdit && (
                <>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Foto Bukti Diterima
                            </label>
                            <input
                                type="file"
                                name="foto_bukti_diterima"
                                onChange={handleChange}
                                className="form-control"
                                accept="image/jpeg,image/jpg,image/png"
                            />
                            <small className="text-muted">
                                Format: JPG, JPEG, PNG. Maksimal 2MB
                            </small>
                        </div>

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
                </>
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

export default FormPengiriman;
