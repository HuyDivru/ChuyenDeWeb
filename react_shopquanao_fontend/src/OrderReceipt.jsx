import React from "react";
// import "./OrderReceipt.css";

const OrderReceipt =React.forwardRef(({order,userName,productName},ref) =>{
    <div ref={ref}>
        <h2>Phiếu đơn hàng</h2>
        <p><strong>Mã đơn hàng:</strong>{order.order_id}</p>
        <p><strong>Tên người dùng:</strong>{userName}</p>
        <p><strong>Tên sản phẩm:</strong>{productName}</p>
        <p><strong>Số lượng:</strong>{order.qty}</p>
        <p><strong>Giá:</strong>{order.price}</p>
        <p><strong>Ngày đặt:</strong>{new Date(order.products.added_on).toLocaleDateString()}</p>
        <p><strong>Trạng Thái Thanh Toán:</strong> {order.payment_type}</p>
    </div>
});
export default OrderReceipt;