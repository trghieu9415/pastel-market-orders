
import React from "react";
import { useOrders } from "@/context/OrderContext";
import OrderCard from "./OrderCard";
import OrderFilter from "./OrderFilter";

const Orders = () => {
  const { filteredOrders } = useOrders();

  return (
    <div>
      <OrderFilter />
      
      {filteredOrders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Không có đơn hàng nào.</p>
        </div>
      ) : (
        <div>
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
