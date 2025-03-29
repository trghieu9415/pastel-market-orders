
import React from "react";
import { Order } from "@/types/order";
import OrderStatusBadge from "./OrderStatusBadge";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star, ExternalLink, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <Card className="mb-6 overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Product Info */}
          <div className="relative h-64 md:h-full">
            <img
              src={order.product.image}
              alt={order.product.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-white font-semibold">{order.product.title}</p>
              <p className="text-white text-xl font-bold">
                {formatCurrency(order.product.price)} ₫
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-4 md:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={order.buyer.avatar}
                  alt={order.buyer.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{order.buyer.name}</h3>
                  {order.buyer.rating && (
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">{order.buyer.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Shipping Info */}
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium text-sm text-gray-600 mb-2">Thông tin vận chuyển</h4>
                <p className="text-sm mb-1">{order.shipping.address}</p>
                <p className="text-sm mb-1">Đơn vị vận chuyển: {order.shipping.carrier}</p>
                {order.shipping.trackingCode && (
                  <p className="text-sm">
                    Mã vận đơn: <span className="font-mono">{order.shipping.trackingCode}</span>
                  </p>
                )}
              </div>

              {/* Transaction Info */}
              <div className="bg-gray-50 p-3 rounded-md">
                <h4 className="font-medium text-sm text-gray-600 mb-2">Lịch sử giao dịch</h4>
                <div className="flex items-center text-sm mb-1">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span>Ngày bán: {new Date(order.transaction.date).toLocaleDateString("vi-VN")}</span>
                </div>
                <p className="text-sm mb-1">Thanh toán: {order.transaction.paymentMethod}</p>
                <div className="flex justify-between text-sm">
                  <span>Nhận được:</span>
                  <span className="font-semibold text-green-600">{formatCurrency(order.transaction.amountReceived)} ₫</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Phí nền tảng:</span>
                  <span>-{formatCurrency(order.transaction.platformFee)} ₫</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap justify-between gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <ExternalLink className="h-4 w-4 mr-2" />
                Xem chi tiết
              </Button>
              <Button variant="secondary" size="sm" className="flex-1">
                <MessageSquare className="h-4 w-4 mr-2" />
                Liên hệ người mua
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
