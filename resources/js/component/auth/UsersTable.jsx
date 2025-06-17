export default function UsersTable({ data, onEdit, onDelete }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>No Telpon</th>
                        <th>Role</th>
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
                                <td>{item.fullname}</td>
                                <td>{item.email}</td>
                                <td>{item.no_telpon}</td>
                                <td>{item.role}</td>

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
