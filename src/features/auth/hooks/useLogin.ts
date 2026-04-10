import { useMutation } from "@tanstack/react-query";
import api from "../../../services/api";



const useLogin = () => {
    const { mutate: login, isPending } = useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: any) => {
            return await api.post("/auth/login", data).then(res => res.data)
        },
        retry :2
    })

    return { login, isPending }

}


export default useLogin