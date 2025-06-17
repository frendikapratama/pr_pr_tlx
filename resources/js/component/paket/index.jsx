// resources/js/paket/PaketList.jsx
import React, { useEffect, useState } from "react";
import { fetchPaket, deletePaket } from "./paketService";
import PaketTable from "./PaketTable";
import FormPaket from "./form";
import Modal from "../Modal";
import StatusEditForm from "./StatusEditForm";

export default function PaketList() {
    const [paket, setPaket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [statusEditData, setStatusEditData] = useState(null);

    const loadPaket = async () => {
        try {
            setLoading(true);
            const res = await fetchPaket();
            setPaket(res.data);
        } catch (error) {
            console.error("Gagal fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPaket();
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
                await deletePaket(id);
                loadPaket();
            } catch (err) {
                console.error("Gagal hapus data:", err);
                alert("Gagal menghapus data");
            }
        }
    };

    const handleFormSuccess = () => {
        setModalOpen(false);
        setEditData(null);
        loadPaket();
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setEditData(null);
    };

    const handleEditStatus = (item) => {
        setStatusEditData(item);
        setStatusModalOpen(true);
    };

    const handleStatusSuccess = () => {
        setStatusModalOpen(false);
        setStatusEditData(null);
        loadPaket();
    };

    const handleStatusModalClose = () => {
        setStatusModalOpen(false);
        setStatusEditData(null);
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
                        <i className="bi bi-box-seam"></i> Daftar Paket
                    </h2>
                    <button onClick={handleAdd} className="btn btn-success">
                        <i className="bi bi-plus-circle"></i> Tambah Paket
                    </button>
                </div>

                <div className="card-body">
                    <PaketTable
                        data={paket}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onEditStatus={handleEditStatus}
                    />
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={handleModalClose}
                title={editData ? "Edit Paket" : "Tambah Paket"}
                size="xl"
            >
                <FormPaket
                    initialData={editData}
                    onSuccess={handleFormSuccess}
                    onCancel={handleModalClose}
                />
            </Modal>

            <Modal
                isOpen={statusModalOpen}
                onClose={handleStatusModalClose}
                title="Edit Status Paket"
                size="md"
            >
                <StatusEditForm
                    initialData={statusEditData}
                    onSuccess={handleStatusSuccess}
                    onCancel={handleStatusModalClose}
                />
            </Modal>
        </div>
    );
}
