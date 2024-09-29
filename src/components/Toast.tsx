import { useEffect, useState } from "react";
import { CheckCircle, X, XCircle } from "@phosphor-icons/react";

interface ToastProp {
  typeAlert: "check" | "error";
  children: React.ReactNode;
  onClose?: () => void;
}

export function Toast({ typeAlert = "check", children, onClose }: ToastProp) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-end justify-center z-50 transition duration-300 ease-in-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-lg">
        {typeAlert == "check" ? (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <CheckCircle size={24} weight="fill" />
          </div>
        ) : (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
            <XCircle size={24} weight="fill" />
          </div>
        )}
        <div className="ml-3 text-sm font-normal">{children}</div>
        <button
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
