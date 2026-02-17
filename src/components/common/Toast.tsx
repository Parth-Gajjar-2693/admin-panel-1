import { useEffect } from "react";
import { CheckCircle, X } from "lucide-react";

type Props = {
  message: string;
  onClose: () => void;
};

export default function Toast({ message, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-[100]">
      <div className="flex items-center gap-3 rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg animate-slide-in">
        <CheckCircle size={18} />
        <span className="text-sm">{message}</span>

        <button onClick={onClose} className="ml-2 hover:opacity-80">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
