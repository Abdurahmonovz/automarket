import { useQuery } from "@tanstack/react-query";
import { DISABLE_AUTH } from "../../../config/auth";
import { MOCK_USERS } from "../../../config/mockData";
import api from "../../../services/api";

const useUsers = () => {
    const { data: users, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await api.get("/users");
            return res.data;
        },
        retry: false,
        enabled: !DISABLE_AUTH
    })

    return {
        users: DISABLE_AUTH ? MOCK_USERS : users,
        isLoading: !DISABLE_AUTH && isLoading
    }

}


export default useUsers
