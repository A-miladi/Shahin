"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={12}
      toastOptions={{
        duration: 3500,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
          margin: 0,
          maxWidth: "420px",
          width: "100%",
        },
      }}
    />
  );
};
