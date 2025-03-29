
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Order, OrderStatus } from "@/types/order";
import { orders } from "@/data/orders";

interface OrderContextType {
  orders: Order[];
  filteredOrders: Order[];
  filterByStatus: (status: OrderStatus | "all") => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [allOrders] = useState<Order[]>(orders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);

  const filterByStatus = (status: OrderStatus | "all") => {
    if (status === "all") {
      setFilteredOrders(allOrders);
    } else {
      setFilteredOrders(allOrders.filter((order) => order.status === status));
    }
  };

  return (
    <OrderContext.Provider value={{ orders: allOrders, filteredOrders, filterByStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
