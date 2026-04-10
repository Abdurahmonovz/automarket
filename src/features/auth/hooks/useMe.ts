import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../../services/api";



const useMe = () => {
    const { data: user, isLoading } = useQuery({
        queryKey: ["me"],
        queryFn: async (data: any) => {
            return await api.get("/users/me", data).then(res => res.data)
        },
        retry :2
    })

    return { user, isLoading }

}


export default useMe