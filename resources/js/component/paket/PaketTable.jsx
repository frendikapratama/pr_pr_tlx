import React from "react";

export default function PaketTable({ data }) {
    return (
        <table border="1" cellPadding="8">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name Paket</th>
                    <th>NO Resi</th>
                    <th>Nama Penerima</th>
                    <th>No HP Penerima</th>
                    <th>Alamat Penerima</th>
                    <th>Nama Pengirim</th>
                    <th>No HP Pengirim</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.nama_paket}</td>
                        <td>{item.no_resi}</td>
                        <td>{item.nama_penerima}</td>
                        <td>{item.no_hp_penerima}</td>
                        <td>{item.alamat_penerima}</td>
                        <td>{item.nama_pengirim}</td>
                        <td>{item.no_hp_pengirim}</td>
                        <td>{item.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
