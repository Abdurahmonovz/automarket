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


const useBrandModels = (brandId: number | null, enabled: boolean) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["models", "brand", brandId],
    queryFn: async () => {
      const res = await api.get<ModelResponseDto[]>(`/models/brand/${brandId}`);
      return (res.data ?? []).map(mapToModel);
    },
    enabled: enabled && brandId != null && !DISABLE_AUTH,
    retry:false,
  });


  const models = useMemo(() => {
    if (!enabled || brandId == null) return [];
    if (DISABLE_AUTH) {
      return MOCK_MODELS.filter((m) => m.brandId === brandId);
    }
    return data ?? [];
  }, [enabled, brandId, data]);


  return {
    models,
    isLoading: !DISABLE_AUTH && isLoading,
    isError: !DISABLE_AUTH && isError,
    error,
  };
};

export default useBrandModels;
