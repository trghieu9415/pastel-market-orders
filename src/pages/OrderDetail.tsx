import React from "react";
import { useParams, Link } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { formatCurrency } from "@/utils/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  Star, 
  ShieldCheck, 
  ArrowLeft,
  Package,
  Truck,
  Check,
  Clock,
  ExternalLink,
  Info
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { OrderStatus } from "@/types/order";

const OrderDetail = () => {
  const { id } = useParams();
  const { orders } = useOrders();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xl font-medium mb-2">Không tìm thấy đơn hàng</p>
              <p className="text-gray-500 mb-6">Đơn hàng không tồn tại hoặc đã bị xóa</p>
              <Link to="/">
                <Button variant="default">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại danh sách đơn hàng
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Order progress based on status
  const getStatusProgress = (status: OrderStatus) => {
    switch (status) {
      case "pending": return 25;
      case "shipped": return 50;
      case "delivered": return 75;
      case "completed": return 100;
      default: return 0;
    }
  };

  const statusProgress = getStatusProgress(order.status);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700 flex items-center transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Quay lại danh sách</span>
          </Link>
        </div>
        
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Chi tiết đơn hàng #{order.id}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Details */}
          <Card className="col-span-1 lg:col-span-2 overflow-hidden">
            <div className="relative aspect-video md:aspect-auto md:h-72">
              <img 
                src={order.product.image} 
                alt={order.product.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{order.product.title}</CardTitle>
                <h3 className="text-xl font-bold">{formatCurrency(order.product.price)} ₫</h3>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Mô tả sản phẩm đẹp, chất lượng còn tốt. Được sử dụng cẩn thận và bảo quản tốt.
                Không có vết xước hoặc hư hỏng đáng kể. Phù hợp cho người đang tìm kiếm sản phẩm chất lượng với giá hợp lý.
              </p>
              
              <div className="border rounded-md p-4 bg-gray-50 mb-4">
                <h3 className="font-medium mb-3">Trạng thái đơn hàng</h3>
                <div className="mb-4 flex justify-between items-center text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-1" />
                    <span>Chờ gửi</span>
                  </div>
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-gray-400 mr-1" />
                    <span>Đã gửi</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-4 w-4 text-gray-400 mr-1" />
                    <span>Đã nhận</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-gray-400 mr-1" />
                    <span>Hoàn thành</span>
                  </div>
                </div>
                <Progress value={statusProgress} className="h-2" />
                <div className="mt-3 flex justify-end">
                  <OrderStatusBadge status={order.status} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Thông tin vận chuyển</h3>
                  <p className="text-sm mb-2">
                    <span className="text-gray-500">Địa chỉ:</span> {order.shipping.address}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="text-gray-500">Đơn vị vận chuyển:</span> {order.shipping.carrier}
                  </p>
                  {order.shipping.trackingCode && (
                    <p className="text-sm flex items-center">
                      <span className="text-gray-500 mr-1">Mã vận đơn:</span> 
                      <span className="font-mono">{order.shipping.trackingCode}</span>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                            <Info className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Theo dõi đơn hàng</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="mb-4">Sử dụng mã vận đơn sau để theo dõi gói hàng của bạn:</p>
                            <div className="bg-gray-100 p-3 rounded-md font-mono text-center">
                              {order.shipping.trackingCode}
                            </div>
                            <div className="mt-4">
                              <Button className="w-full" variant="outline">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                Theo dõi gói hàng
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </p>
                  )}
                </div>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Thông tin giao dịch</h3>
                  <p className="text-sm mb-2">
                    <span className="text-gray-500">Ngày bán:</span> {new Date(order.transaction.date).toLocaleDateString("vi-VN")}
                  </p>
                  <p className="text-sm mb-2">
                    <span className="text-gray-500">Thanh toán:</span> {order.transaction.paymentMethod}
                  </p>
                  <div className="mt-3 pt-3 border-t">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Giá bán:</span>
                      <span>{formatCurrency(order.product.price)} ₫</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-1">
                      <span>Phí nền tảng:</span>
                      <span>-{formatCurrency(order.transaction.platformFee)} ₫</span>
                    </div>
                    <div className="flex justify-between font-medium mt-1 pt-1 border-t">
                      <span>Bạn nhận được:</span>
                      <span className="text-green-600">{formatCurrency(order.transaction.amountReceived)} ₫</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Buyer Info and Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Thông tin người mua</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={order.buyer.avatar} alt={order.buyer.name} />
                    <AvatarFallback>{order.buyer.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{order.buyer.name}</h3>
                    {order.buyer.rating && (
                      <div className="flex items-center text-amber-500">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        <span>{order.buyer.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <Link to={`/orders/${order.id}/contact`}>
                    <Button className="w-full" variant="default">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Liên hệ người mua
                    </Button>
                  </Link>
                  <Button className="w-full" variant="outline">
                    <Star className="mr-2 h-4 w-4" />
                    Đánh giá người mua
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hỗ trợ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full" variant="secondary">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Yêu cầu hỗ trợ
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Đội ngũ hỗ trợ của chúng tôi sẵn sàng giúp đỡ bạn giải quyết bất kỳ vấn đề nào.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
