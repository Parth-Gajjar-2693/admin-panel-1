import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function RowActions({ onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-xl hover:bg-slate-100 transition"
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 rounded-md border bg-white shadow-md z-50">
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full px-3 py-2 text-left text-sm cursor-pointer"
          >
            Edit
          </button>

          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="w-full px-3 py-2 text-left text-sm text-red-600 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
