
import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { formatCurrency } from "@/utils/format";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Image, Send, CheckCheck, Check } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  sender: "buyer" | "seller";
  text: string;
  timestamp: Date;
  isRead: boolean;
  hasImage?: boolean;
}

const ContactBuyer = () => {
  const { id } = useParams();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const { toast } = useToast();
  const order = orders.find(o => o.id === id);
  
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "buyer",
      text: "Xin chào, tôi đã nhận được đơn hàng. Cảm ơn bạn!",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: "2",
      sender: "seller",
      text: "Rất vui khi bạn thích sản phẩm. Nếu có vấn đề gì cứ liên hệ với tôi nhé!",
      timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
      isRead: true
    },
    {
      id: "3",
      sender: "buyer",
      text: "Sản phẩm rất tốt, đúng như mô tả. Tôi rất hài lòng.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      isRead: true
    }
  ]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
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
  
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "seller",
      text: message,
      timestamp: new Date(),
      isRead: false
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    toast({
      title: "Tin nhắn đã gửi",
      description: "Tin nhắn của bạn đã được gửi thành công.",
      duration: 2000,
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: "seller",
        text: "Đã gửi một hình ảnh",
        timestamp: new Date(),
        isRead: false,
        hasImage: true
      };
      
      setMessages([...messages, newMessage]);
      
      toast({
        title: "Hình ảnh đã gửi",
        description: "Hình ảnh của bạn đã được gửi thành công.",
        duration: 2000,
      });
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const messageDate = new Date(date);
    
    if (messageDate.getDate() === today.getDate() &&
        messageDate.getMonth() === today.getMonth() &&
        messageDate.getFullYear() === today.getFullYear()) {
      return messageDate.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    }
    
    return messageDate.toLocaleDateString("vi-VN", { 
      day: "numeric", 
      month: "numeric",
      hour: "2-digit", 
      minute: "2-digit" 
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b py-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(`/orders/${order.id}`)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={order.buyer.avatar} alt={order.buyer.name} />
                <AvatarFallback>{order.buyer.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-lg">{order.buyer.name}</h2>
                {order.buyer.rating && (
                  <div className="flex items-center text-amber-500">
                    <Star className="h-3 w-3 fill-current mr-1" />
                    <span className="text-sm">{order.buyer.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col md:flex-row max-w-6xl mx-auto w-full p-4">
        {/* Chat area - will take up more space on larger screens */}
        <div className="flex-1 flex flex-col mb-4 md:mb-0 md:mr-4">
          <Card className="flex-1 flex flex-col h-[calc(100vh-13rem)] md:h-[calc(100vh-11rem)]">
            <CardContent className="p-4 flex-1 flex flex-col">
              {/* Product summary */}
              <div className="mb-4 p-3 bg-gray-100 rounded-lg flex items-center">
                <img 
                  src={order.product.image} 
                  alt={order.product.title}
                  className="w-16 h-16 object-cover rounded-md mr-3"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{order.product.title}</h3>
                  <p className="font-bold text-sm">{formatCurrency(order.product.price)} ₫</p>
                </div>
                <Badge variant="outline" className="text-gray-500">
                  #{order.id}
                </Badge>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === "seller" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl p-3 ${
                      msg.sender === "seller" 
                        ? "bg-blue-500 text-white rounded-tr-none" 
                        : "bg-gray-200 text-gray-800 rounded-tl-none"
                    }`}>
                      {msg.hasImage && (
                        <div className="bg-gray-300 h-40 w-48 rounded-lg mb-2 flex items-center justify-center">
                          <Image className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                      <p>{msg.text}</p>
                      <div className={`text-xs mt-1 flex items-center ${
                        msg.sender === "seller" ? "justify-end" : ""
                      }`}>
                        <span className={msg.sender === "seller" ? "text-blue-100" : "text-gray-500"}>
                          {formatMessageTime(msg.timestamp)}
                        </span>
                        {msg.sender === "seller" && (
                          <span className="ml-1 flex items-center">
                            {msg.isRead ? <CheckCheck className="h-3 w-3 text-blue-100" /> : <Check className="h-3 w-3 text-blue-100" />}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message input */}
              <div className="flex items-end">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 min-h-10 resize-none mr-2"
                  rows={1}
                />
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={handleImageUpload}
                  >
                    <Image className="h-5 w-5" />
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={message.trim() === ""}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Buyer info on larger screens */}
        <div className="w-full md:w-80 lg:w-96">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Thông tin người mua</h3>
              <div className="flex items-center mb-4">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={order.buyer.avatar} alt={order.buyer.name} />
                  <AvatarFallback>{order.buyer.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{order.buyer.name}</h4>
                  {order.buyer.rating && (
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current mr-1" />
                      <span>{order.buyer.rating}</span>
                    </div>
                  )}
                  <p className="text-gray-500 text-sm">Trong hệ thống từ 2023</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại đơn hàng
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactBuyer;
