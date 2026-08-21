import { useDispatch, useSelector } from "react-redux";
import { toggleTheme as toggle } from "@/store/slices/themeSlice";

export function useTheme() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  return { theme, toggleTheme: () => dispatch(toggle()) };
}
