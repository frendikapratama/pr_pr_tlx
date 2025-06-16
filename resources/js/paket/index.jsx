// resources/js/paket/index.js
import React, { useEffect, useState } from "react";
import api from "../axios";

export default function PaketList() {
    const [paket, setPaket] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/paket")
            .then((response) => {
                setPaket(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Gagal fetch data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    return (
        <div className="p-4">
            <h2>Daftar Paket</h2>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Pengirim</th>
                        <th>Penerima</th>
                        <th>Alamat</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {paket.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nama_pengirim}</td>
                            <td>{item.nama_penerima}</td>
                            <td>{item.alamat_penerima}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
