import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "@/data/mockData";
import {
  DEMO_CREDENTIALS,
  loginSuccess,
  logout,
  updateUser,
} from "@/store/slices/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const login = (email, password) => {
    if (
      email.toLowerCase() === DEMO_CREDENTIALS.email &&
      password === DEMO_CREDENTIALS.password
    ) {
      dispatch(loginSuccess(currentUser));
      return true;
    }
    return false;
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout: () => dispatch(logout()),
    updateUser: (u) => dispatch(updateUser(u)),
  };
}
