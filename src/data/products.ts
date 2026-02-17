export type ProductStatus = "ACTIVE" | "INACTIVE";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: ProductStatus;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Steel",
    category: "Metals",
    price: 120,
    status: "ACTIVE",
    createdAt: "2026-01-05",
  },
  {
    id: 2,
    name: "Industrial Copper",
    category: "Metals",
    price: 95,
    status: "INACTIVE",
    createdAt: "2026-01-08",
  },
  {
    id: 3,
    name: "Aluminium Sheets",
    category: "Construction",
    price: 75,
    status: "ACTIVE",
    createdAt: "2026-01-12",
  },
];
