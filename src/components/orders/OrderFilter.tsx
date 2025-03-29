
import React from "react";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/context/OrderContext";
import { OrderStatus } from "@/types/order";
import { Package, Check, Truck, Clock, Layers } from "lucide-react";

const OrderFilter = () => {
  const { filterByStatus } = useOrders();
  const [activeFilter, setActiveFilter] = React.useState<OrderStatus | "all">("all");

  const handleFilter = (status: OrderStatus | "all") => {
    setActiveFilter(status);
    filterByStatus(status);
  };

  const filters = [
    { id: "all", label: "Tất cả", icon: Layers },
    { id: "pending", label: "Đang chờ gửi", icon: Clock },
    { id: "shipped", label: "Đã gửi", icon: Truck },
    { id: "delivered", label: "Đã nhận", icon: Package },
    { id: "completed", label: "Hoàn thành", icon: Check },
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter) => {
        const Icon = filter.icon;
        return (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilter(filter.id as OrderStatus | "all")}
            className="flex items-center"
          >
            <Icon className="h-4 w-4 mr-2" />
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
};

export default OrderFilter;
