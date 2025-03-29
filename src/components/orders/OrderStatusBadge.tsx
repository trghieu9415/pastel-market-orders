
import React from "react";
import { OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";
import { Package, Check, Truck, Clock } from "lucide-react";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    pending: {
      label: "Đang chờ gửi",
      bgColor: "bg-amber-100",
      textColor: "text-amber-800",
      icon: Clock,
    },
    shipped: {
      label: "Đã gửi",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
      icon: Truck,
    },
    delivered: {
      label: "Đã nhận",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-800",
      icon: Package,
    },
    completed: {
      label: "Hoàn thành",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
      icon: Check,
    },
  };

  const { label, bgColor, textColor, icon: Icon } = statusConfig[status];

  return (
    <div
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        bgColor,
        textColor
      )}
    >
      <Icon className="w-4 h-4 mr-1" />
      {label}
    </div>
  );
};

export default OrderStatusBadge;
