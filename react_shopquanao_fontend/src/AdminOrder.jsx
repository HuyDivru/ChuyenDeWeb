import { useEffect, useState } from "react";
import { httpGet } from "./httpConfig";
import { useUser } from "./UserContext";

function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        fetchCheckoutOrder();
    }, []);

    const fetchCheckoutOrder = async () => {
        try {
            // if (!user) {
            //     alert('Lỗi Kết Nối Api!');
            //     return;
            // }
            const response = await httpGet('checkOut');
            setOrders(response.data);
        } catch (error) {
            console.error("There was an error fetching the checkout order!", error);
        }
    };

    return (
        <table className="table table-bordered border-primary">
            <thead>
                <tr>
                    <th scope="col">Stt</th>
                    <th scope="col">UserId</th>
                    <th scope="col">ProductId</th>
                    <th scope="col">OrderId</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Ngày Đặt</th>
                    <th scope="col">Trạng Thái Thanh Toán</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                    <tr key={order.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{order.user_id}</td>
                        <td>{order.products.id}</td>
                        <td>{order.order_id}</td>
                        <td>{order.qty}</td>
                        <td>{order.price}</td>
                        <td>{new Date(order.products.added_on).toLocaleDateString()}</td>
                        <td>{order.payment_type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AdminOrder;
