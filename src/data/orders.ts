
import { Order } from "@/types/order";

export const orders: Order[] = [
  {
    id: "ord-001",
    product: {
      id: "prod-001",
      title: "Áo khoác denim vintage",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      price: 450000,
    },
    buyer: {
      id: "user-001",
      name: "Nguyễn Minh Anh",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 4.8,
    },
    status: "shipped",
    shipping: {
      address: "23 Nguyễn Thị Minh Khai, Quận 1, TP.HCM",
      trackingCode: "VN028371649VN",
      carrier: "VNPost",
    },
    transaction: {
      date: "2023-09-15",
      paymentMethod: "MoMo",
      amountReceived: 405000,
      platformFee: 45000,
    },
    createdAt: "2023-09-15T08:30:00Z",
  },
  {
    id: "ord-002",
    product: {
      id: "prod-002",
      title: "Túi xách handmade",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      price: 380000,
    },
    buyer: {
      id: "user-002",
      name: "Trần Văn Bình",
      avatar: "https://i.pravatar.cc/150?img=2",
      rating: 4.5,
    },
    status: "pending",
    shipping: {
      address: "45 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM",
      carrier: "Giao hàng nhanh",
    },
    transaction: {
      date: "2023-09-18",
      paymentMethod: "COD",
      amountReceived: 342000,
      platformFee: 38000,
    },
    createdAt: "2023-09-18T14:15:00Z",
  },
  {
    id: "ord-003",
    product: {
      id: "prod-003",
      title: "Giày sneaker Nike Air cũ",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      price: 850000,
    },
    buyer: {
      id: "user-003",
      name: "Lê Thị Hương",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 5,
    },
    status: "delivered",
    shipping: {
      address: "78 Nguyễn Huệ, Quận Hải Châu, Đà Nẵng",
      trackingCode: "SPX238754612",
      carrier: "Shopee Express",
    },
    transaction: {
      date: "2023-09-10",
      paymentMethod: "Chuyển khoản ngân hàng",
      amountReceived: 765000,
      platformFee: 85000,
    },
    createdAt: "2023-09-10T11:20:00Z",
  },
  {
    id: "ord-004",
    product: {
      id: "prod-004",
      title: "Đồng hồ Casio vintage",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      price: 560000,
    },
    buyer: {
      id: "user-004",
      name: "Phạm Đức Hùng",
      avatar: "https://i.pravatar.cc/150?img=4",
      rating: 4.2,
    },
    status: "completed",
    shipping: {
      address: "124 Trần Hưng Đạo, Thành phố Hạ Long, Quảng Ninh",
      trackingCode: "VTP789456123",
      carrier: "Viettel Post",
    },
    transaction: {
      date: "2023-08-28",
      paymentMethod: "ZaloPay",
      amountReceived: 504000,
      platformFee: 56000,
    },
    createdAt: "2023-08-28T09:45:00Z",
  },
  {
    id: "ord-005",
    product: {
      id: "prod-005",
      title: "Váy vintage hoa nhí",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      price: 320000,
    },
    buyer: {
      id: "user-005",
      name: "Đỗ Mai Linh",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 4.7,
    },
    status: "shipped",
    shipping: {
      address: "56 Hàm Nghi, Quận Thanh Khê, Đà Nẵng",
      trackingCode: "JT891237654",
      carrier: "J&T Express",
    },
    transaction: {
      date: "2023-09-14",
      paymentMethod: "PayPal",
      amountReceived: 288000,
      platformFee: 32000,
    },
    createdAt: "2023-09-14T16:30:00Z",
  }
];
