import React, { Component } from "react";
import { connect } from "react-redux";
import PatientTable from "../components/tables/PatientTable";
import { fetchMockPatients } from "../utils/mock";
import { setPatients, setLoading } from "../redux/store/patientSlice";
import type { Patient } from "../types/Patient";
import type { RootState } from "../redux/store";
import { Link } from "react-router-dom";

interface Props {
    patients: Patient[];
    loading: boolean;
    setPatients: (data: Patient[]) => void;
    setLoading: (flag: boolean) => void;
}

interface State {
    search: string;
    sortBy: "nama" | "tanggalMasuk";
    sortDir: "asc" | "desc";
    page: number;
    pageSize: number;
}

class PatientListPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            search: "",
            sortBy: "nama",
            sortDir: "asc",
            page: 1,
            pageSize: 10,
        };
    }

    async componentDidMount() {
        if (this.props.patients.length > 0) return;

        this.props.setLoading(true);

        const mock = await fetchMockPatients(50);
        this.props.setPatients(mock);

        this.props.setLoading(false);
    }

    // ------------------------------
    // FILTER DATA
    // ------------------------------
    filterData() {
        const { patients } = this.props;
        const { search } = this.state;

        return patients.filter((p) => {
            const s = search.toLowerCase();
            return (
                p.nama.toLowerCase().includes(s) ||
                p.nik.toLowerCase().includes(s)
            );
        });
    }

    // ------------------------------
    // SORT DATA
    // ------------------------------
    sortData(list: Patient[]) {
        const { sortBy, sortDir } = this.state;

        return [...list].sort((a, b) => {
            let valA: string | number = "";
            let valB: string | number = "";

            if (sortBy === "nama") {
                valA = a.nama.toLowerCase();
                valB = b.nama.toLowerCase();
            } else if (sortBy === "tanggalMasuk") {
                valA = new Date(a.tanggalMasuk).getTime();
                valB = new Date(b.tanggalMasuk).getTime();
            }

            if (valA < valB) return sortDir === "asc" ? -1 : 1;
            if (valA > valB) return sortDir === "asc" ? 1 : -1;
            return 0;
        });
    }

    // ------------------------------
    // PAGINATION
    // ------------------------------
    paginate(list: Patient[]) {
        const { page, pageSize } = this.state;
        const start = (page - 1) * pageSize;
        return list.slice(start, start + pageSize);
    }

    // ------------------------------
    // RENDER
    // ------------------------------
    render() {
        const { loading } = this.props;
        const { search, sortBy, sortDir, page, pageSize } = this.state;

        if (loading) return <p className="p-6">Loading data...</p>;

        const filtered = this.filterData();
        const sorted = this.sortData(filtered);
        const paginated = this.paginate(sorted);

        const totalPages = Math.ceil(filtered.length / pageSize);

        return (
            <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg">Daftar Pasien</h2>

                    <Link
                        to="/add-patient"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm"
                    >
                        + Tambah Pasien
                    </Link>
                </div>

                {/* SEARCH */}
                <div className="mb-4">
                    <input
                        type="text"
                        className="border px-3 py-2 rounded w-full md:w-1/3"
                        placeholder="Cari nama atau NIK..."
                        value={search}
                        onChange={(e) =>
                            this.setState({ search: e.target.value, page: 1 })
                        }
                    />
                </div>

                {/* SORTING */}
                <div className="flex gap-4 mb-4">
                    <div>
                        <label className="text-sm font-medium">Sort By:</label>
                        <select
                            className="ml-2 border px-2 py-1 rounded"
                            value={sortBy}
                            onChange={(e) =>
                                this.setState({
                                    sortBy: e.target.value as any,
                                    page: 1,
                                })
                            }
                        >
                            <option value="nama">Nama</option>
                            <option value="tanggalMasuk">Tanggal Masuk</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Arah:</label>
                        <select
                            className="ml-2 border px-2 py-1 rounded"
                            value={sortDir}
                            onChange={(e) =>
                                this.setState({
                                    sortDir: e.target.value as any,
                                    page: 1,
                                })
                            }
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white p-4 rounded shadow">
                    <PatientTable data={paginated} />
                </div>

                {/* PAGINATION */}
                <div className="flex items-center justify-between mt-4">
                    <button
                        disabled={page <= 1}
                        onClick={() => this.setState({ page: page - 1 })}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <p>
                        Page {page} / {totalPages}
                    </p>

                    <button
                        disabled={page >= totalPages}
                        onClick={() => this.setState({ page: page + 1 })}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        );
    }
}

const mapState = (state: RootState) => ({
    patients: state.patient.list,
    loading: state.patient.loading,
});

const mapDispatch = {
    setPatients,
    setLoading,
};

export default connect(mapState, mapDispatch)(PatientListPage);
