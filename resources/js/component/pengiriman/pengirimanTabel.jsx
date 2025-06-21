import React from "react";
import { useAuth } from "../../context/AuthContext";

function PengirimanTable({ data, onEdit, onDelete, onEditStatus }) {
    const { role } = useAuth();
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        {role === "admin" && <th>Nama Pengirim</th>}
                        <th>No Resi</th>
                        <th>Alamat Penerima</th>
                        <th>Nama Penerima</th>
                        <th>Status</th>
                        <th>tanggal dibuat</th>
                        {role === "admin" && (
                            <>
                                <th>Nama Kurir</th>
                                <th>Email Kurir</th>
                                <th>No Telp Kurir</th>
                            </>
                        )}
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="text-center text-muted">
                                Tidak ada data
                            </td>
                        </tr>
                    ) : (
                        data.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>{" "}
                                {role === "admin" && (
                                    <td>{item.paket.nama_pengirim}</td>
                                )}
                                <td>{item.paket.no_resi}</td>
                                <td>{item.paket.alamat_penerima}</td>
                                <td>{item.paket.nama_penerima}</td>
                                <td>{item.paket.status}</td>{" "}
                                <td>
                                    {new Date(
                                        item.paket.created_at,
                                    ).toLocaleString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>
                                {role === "admin" && (
                                    <>
                                        <td>{item.kurir.fullname}</td>
                                        <td>{item.kurir.email}</td>
                                        <td>{item.kurir.no_telpon}</td>
                                    </>
                                )}
                                <td>
                                    {role === "admin" && (
                                        <div className="btn-group" role="group">
                                            <button
                                                onClick={() => onEdit(item)}
                                                className="btn btn-sm btn-outline-primary"
                                                title="Edit"
                                            >
                                                <i className="bi bi-pencil"></i>{" "}
                                                Edit
                                            </button>

                                            {onDelete && (
                                                <button
                                                    onClick={() =>
                                                        onDelete(item.id)
                                                    }
                                                    className="btn btn-sm btn-outline-danger"
                                                    title="Hapus"
                                                >
                                                    <i className="bi bi-trash"></i>{" "}
                                                    Hapus
                                                </button>
                                            )}
                                        </div>
                                    )}
                                    {role === "kurir" && (
                                        <button
                                            onClick={() => onEditStatus(item)}
                                            className="btn btn-sm btn-outline-success"
                                            title="Ubah Status"
                                            disabled={
                                                item.paket.status ===
                                                    "diterima" ||
                                                item.paket.status ===
                                                    "dibatalkan"
                                            }
                                        >
                                            <i className="bi bi-arrow-repeat"></i>
                                            Ubah Status
                                        </button>
                                    )}{" "}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default PengirimanTable;
