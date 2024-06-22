import React, { useEffect, useState } from "react";
import { httpGet } from "./httpConfig";
import { useUser } from "./UserContext";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  
  const { user } = useUser();

  useEffect(() => {
    fetchCheckoutOrder();
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchCheckoutOrder = async () => {
    try {
      const response = await httpGet('checkOut');
      setOrders(response.data);
    } catch (error) {
      console.error("There was an error fetching the checkout order!", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await httpGet('listProduct');
      setProducts(response.data);
    } catch (error) {
      console.error("There was an error fetching the products!", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await httpGet('listUser');
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : "unknown user";
  };

  const getProductName = (productId) => {
    const product = products.find(product => product.id === productId);
    return product ? product.name : "unknown product";
  };

  const generateOrderHtml = (order) => {
    const userName = getUserName(order.user_id);
    const productName = getProductName(order.products.id);
    const styles = `
      <style>
        @media print {
          @page {
            margin: 0;
          }
          body {
            margin: 0.5cm;
          }
          .order-container {
            page-break-after: always;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .order-header {
            font-size: 24px;
            margin-bottom: 20px;
            text-align: center;
            color: #333;
          }
          .order-details p {
            margin: 10px 0;
            font-size: 18px;
            line-height: 1.5;
          }
          .order-details strong {
            display: inline-block;
            width: 150px;
            color: #555;
          }
        }
      </style>
    `;
    return `
      <div class="order-container">
        ${styles}
        <div class="order-header">Phiếu đơn hàng</div>
        <div class="order-details">
          <p><strong>Mã đơn hàng:</strong> ${order.order_id}</p>
          <p><strong>Tên người dùng:</strong> ${userName}</p>
          <p><strong>Tên sản phẩm:</strong> ${productName}</p>
          <p><strong>Số lượng:</strong> ${order.qty}</p>
          <p><strong>Giá:</strong> ${order.price}</p>
          <p><strong>Ngày đặt:</strong> ${new Date(order.products.added_on).toLocaleDateString()}</p>
          <p><strong>Trạng Thái Thanh Toán:</strong> ${order.payment_type}</p>
        </div>
      </div>
    `;
  };

  const handlePrintOrder = (order) => {
    const printWindow = window.open('', '', 'height=800,width=1000');
    printWindow.document.write('<html><head><title>In Đơn Hàng</title></head><body>');
    printWindow.document.write(generateOrderHtml(order));
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handlePrintAllOrders = () => {
    const allOrdersHtml = orders.map(order => generateOrderHtml(order)).join('');
    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>In Tất Cả Đơn Hàng</title></head><body>');
    printWindow.document.write(allOrdersHtml);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <button type="button" className="btn btn-danger" onClick={handlePrintAllOrders}>In Tất Cả</button>
      </div>
      <table className="table table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">Stt</th>
            <th scope="col">Tên Người Dùng</th>
            <th scope="col">Tên Sản Phẩm</th>
            <th scope="col">OrderId</th>
            <th scope="col">Qty</th>
            <th scope="col">Giá</th>
            <th scope="col">Ngày Đặt</th>
            <th scope="col">Trạng Thái Thanh Toán</th>
            <th scope="col">In Đơn</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <th scope="row">{index + 1}</th>
              <td>{getUserName(order.user_id)}</td>
              <td>{getProductName(order.products.id)}</td>
              <td>{order.order_id}</td>
              <td>{order.qty}</td>
              <td>{order.price}</td>
              <td>{new Date(order.products.added_on).toLocaleDateString()}</td>
              <td>{order.payment_type}</td>
              <td>
                <button type="button" class="btn btn-success" onClick={() => handlePrintOrder(order)}>In đơn</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminOrder;
