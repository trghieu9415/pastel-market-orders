
import Orders from "@/components/orders/Orders";
import { OrderProvider } from "@/context/OrderContext";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <OrderProvider>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-900 mb-8">Đơn hàng đã bán</h1>
          <Orders />
        </div>
      </OrderProvider>
    </div>
  );
};

export default Index;
