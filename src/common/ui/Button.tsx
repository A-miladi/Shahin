import React from "react";
import { IconType } from "react-icons";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  icon?: IconType;
  className?: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  icon: Icon,
  className = "",
  onClick,
  ...props
}) => {
  const baseStyles =
    "flex items-center cursor-pointer justify-center gap-3 font-medium transition-all duration-300 rounded-full px-4 lg:px-8 py-2 lg:py-3.5 w-fit";

  const variants: Record<string, string> = {
    primary: "bg-[#C49A6C] hover:bg-[#b08a5f] text-black",
    outline: "border border-gray-600 text-white hover:bg-white/10",
    ghost: "text-gray-300 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {Icon && <Icon className="lg:w-5 lg:h-5 w-4 h-4" />}
    </button>
  );
};
