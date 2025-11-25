import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Patient } from "../../types/Patient";

interface PatientState {
  list: Patient[];
  loading: boolean;
}

const initialState: PatientState = { list: [], loading: false };

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatients(state, action: PayloadAction<Patient[]>) {
      state.list = action.payload;
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.list.push(action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setPatients, addPatient, setLoading } = patientSlice.actions;
export default patientSlice.reducer;
