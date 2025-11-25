import { Component } from "react";
import PatientForm from "../components/forms/PatientForm";

export default class PatientFormPage extends Component {
  render() {
    return (
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Formulir Pasien Masuk</h2>

        <div className="bg-white p-4 rounded shadow">
          <PatientForm />
        </div>
      </div>
    );
  }
}