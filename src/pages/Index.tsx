
import Orders from "@/components/orders/Orders";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Đơn hàng đã bán</h1>
        <Orders />
      </div>
    </div>
  );
};

export default Index;
