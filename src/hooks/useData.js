import { useDispatch, useSelector } from "react-redux";
import {
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
} from "@/store/slices/dataSlice";

export function useData() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  return {
    ...data,
    addPatient: (p) => dispatch(addPatient(p)),
    updatePatient: (p) => dispatch(updatePatient(p)),
    deletePatient: (id) => dispatch(deletePatient(id)),
    addDoctor: (d) => dispatch(addDoctor(d)),
    updateDoctor: (d) => dispatch(updateDoctor(d)),
    deleteDoctor: (id) => dispatch(deleteDoctor(id)),
    addAppointment: (a) => dispatch(addAppointment(a)),
    updateAppointment: (a) => dispatch(updateAppointment(a)),
    deleteAppointment: (id) => dispatch(deleteAppointment(id)),
    updateBed: (b) => dispatch(updateBed(b)),
    addMedicine: (m) => dispatch(addMedicine(m)),
    updateMedicine: (m) => dispatch(updateMedicine(m)),
    deleteMedicine: (id) => dispatch(deleteMedicine(id)),
    addInvoice: (i) => dispatch(addInvoice(i)),
    updateInvoice: (i) => dispatch(updateInvoice(i)),
    deleteInvoice: (id) => dispatch(deleteInvoice(id)),
    markNotificationRead: (id) => dispatch(markNotificationRead(id)),
    markAllNotificationsRead: () => dispatch(markAllNotificationsRead()),
    deleteNotification: (id) => dispatch(deleteNotification(id)),
  };
}
