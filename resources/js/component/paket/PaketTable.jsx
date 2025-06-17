// resources/js/paket/PaketTable.jsx
import React from "react";

export default function PaketTable({ data, onEdit, onDelete }) {
    const getStatusBadge = (status) => {
        const badges = {
            delivered: "bg-success",
            in_transit: "bg-warning",
            pending: "bg-secondary",
            cancelled: "bg-danger",
        };
        return badges[status] || "bg-secondary";
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Nama Paket</th>
                        <th>No Resi</th>
                        <th>Nama Penerima</th>
                        <th>No HP Penerima</th>
                        <th>Alamat Penerima</th>
                        <th>Nama Pengirim</th>
                        <th>No HP Pengirim</th>
                        <th>Status</th>
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
                                <td>{index + 1}</td>
                                <td>{item.nama_paket}</td>
                                <td>{item.no_resi}</td>
                                <td>{item.nama_penerima}</td>
                                <td>{item.no_hp_penerima}</td>
                                <td>{item.alamat_penerima}</td>
                                <td>{item.nama_pengirim}</td>
                                <td>{item.no_hp_pengirim}</td>
                                <td>
                                    <span
                                        className={`badge ${getStatusBadge(
                                            item.status
                                        )}`}
                                    >
                                        {item.status}
                                    </span>
                                </td>
                                <td>
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
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
