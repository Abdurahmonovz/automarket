import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DISABLE_AUTH } from "../../../config/auth";
import { type Model, MOCK_MODELS } from "../../../config/mockData";
import api from "../../../services/api";

interface ModelResponseDto {
  id: number;
  name: string;
  brandId: number;
  brandName: string;
}

const mapToModel = (item: ModelResponseDto): Model => ({
  id: item.id,
  name: item.name,
  brandId: item.brandId,
  brandName: item.brandName,
});

const useModels = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["models"],
    queryFn: async () => {
      const res = await api.get<ModelResponseDto[]>("/models");
      return res.data;
    },
    retry: false,
    enabled: !DISABLE_AUTH,
  });

  const models = useMemo(
    () => (DISABLE_AUTH ? MOCK_MODELS : (data ?? []).map(mapToModel)),
    [data],
  );

  return {
    models,
    isLoading: !DISABLE_AUTH && isLoading,
  };
};

export default useModels;
