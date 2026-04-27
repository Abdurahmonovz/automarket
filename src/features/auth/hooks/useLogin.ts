import { useMutation } from "@tanstack/react-query";
import api from "../../../services/api";

interface LoginPayload {
    phone: string;
    password: string;
}

export interface LoginResponse {
    token?: string;
    accessToken?: string;
    role?: string;
    user?: {
        role?: string;
    };
    data?: {
        token?: string;
        role?: string;
    };
}

const useLogin = () => {
    const { mutate: login, isPending } = useMutation<LoginResponse, unknown, LoginPayload>({
        mutationKey: ["login"],
        mutationFn: async (data) => {
            const res = await api.post<LoginResponse>("/auth/login", data);
            return res.data;
        },
        retry :false
    })

    return { login, isPending }

}


export default useLogin
