import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";

const TOKEN_KEY = "autocrmtoken";

const readToken = () =>
  typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;

const useMe = (enabled = true) => {
  const token = readToken();

  const { data: user, isLoading } = useQuery({
    queryKey: ["me", token],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.data;
    },
    retry: false,
    /** Token bo‘lmasa /users/me chaqirilmaydi — 401 konsolda chiqmaydi */
    enabled: enabled && !!token,
  });

  return { user, isLoading };
};


export default useMe
