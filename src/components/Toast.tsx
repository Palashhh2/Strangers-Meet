"use client";

import React, { useEffect, useState } from "react";
import { CheckCircleIcon, AlertCircleIcon, XIcon } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const Toast: React.FC<ToastMessage & { onClose: () => void }> = ({
  id,
  message,
  type,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : type === "error"
      ? "bg-red-50 border-red-200"
      : "bg-blue-50 border-blue-200";

  const textColor =
    type === "success"
      ? "text-green-800"
      : type === "error"
      ? "text-red-800"
      : "text-blue-800";

  const icon =
    type === "success" ? (
      <CheckCircleIcon className="w-5 h-5 text-green-600" />
    ) : type === "error" ? (
      <AlertCircleIcon className="w-5 h-5 text-red-600" />
    ) : null;

  return (
    <div
      className={`${bgColor} border ${textColor} px-4 py-3 rounded-lg shadow-md flex items-center gap-3 animate-fade-in`}
      role="alert"
    >
      {icon}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto text-opacity-70 hover:text-opacity-100"
      >
        <XIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType = "success", duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastMessage = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after duration
    if (duration !== 0) {
      setTimeout(() => removeToast(id), duration || 3000);
    }

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
};

export default function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
}
