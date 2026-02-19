import React from "react";

type StatusVariant = "success" | "error" | "warning" | "info" | "default";

interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: StatusVariant;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  success: "bg-green-100 text-green-800 ring-green-600/20",
  error: "bg-red-100 text-red-800 ring-red-600/20",
  warning: "bg-yellow-100 text-yellow-800 ring-yellow-600/20",
  info: "bg-blue-100 text-blue-800 ring-blue-600/20",
  default: "bg-gray-100 text-gray-800 ring-gray-600/20",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ring-1 ring-inset ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
