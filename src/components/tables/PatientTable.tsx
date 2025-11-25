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
      <table className="min-w-full text-sm p-4">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-2">Nama</th>
            <th className="text-left p-2">NIK</th>
            <th className="text-left p-2">Diagnosa</th>
            <th className="text-left p-2">Tanggal Masuk</th>
            <th className="text-left p-2">Dokter</th>
            <th className="text-left p-2">Ruangan</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((p) => (
            <tr
              key={p.id}
              className="border-b last:border-b-0 hover:bg-gray-50"
            >
              <td className="p-2">{p.nama}</td>
              <td className="p-2">{p.nik}</td>
              <td className="p-2">{p.diagnosa}</td>
              <td className="p-2">
                {new Date(p.tanggalMasuk).toLocaleDateString()}
              </td>
              <td className="p-2">{p.dokter}</td>
              <td className="p-2">{p.ruangan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
