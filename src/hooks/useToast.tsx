"use client";

import toast from "react-hot-toast";
import { CustomToast, ToastType } from "@/common/components/CustomToast";

interface ToastOptions {
  title?: string;
  pTitle?: string;
  message?: string;
  pMessage?: string;
  duration?: number;
  id?: string;
}

const createToast = (type: ToastType, options: ToastOptions) => {
  return toast.custom(
    (t) => (
      <CustomToast
        t={t}
        type={type}
        title={options.title}
        pTitle={options.pTitle}
        message={options.message}
        pMessage={options.pMessage}
      />
    ),
    {
      duration: type === "loading" ? Infinity : options.duration || 3500,
      id: options.id,
    },
  );
};

export const useToast = () => {
  return {
    success: (options: ToastOptions) => createToast("success", options),
    error: (options: ToastOptions) => createToast("error", options),
    warning: (options: ToastOptions) => createToast("warning", options),
    info: (options: ToastOptions) => createToast("info", options),
    loading: (options: ToastOptions) => createToast("loading", options),
    dismiss: (id?: string) => toast.dismiss(id),
    promise: toast.promise,
  };
};
