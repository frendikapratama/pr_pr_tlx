import React, { useEffect, useState } from "react";
import { fetchPaket } from "./paketService";
import PaketTable from "./PaketTable";

export default function PaketList() {
    const [paket, setPaket] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPaket()
            .then((res) => {
                setPaket(res.data);
            })
            .catch((err) => {
                console.error("Gagal fetch data:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h2>Daftar Paket</h2>
            <PaketTable data={paket} />
            <button>
                <a href="/paket/create">Tambah Paket</a>
            </button>
        </div>
    );
}
