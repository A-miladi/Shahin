"use client";

import {
  FiCheckCircle,
  FiXCircle,
  FiInfo,
  FiAlertTriangle,
  FiLoader,
  FiX,
} from "react-icons/fi";
import type { IconType } from "react-icons";
import toast from "react-hot-toast";

export type ToastType = "success" | "error" | "info" | "warning" | "loading";

interface ToastConfig {
  icon: IconType;
  color: string;
  bg: string;
  border: string;
  glow: string;
  defaultTitle: string;
  defaultPTitle: string;
  animation: string;
}

const config: Record<ToastType, ToastConfig> = {
  success: {
    icon: FiCheckCircle,
    color: "text-action-400",
    bg: "bg-action-400/10",
    border: "border-action-400/30",
    glow: "shadow-[0_0_30px_rgba(104,123,96,0.25)]",
    defaultTitle: "Success",
    defaultPTitle: "موفق",
    animation: "animate-toast-pulse",
  },
  error: {
    icon: FiXCircle,
    color: "text-special-300",
    bg: "bg-special-300/10",
    border: "border-special-300/30",
    glow: "shadow-[0_0_30px_rgba(201,74,66,0.25)]",
    defaultTitle: "Error",
    defaultPTitle: "خطا",
    animation: "animate-toast-shake",
  },
  warning: {
    icon: FiAlertTriangle,
    color: "text-action-200",
    bg: "bg-action-200/10",
    border: "border-action-200/30",
    glow: "shadow-[0_0_30px_rgba(168,117,50,0.25)]",
    defaultTitle: "Warning",
    defaultPTitle: "هشدار",
    animation: "animate-toast-pulse-soft",
  },
  info: {
    icon: FiInfo,
    color: "text-special-400",
    bg: "bg-special-400/10",
    border: "border-special-400/30",
    glow: "shadow-[0_0_30px_rgba(102,123,135,0.25)]",
    defaultTitle: "Info",
    defaultPTitle: "اطلاع",
    animation: "animate-toast-pulse-soft",
  },
  loading: {
    icon: FiLoader,
    color: "text-primary-400",
    bg: "bg-primary-400/10",
    border: "border-primary-400/30",
    glow: "shadow-[0_0_30px_rgba(191,166,145,0.25)]",
    defaultTitle: "Loading",
    defaultPTitle: "در حال بارگذاری",
    animation: "animate-toast-spin",
  },
};

interface CustomToastProps {
  t: any;
  type: ToastType;
  title?: string;
  pTitle?: string;
  message?: string;
  pMessage?: string;
}

export const CustomToast: React.FC<CustomToastProps> = ({
  t,
  type,
  title,
  pTitle,
  message,
  pMessage,
}) => {
  const cfg = config[type];
  const Icon = cfg.icon;

  return (
    <div
      className={`
        animate-toast-enter
        relative flex items-start gap-3 p-4 pr-3 rounded-2xl
        bg-state-400/95 backdrop-blur-xl
        border ${cfg.border}
        ${cfg.glow}
        overflow-hidden
        min-w-[320px] max-w-[420px]
      `}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-[1px] ${
          type === "success"
            ? "bg-gradient-to-r from-transparent via-action-400 to-transparent"
            : type === "error"
              ? "bg-gradient-to-r from-transparent via-special-300 to-transparent"
              : type === "warning"
                ? "bg-gradient-to-r from-transparent via-action-200 to-transparent"
                : type === "loading"
                  ? "bg-gradient-to-r from-transparent via-primary-400 to-transparent"
                  : "bg-gradient-to-r from-transparent via-special-400 to-transparent"
        }`}
      />

      <div
        className={`
          ${cfg.animation}
          relative flex-shrink-0
          w-10 h-10 rounded-xl flex items-center justify-center
          ${cfg.bg} border ${cfg.border}
        `}
      >
        <Icon className={`w-5 h-5 ${cfg.color}`} />
      </div>

      <div className="flex-1 min-w-0 pt-0.5">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-semibold text-neutral-50">
            {title || cfg.defaultTitle}
          </h3>
          <span className="text-[10px] text-secondary-500">
            / {pTitle || cfg.defaultPTitle}
          </span>
        </div>

        {message && (
          <p className="text-xs text-secondary-300 leading-relaxed">
            {message}
          </p>
        )}
        {pMessage && (
          <p
            className="text-[11px] text-secondary-500 leading-relaxed mt-0.5"
            dir="rtl"
          >
            {pMessage}
          </p>
        )}
      </div>

      <button
        onClick={() => toast.dismiss(t.id)}
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-lg text-secondary-500 hover:text-neutral-50 hover:bg-white/5 hover:scale-110 hover:rotate-90 active:scale-90 transition-all duration-300"
      >
        <FiX className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
