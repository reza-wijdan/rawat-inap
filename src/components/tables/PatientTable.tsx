import { Component } from "react";

interface Patient {
    id: string;
    nama: string;
    nik: string;
    diagnosa: string;
    tanggalMasuk: string;
    dokter: string;
    ruangan: string;
}

interface Props {
    data: Patient[];
}

export default class PatientTable extends Component<Props> {
    render() {
        const { data } = this.props;

        return (
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow-xl">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left font-semibold border-b">No</th>
                        <th className="p-4 text-left font-semibold border-b">Nama</th>
                        <th className="p-4 text-left font-semibold border-b">NIK</th>
                        <th className="p-4 text-left font-semibold border-b">Diagnosa</th>
                        <th className="p-4 text-left font-semibold border-b">Tanggal Masuk</th>
                        <th className="p-4 text-left font-semibold border-b">Dokter</th>
                        <th className="p-4 text-left font-semibold border-b">Ruangan</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((p, i) => (
                        <tr
                            key={p.id}
                            className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                            <td className="p-4 border-b">{String(i + 1).padStart(5, "0")}</td>
                            <td className="p-4 border-b">{p.nama}</td>
                            <td className="p-4 border-b">{p.nik}</td>
                            <td className="p-4 border-b">{p.diagnosa}</td>
                            <td className="p-4 border-b">
                                {new Date(p.tanggalMasuk).toLocaleDateString("id-ID")}
                            </td>
                            <td className="p-4 border-b">{p.dokter}</td>
                            <td className="p-4 border-b">{p.ruangan}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}
