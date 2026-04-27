import { useQuery } from "@tanstack/react-query";
import { DISABLE_AUTH } from "../../../config/auth";
import { MOCK_ADMIN_STATS } from "../../../config/mockData";
import api from "../../../services/api";

const useStates = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["states"],
        queryFn: async () => {
            const res = await api.get("/admin/stats");
            return res.data;
        },
        retry: false,
        enabled: !DISABLE_AUTH
    })

    return {
        data: DISABLE_AUTH ? MOCK_ADMIN_STATS : data,
        isLoading: !DISABLE_AUTH && isLoading
    }

}


export default useStates
