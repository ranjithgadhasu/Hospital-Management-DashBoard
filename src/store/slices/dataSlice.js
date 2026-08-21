import { createSlice } from "@reduxjs/toolkit";
import {
  patients as seedPatients,
  doctors as seedDoctors,
  appointments as seedAppointments,
  beds as seedBeds,
  medicines as seedMedicines,
  invoices as seedInvoices,
  notifications as seedNotifications,
} from "@/data/mockData";

const initialState = {
  loading: true,
  patients: seedPatients,
  doctors: seedDoctors,
  appointments: seedAppointments,
  beds: seedBeds,
  medicines: seedMedicines,
  invoices: seedInvoices,
  notifications: seedNotifications,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addPatient: (state, action) => {
      state.patients.unshift(action.payload);
    },
    updatePatient: (state, action) => {
      state.patients = state.patients.map((p) =>
        p.id === action.payload.id ? action.payload : p
      );
    },
    deletePatient: (state, action) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload);
    },
    addDoctor: (state, action) => {
      state.doctors.unshift(action.payload);
    },
    updateDoctor: (state, action) => {
      state.doctors = state.doctors.map((d) =>
        d.id === action.payload.id ? action.payload : d
      );
    },
    deleteDoctor: (state, action) => {
      state.doctors = state.doctors.filter((d) => d.id !== action.payload);
    },
    addAppointment: (state, action) => {
      state.appointments.unshift(action.payload);
    },
    updateAppointment: (state, action) => {
      state.appointments = state.appointments.map((a) =>
        a.id === action.payload.id ? action.payload : a
      );
    },
    deleteAppointment: (state, action) => {
      state.appointments = state.appointments.filter((a) => a.id !== action.payload);
    },
    updateBed: (state, action) => {
      state.beds = state.beds.map((b) =>
        b.id === action.payload.id ? action.payload : b
      );
    },
    addMedicine: (state, action) => {
      state.medicines.unshift(action.payload);
    },
    updateMedicine: (state, action) => {
      state.medicines = state.medicines.map((m) =>
        m.id === action.payload.id ? action.payload : m
      );
    },
    deleteMedicine: (state, action) => {
      state.medicines = state.medicines.filter((m) => m.id !== action.payload);
    },
    addInvoice: (state, action) => {
      state.invoices.unshift(action.payload);
    },
    updateInvoice: (state, action) => {
      state.invoices = state.invoices.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((i) => i.id !== action.payload);
    },
    markNotificationRead: (state, action) => {
      state.notifications = state.notifications.map((n) =>
        n.id === action.payload ? { ...n, read: true } : n
      );
    },
    markAllNotificationsRead: (state) => {
      state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  addPatient,
  updatePatient,
  deletePatient,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  addAppointment,
  updateAppointment,
  deleteAppointment,
  updateBed,
  addMedicine,
  updateMedicine,
  deleteMedicine,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
} = dataSlice.actions;

// Thunk: simulates an async data fetch to demonstrate loading states
export const loadData = () => (dispatch) => {
  setTimeout(() => dispatch(setLoading(false)), 700);
};

export default dataSlice.reducer;
