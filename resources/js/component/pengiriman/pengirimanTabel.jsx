import React from "react";

function PengirimanTable({ data, onEdit, onDelete, onEditStatus }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Nama Pengirim</th>
                        <th>No Resi</th>
                        <th>Alamat Penerima</th>
                        <th>Nama Penerima</th>
                        <th>Status</th>
                        <th>Nama Kurir</th>
                        <th>Email Kurir</th>
                        <th>No Telp Kurir</th> <th>Aksi</th>
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
                                <td>{item.paket.nama_pengirim}</td>
                                <td>{item.paket.no_resi}</td>
                                <td>{item.paket.alamat_penerima}</td>
                                <td>{item.paket.nama_penerima}</td>
                                <td>{item.paket.status}</td>
                                <td>{item.kurir.fullname}</td>
                                <td>{item.kurir.email}</td>
                                <td>{item.kurir.no_telpon}</td>
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

export default PengirimanTable;
