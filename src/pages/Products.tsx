import { PackagePlus } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";

export default function Products() {
  const products: any[] = []; // static for now

  if (products.length === 0) {
    return (
      <EmptyState
        icon={<PackagePlus size={36} />}
        title="No products found"
        description="Start by adding your first product to the system."
        action={
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            Add Product
          </button>
        }
      />
    );
  }

  return <div>{/* products table later */}</div>;
}
