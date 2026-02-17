import { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import { products as initialProducts, Product } from "@/data/products";
import EmptyState from "@/components/dashboard/EmptyState";
import RowActions from "@/components/products/RowActions";
import Modal from "@/components/common/Modal";
import Toast from "@/components/common/Toast";
import DataTable, { Column } from "@/components/common/DataTable";

export default function Products() {
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : initialProducts;
  });
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "ACTIVE" | "INACTIVE"
  >("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const handleEdit = (id: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    setEditForm({
      name: product.name,
      price: String(product.price),
    });

    setEditProductId(id);
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((product) =>
      statusFilter === "ALL" ? true : product.status === statusFilter,
    )
    .filter((product) =>
      categoryFilter === "ALL" ? true : product.category === categoryFilter,
    );

  if (products.length === 0) {
    return (
      <EmptyState
        title="No products found"
        description="Start by adding your first product."
      />
    );
  }

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId === null) return;

    setProducts((prev) => prev.filter((p) => p.id !== deleteId));

    setDeleteId(null);
    setToastMessage("Product deleted successfully");
  };

  const columns: Column<Product>[] = [
    {
      header: "Name",
      accessor: "name",
      sortable: true,
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
    },
    {
      header: "Price",
      accessor: "price",
      sortable: true,
      render: (row) => `$${row.price}`,
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            row.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-slate-200 text-slate-700"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Created",
      accessor: "createdAt",
      sortable: true,
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
    {
      header: "Actions",
      accessor: "id",
      alignRight: true,
      render: (row) => (
        <RowActions
          onEdit={() => handleEdit(row.id)}
          onDelete={() => handleDelete(row.id)}
        />
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* ===== Page Header ===== */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-text">Products</h1>
            <p className="text-sm text-muted">
              Manage and monitor your inventory
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition">
            <Plus size={16} />
            Add Product
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative w-full max-w-sm">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-md border bg-white px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <DataTable data={filteredProducts} columns={columns} />
      </div>
      <Modal
        open={deleteId !== null}
        title="Delete Product"
        onClose={() => setDeleteId(null)}
      >
        <p className="text-sm text-muted mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setDeleteId(null)}
            className="px-4 py-2 text-sm rounded-md border cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </Modal>
      <Modal
        open={editProductId !== null}
        title="Edit Product"
        onClose={() => setEditProductId(null)}
      >
        {editProductId !== null && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                value={editForm.name}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Price</label>
              <input
                type="number"
                value={editForm.price}
                onChange={(e) =>
                  setEditForm((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                className="w-full mt-1 border rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setEditProductId(null)}
                className="px-4 py-2 text-sm rounded-md border cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (editProductId === null) return;

                  setProducts((prev) =>
                    prev.map((p) =>
                      p.id === editProductId
                        ? {
                            ...p,
                            name: editForm.name,
                            price: Number(editForm.price),
                          }
                        : p,
                    ),
                  );

                  setEditProductId(null);
                  setToastMessage("Product updated successfully");
                }}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </Modal>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </>
  );
}
