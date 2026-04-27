import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DISABLE_AUTH } from "../../../config/auth";
import { type Brand, MOCK_BRANDS } from "../../../config/mockData";
import api from "../../../services/api";

interface BrandResponseDto {
  id: number;
  name: string;
  logoUrl?: string;
}

const mapToBrand = (item: BrandResponseDto): Brand => ({
  id: item.id,
  name: item.name,
  logoUrl: item.logoUrl,
});

const useBrands = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await api.get<BrandResponseDto[]>("/brands");
      return res.data;
    },
    retry: false,
    enabled: !DISABLE_AUTH,
  });

  const brands = useMemo(
    () => (DISABLE_AUTH ? MOCK_BRANDS : (data ?? []).map(mapToBrand)),
    [data],
  );

  return {
    brands,
    isLoading: !DISABLE_AUTH && isLoading,
  };
};

export default useBrands;
