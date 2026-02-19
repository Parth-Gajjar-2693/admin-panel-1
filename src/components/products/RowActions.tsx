import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export default function RowActions({ onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate dropdown position
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.right - 128 + window.scrollX,
      });
    }
  }, [open]);

  // Proper outside click handling
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-xl cursor-pointer"
      >
        <MoreVertical size={20} />
      </button>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              width: 128,
            }}
            className="rounded-md border bg-white shadow-lg z-[9999]"
          >
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
          </div>,
          document.body,
        )}
    </>
  );
}
