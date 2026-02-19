import { useState, useEffect } from "react";

type Status = "ACTIVE" | "INACTIVE";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  status: Status;
  createdAt: string;
}

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

export default function ProductForm({
  initialData,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    status: "ACTIVE" as Status,
  });

  // populate when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        category: initialData.category,
        price: String(initialData.price),
        status: initialData.status,
      });
    }
  }, [initialData]);

  const handleChange = (key: keyof typeof form, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.category) return;

    const product: Product = {
      id: initialData?.id ?? Date.now(),
      name: form.name,
      category: form.category,
      price: Number(form.price),
      status: form.status,
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
    };

    onSubmit(product);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Category</label>
        <input
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Price</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium">Status</label>
        <select
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value as Status)}
          className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-md border"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </div>
    </div>
  );
}
