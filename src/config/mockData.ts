export interface MockUser {
  id: number;
  phone: string;
  fullName: string;
  region: string;
  city: string;
  role: string;
  active: boolean;
}

export interface MockAdminStats {
  today: { approved: number; pending: number; rejected: number; sold: number };
  lastWeek: {
    approved: number;
    pending: number;
    rejected: number;
    sold: number;
  };
  lastMonth: {
    approved: number;
    pending: number;
    rejected: number;
    sold: number;
  };
  totalAds: number;
  totalApproved: number;
  totalPending: number;
  totalRejected: number;
  totalSold: number;
  totalArchived: number;
  averagePriceApproved: number;
  topBrand: string;
  topModel: string;
}

export type ProductStatus =
  | "approved"
  | "pending"
  | "rejected"
  | "sold"
  | "archived";

export interface Product {
  id: number;
  title: string;
  price: number;
  brand: string;
  model: string;
  year: number;
  mileage: number;
  status: ProductStatus;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 1,
    phone: "+998901112233",
    fullName: "Ali Valiyev",
    region: "Toshkent",
    city: "Toshkent",
    role: "ADMIN",
    active: true,
  },
  {
    id: 2,
    phone: "+998935556677",
    fullName: "Jasur Karimov",
    region: "Samarqand",
    city: "Samarqand",
    role: "SELLER",
    active: true,
  },
  {
    id: 3,
    phone: "+998977778899",
    fullName: "Dilnoza Ahmedova",
    region: "Farg'ona",
    city: "Farg'ona",
    role: "USER",
    active: false,
  },
  {
    id: 4,
    phone: "+998901234567",
    fullName: "Olimjon Islomov",
    region: "Andijon",
    city: "Andijon",
    role: "USER",
    active: true,
  },
  {
    id: 5,
    phone: "+998937188885",
    fullName: "Zayniddin Abdurahmonov",
    region: "Samarqand",
    city: "Samarqand",
    role: "SELLER",
    active: false,
  },
  {
    id: 6,
    phone: "+998912345678",
    fullName: "Gulnora Tursunova",
    region: "Namangan",
    city: "Namangan",
    role: "USER",
    active: true,
  },
  {
    id: 7,
    phone: "+998901234567",
    fullName: "Olimjon Islomov",
    region: "Andijon",
    city: "Andijon",
    role: "USER",
    active: true,
  },
  {
    id: 8,
    phone: "+998937188885",
    fullName: "Zayniddin Abdurahmonov",
    region: "Samarqand",
    city: "Samarqand",
    role: "SELLER",
    active: false,
  },
  {
    id: 9,
    phone: "+998912345678",
    fullName: "Gulnora Tursunova",
    region: "Namangan",
    city: "Namangan",
    role: "USER",
    active: true,
  },
  {
    id: 10,
    phone: "+998901234567",
    fullName: "Olimjon Islomov",
    region: "Andijon",
    city: "Andijon",
    role: "USER",
    active: true,
  },
  
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Chevrolet Cobalt",
    price: 12000,
    brand: "Chevrolet",
    model: "Cobalt",
    year: 2022,
    mileage: 20000,
    status: "approved",
  },
  {
    id: 2,
    title: "Toyota Camry",
    price: 22000,
    brand: "Toyota",
    model: "Camry",
    year: 2021,
    mileage: 30000,
    status: "pending",
  },
  {
    id: 3,
    title: "BMW X5",
    price: 45000,
    brand: "BMW",
    model: "X5",
    year: 2020,
    mileage: 15000,
    status: "rejected",
  },
  {
    id: 4,
    title: "Mercedes E-Class",
    price: 35000,
    brand: "Mercedes",
    model: "E-Class",
    year: 2019,
    mileage: 40000,
    status: "sold",
  },  
];

export interface Brand {
  id: number;
  name: string;
  logoUrl?: string;
}

export const MOCK_BRANDS: Brand[] = [
  { id: 1, name: "Chevrolet", logoUrl: "" },
  { id: 2, name: "Toyota", logoUrl: "" },
  { id: 3, name: "BMW", logoUrl: "" },
  { id: 4, name: "Mercedes", logoUrl: "" },
];

export interface Model {
  id: number;
  name: string;
  brandId: number;
  brandName: string;
}

export const MOCK_MODELS: Model[] = [
  { id: 1, name: "Cobalt", brandId: 1, brandName: "Chevrolet" },
  { id: 2, name: "Spark", brandId: 1, brandName: "Chevrolet" },
  { id: 3, name: "Malibu", brandId: 1, brandName: "Chevrolet" },
  { id: 4, name: "Camry", brandId: 2, brandName: "Toyota" },
];

export const MOCK_ADMIN_STATS: MockAdminStats = {
  today: { approved: 7, pending: 3, rejected: 1, sold: 2 },
  lastWeek: { approved: 36, pending: 12, rejected: 5, sold: 14 },
  lastMonth: { approved: 128, pending: 34, rejected: 16, sold: 53 },
  totalAds: 201,
  totalApproved: 128,
  totalPending: 34,
  totalRejected: 16,
  totalSold: 53,
  totalArchived: 9,
  averagePriceApproved: 18240,
  topBrand: "Chevrolet",
  topModel: "Cobalt",
};
