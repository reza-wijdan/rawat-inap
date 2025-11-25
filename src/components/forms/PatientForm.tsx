import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { addPatient } from "../../redux/store/patientSlice";
import type { Patient } from "../../types/Patient";
import NotificationModal from "../../components/common/NotificationModal";

interface Props {
  dispatchAdd: (p: Patient) => void;
}

interface State {
  nama: string;
  nik: string;
  diagnosa: string;
  tanggalMasuk: string;
  dokter: string;
  ruangan: string;
  errors: Record<string, string>;
  showNotif: boolean; 
}

class PatientForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      nama: "",
      nik: "",
      diagnosa: "",
      tanggalMasuk: "",
      dokter: "",
      ruangan: "",
      errors: {},
      showNotif: false,
    };
  }

  // VALIDASI FORM

  validate = () => {
    const { nama, nik, diagnosa, tanggalMasuk, dokter, ruangan } = this.state;

    const e: Record<string, string> = {};

    if (!nama.trim()) e.nama = "Nama wajib diisi";

    if (!nik.trim()) e.nik = "NIK wajib diisi";
    else if (!/^[0-9]+$/.test(nik) || nik.length < 10 || nik.length > 20)
      e.nik = "NIK harus angka, panjang 10-20";

    if (!diagnosa.trim()) e.diagnosa = "Diagnosa wajib diisi";
    if (!tanggalMasuk) e.tanggalMasuk = "Tanggal masuk wajib diisi";
    if (!dokter.trim()) e.dokter = "Dokter wajib diisi";
    if (!ruangan.trim()) e.ruangan = "Ruangan wajib diisi";

    this.setState({ errors: e });

    return Object.keys(e).length === 0;
  };

  // SUBMIT FORM

  onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!this.validate()) return;

    const { nama, nik, diagnosa, tanggalMasuk, dokter, ruangan } = this.state;

    const newP: Patient = {
      id: `local-${Date.now()}`,
      nama: nama.trim(),
      nik: nik.trim(),
      diagnosa: diagnosa.trim().toUpperCase(),
      tanggalMasuk: new Date(tanggalMasuk).toISOString(),
      dokter: dokter.trim(),
      ruangan: ruangan.trim(),
    };

    this.props.dispatchAdd(newP);

    // Reset form
    this.setState({
      nama: "",
      nik: "",
      diagnosa: "",
      tanggalMasuk: "",
      dokter: "",
      ruangan: "",
      errors: {},
      showNotif: true,
    });
  };

  // RESET MANUAL

  onReset = () => {
    this.setState({
      nama: "",
      nik: "",
      diagnosa: "",
      tanggalMasuk: "",
      dokter: "",
      ruangan: "",
      errors: {},
    });
  };

  render() {
    const { nama, nik, diagnosa, tanggalMasuk, dokter, ruangan, errors } =
      this.state;

    return (
      <>
        <form
          onSubmit={this.onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <Input
            label="Nama"
            value={nama}
            onChange={(v) => this.setState({ nama: v })}
            error={errors.nama}
          />

          <Input
            label="NIK"
            value={nik}
            onChange={(v) => this.setState({ nik: v })}
            placeholder="tanpa spasi"
            error={errors.nik}
          />

          <Input
            label="Diagnosa Masuk"
            value={diagnosa}
            onChange={(v) => this.setState({ diagnosa: v })}
            error={errors.diagnosa}
          />

          <Input
            label="Tanggal Masuk"
            value={tanggalMasuk}
            onChange={(v) => this.setState({ tanggalMasuk: v })}
            type="date"
            error={errors.tanggalMasuk}
          />

          <Input
            label="Dokter Penanggung Jawab"
            value={dokter}
            onChange={(v) => this.setState({ dokter: v })}
            error={errors.dokter}
          />

          <Input
            label="Ruangan"
            value={ruangan}
            onChange={(v) => this.setState({ ruangan: v })}
            error={errors.ruangan}
          />

          <div className="md:col-span-2 flex items-center justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={this.onReset}
              className="px-4 py-2 border rounded"
            >
              Reset
            </button>

            <Button type="submit">Simpan Pasien</Button>
          </div>
        </form>

        <NotificationModal
          show={this.state.showNotif}
          title="Berhasil!"
          message="Data pasien berhasil disimpan."
          onClose={() => this.setState({ showNotif: false })}
        />
      </>
    );
  }
}

// Redux binding

const mapDispatchToProps = (dispatch: any) => ({
  dispatchAdd: (p: Patient) => dispatch(addPatient(p)),
});

export default connect(null, mapDispatchToProps)(PatientForm);
