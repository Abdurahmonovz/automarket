import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { DISABLE_AUTH } from "../../../config/auth";
import {
  type Product,
  type ProductStatus,
  MOCK_PRODUCTS,
} from "../../../config/mockData";
import api from "../../../services/api";

interface CarAdSummaryDto {
  id: number;
  brandName?: string;
  modelName?: string;
  year?: number;
  price?: number;
  mileage?: number;
  status?: string;
}

const toProductStatus = (status?: string): ProductStatus => {
  const normalized = String(status ?? "").toLowerCase();
  if (
    normalized === "approved" ||
    normalized === "pending" ||
    normalized === "rejected" ||
    normalized === "sold" ||
    normalized === "archived"
  ) {
    return normalized;
  }
  return "pending";
};

const mapToProduct = (car: CarAdSummaryDto): Product => {
  const brand = car.brandName ?? "";
  const model = car.modelName ?? "";
  const title = `${brand} ${model}`.trim() || `Ad #${car.id}`;

  return {
    id: car.id,
    title,
    price: Number(car.price ?? 0),
    brand,
    model,
    year: Number(car.year ?? new Date().getFullYear()),
    mileage: Number(car.mileage ?? 0),
    status: toProductStatus(car.status),
  };
};

const useProducts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await api.get<CarAdSummaryDto[]>("/cars/admin/all-cars");
      return res.data;
    },
    retry: false,
    enabled: !DISABLE_AUTH,
  });

  const products = useMemo(
    () => (DISABLE_AUTH ? MOCK_PRODUCTS : (data ?? []).map(mapToProduct)),
    [data],
  );

  return {
    products,
    isLoading: !DISABLE_AUTH && isLoading,
  };
};

export default useProducts;
