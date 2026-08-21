import { useDispatch, useSelector } from "react-redux";
import { showToast, removeToast } from "@/store/slices/toastSlice";

export function useToast() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.toast.toasts);
  return {
    toasts,
    addToast: (type, title, message) => dispatch(showToast(type, title, message)),
    removeToast: (id) => dispatch(removeToast(id)),
  };
}
