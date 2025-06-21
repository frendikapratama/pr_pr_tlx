import React, { useEffect, useState } from "react";
import { PageContainer } from "@toolpad/core";
import { fetchPengiriman, deletePengiriman } from "./pengirimanService";
import PengirimanTable from "./pengirimanTabel";
import Modal from "../Modal";
import StatusEditForm from "../paket/StatusEditForm";
import FormPengiriman from "./form";
import { useAuth } from "../../context/AuthContext";

export default function PengirimanList() {
    const [loading, setLoading] = useState(true);
    const [pengiriman, setPengiriman] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const { role } = useAuth();

    const loadPaket = async () => {
        try {
            setLoading(true);
            const res = await fetchPengiriman();
            setPengiriman(res.data);
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

    const handleFormSuccess = () => {
        setModalOpen(false);
        setEditData(null);
        loadPaket();
    };
    const handleModalClose = () => {
        setModalOpen(false);
        setEditData(null);
    };

    const handleEdit = (item) => {
        setEditData(item);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            try {
                await deletePengiriman(id);
                loadPaket();
            } catch (err) {
                console.error("Gagal hapus data:", err);
                alert("Gagal menghapus data");
            }
        }
    };

    const handleEditStatus = (item) => {
        window.location.href = `/pengiriman/${item.id}/edit-status`;
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
        <PageContainer>
            <div className="container-fluid mt-4">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h2 className="card-title mb-0">
                            <i className="bi bi-box-seam"></i> Daftar Pengiriman
                        </h2>{" "}
                        {role === "admin" && (
                            <button
                                onClick={handleAdd}
                                className="btn btn-success"
                            >
                                <i className="bi bi-plus-circle"></i> Tambah
                                Pengiriman
                            </button>
                        )}
                    </div>
                    <PengirimanTable
                        data={pengiriman}
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
                <FormPengiriman
                    initialData={editData}
                    onSuccess={handleFormSuccess}
                    onCancel={handleModalClose}
                />
            </Modal>
        </PageContainer>
    );
}
