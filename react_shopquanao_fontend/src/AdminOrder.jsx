import { useEffect, useState } from "react";
import { httpGet } from "./httpConfig";
import { useUser } from "./UserContext";

function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [users, setUsers]= useState([]);
    const [products, setProducts] =useState([]);
    const { user } = useUser();

    useEffect(() => {
        fetchCheckoutOrder();
        fetchUsers();
        fetchProducts();
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


    const fetchProducts = async () => {
        try{
            const response= await httpGet('listProduct');
            setProducts(response.data);
        }
        catch(error){
            console.error("there was an error fetching the products!", error);
        }
    };

    const fetchUsers = async () => {
        try{
            const response= await httpGet('listUser');
            setUsers(response.data);
        }
        catch(error){
            console.error("there was an error fetching the users!", error);
        }
    };

    const getUserName =(userId) => {
        const user= users.find(user => user.id === userId);
        return user ? user.name :"unknown user  ";
    };

    const getProductName = (productId) =>{
        const product = products.find(product =>product.id === productId);
        return product ? product.name :"unknow product";
    }
    return (
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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default AdminOrder;
