import React, { useEffect, useState } from "react";
import FormUsers from "./form";
import Modal from "../Modal";
import { fetchUsers, dedleteUsers } from "./authService";
import UsersTable from "./UsersTable";

export const AuthList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editData, setEditData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const res = await fetchUsers();
            setUsers(res.data);
        } catch (err) {
            console.error("Gagal fetch data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleAdd = () => {
        setEditData(null);
        setModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditData(item);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            try {
                await dedleteUsers(id);
                loadUsers();
            } catch (err) {
                console.error("Gagal hapus data:", err);
                alert("Gagal menghapus data");
            }
        }
    };

    const handleFormSuccess = () => {
        setModalOpen(false);
        setEditData(null);
        loadUsers();
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setEditData(null);
    };

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="container-fluid mt-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h2 className="card-title mb-0">
                        <i className="bi bi-box-seam"></i> Daftar users
                    </h2>
                    <button onClick={handleAdd} className="btn btn-success">
                        <i className="bi bi-plus-circle"></i> Tambah User
                    </button>
                </div>

                <div className="card-body">
                    <UsersTable
                        data={users}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
            <Modal
                isOpen={modalOpen}
                onClose={handleModalClose}
                title={editData ? "Edit User" : "Tambah User"}
                size="xl"
            >
                <FormUsers
                    initialData={editData}
                    onSuccess={handleFormSuccess}
                    onCancel={handleModalClose}
                />
            </Modal>
        </div>
    );
};
