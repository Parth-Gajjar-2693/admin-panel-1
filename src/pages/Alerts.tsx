import { useEffect, useState } from "react";
import { BellOff, Plus } from "lucide-react";
import EmptyState from "@/components/dashboard/EmptyState";
import Modal from "@/components/common/Modal";
import Toast from "@/components/common/Toast";
import DataTable, { Column } from "@/components/common/DataTable";
import RowActions from "@/components/products/RowActions";

type AlertStatus = "ACTIVE" | "PAUSED";

interface Alert {
  id: number;
  title: string;
  message: string;
  status: AlertStatus;
  createdAt: string;
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(() => {
    const stored = localStorage.getItem("alerts");
    return stored ? JSON.parse(stored) : [];
  });

  const [addOpen, setAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const selectedAlert =
    editId !== null ? (alerts.find((a) => a.id === editId) ?? null) : null;

  const handleEdit = (id: number) => {
    setEditId(id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const [form, setForm] = useState({
    title: "",
    message: "",
    status: "ACTIVE" as AlertStatus,
  });

  useEffect(() => {
    localStorage.setItem("alerts", JSON.stringify(alerts));
  }, [alerts]);

  const handleAdd = () => {
    if (!form.title.trim()) return;

    const newAlert: Alert = {
      id: Date.now(),
      title: form.title.trim(),
      message: form.message.trim(),
      status: form.status,
      createdAt: new Date().toISOString(),
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setAddOpen(false);
    setForm({ title: "", message: "", status: "ACTIVE" });
    setToastMessage("Alert created successfully");
  };

  const toggleStatus = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: a.status === "ACTIVE" ? "PAUSED" : "ACTIVE",
            }
          : a,
      ),
    );
  };

  const confirmDelete = () => {
    if (deleteId === null) return;
    setAlerts((prev) => prev.filter((a) => a.id !== deleteId));
    setDeleteId(null);
    setToastMessage("Alert deleted successfully");
  };

  const columns: Column<Alert>[] = [
    {
      header: "Title",
      accessor: "title",
      sortable: true,
    },
    {
      header: "Message",
      accessor: "message",
    },
    {
      header: "Status",
      accessor: "status",
      render: (row) => (
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            row.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
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
      alignRight: false,
      render: (row) => (
        <RowActions
          onEdit={() => handleEdit(row.id)}
          onDelete={() => handleDelete(row.id)}
        />
      ),
    },
  ];

  if (alerts.length === 0) {
    return (
      <>
        <EmptyState
          icon={<BellOff size={36} />}
          title="No alerts"
          description="You're all caught up. Alerts will appear here when triggered."
        />

        <div className="mt-6 text-center">
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex  cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            Create Alert
          </button>
        </div>

        {renderModal()}
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Alerts</h1>
          <button
            onClick={() => setAddOpen(true)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            Create Alert
          </button>
        </div>

        <DataTable data={alerts} columns={columns} />
      </div>

      {renderModal()}
    </>
  );

  function renderModal() {
    return (
      <>
        <Modal
          open={addOpen}
          title="Create Alert"
          onClose={() => setAddOpen(false)}
        >
          <div className="space-y-4">
            <input
              placeholder="Alert Title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <textarea
              placeholder="Alert Message"
              value={form.message}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, message: e.target.value }))
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            />

            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status: e.target.value as AlertStatus,
                }))
              }
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="ACTIVE">Active</option>
              <option value="PAUSED">Paused</option>
            </select>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setAddOpen(false)}
                className="px-4 py-2 text-sm border rounded-md cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          open={deleteId !== null}
          title="Delete Alert"
          onClose={() => setDeleteId(null)}
        >
          <p className="text-sm mb-6">
            Are you sure you want to delete this alert?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 border rounded-md text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm cursor-pointer"
            >
              Delete
            </button>
          </div>
        </Modal>

        <Modal
          open={editId !== null}
          title="Edit Alert"
          onClose={() => setEditId(null)}
        >
          {selectedAlert && (
            <div className="space-y-4">
              <input
                value={selectedAlert.title}
                onChange={(e) =>
                  setAlerts((prev) =>
                    prev.map((a) =>
                      a.id === selectedAlert.id
                        ? { ...a, title: e.target.value }
                        : a,
                    ),
                  )
                }
                className="w-full border rounded-md px-3 py-2 text-sm"
              />

              <textarea
                value={selectedAlert.message}
                onChange={(e) =>
                  setAlerts((prev) =>
                    prev.map((a) =>
                      a.id === selectedAlert.id
                        ? { ...a, message: e.target.value }
                        : a,
                    ),
                  )
                }
                className="w-full border rounded-md px-3 py-2 text-sm"
              />

              <select
                value={selectedAlert.status}
                onChange={(e) =>
                  setAlerts((prev) =>
                    prev.map((a) =>
                      a.id === selectedAlert.id
                        ? {
                            ...a,
                            status: e.target.value as AlertStatus,
                          }
                        : a,
                    ),
                  )
                }
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="ACTIVE">Active</option>
                <option value="PAUSED">Paused</option>
              </select>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setEditId(null)}
                  className="px-4 py-2 text-sm border rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setEditId(null);
                    setToastMessage("Alert updated successfully");
                  }}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md cursor-pointer"
                >
                  Update
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
}
