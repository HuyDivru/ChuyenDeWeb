import React, { useEffect, useState } from 'react';
import './CartItem.css'; 
import { useUser } from './UserContext';
import { httpPostwithToken } from './httpConfig';

function CartItem() {

    const {user,token} = useUser();
    const [cart,setCart]  = useState([]);

    useEffect(() => {   
        if(user && token){
            fetchCartDetails();
        }
    },[user,token]); 
    
    
    const fetchCartDetails = async () => {
        try {
            const response = await httpPostwithToken('addtocart/getCartsByUserId', { userId: user.id }, token);
            setCart(response.data);
        } catch (error) {
            console.error("There was an error fetching the cart details!", error);
        }
    };

    return (
        <div className="container mt-5 p-3 rounded cart">
            <div className="row no-gutters">
                <div className="col-md-8">
                    <div className="product-details mr-2">
                        <div className="d-flex flex-row align-items-center">
                            <i className="fa fa-long-arrow-left"></i>
                            <span className="ml-2">Tiếp Tục Mua Hàng</span>
                        </div>
                        <hr />
                        <h6 className="mb-0">Shopping cart</h6>
                        <div className="d-flex justify-content-between">
                            <span>Bạn có {cart.length} sản phẩm trong giỏ hàng</span>
                            <div className="d-flex flex-row align-items-center">
                                <span className="text-black-50">Sort by:</span>
                                <div className="price ml-2">
                                    <span className="mr-1">price</span>
                                    <i className="fa fa-angle-down"></i>
                                </div>
                            </div>
                        </div>
                        {cart.map((item,index) =>( 
                        <div key={index} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                            <div className="d-flex flex-row">
                                <img className="rounded" src="{item.product?.image_url}" width="40" alt="Product" />
                                <div className="ml-2">
                                    <span className="font-weight-bold d-block">{item.product?.name}</span>
                                    <span className="spec">Giá: ${item.product?.price}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                                <span className="d-block">{item.qty}</span>
                                <span className="d-block ml-5 font-weight-bold">${item.product?.price * item.qty}</span>
                                <i className="fa fa-trash-o ml-3 text-black-50"></i>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="payment-info">
                        <div className="d-flex justify-content-between align-items-center">
                            <span>Card details</span>
                            <img className="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30" alt="Card" />
                        </div>
                        <span className="type d-block mt-3 mb-1">Card type</span>
                        <label className="radio">
                            <input type="radio" name="card" value="payment" defaultChecked />
                            <span>
                                <img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" />
                            </span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="card" value="payment" />
                            <span>
                                <img width="30" src="https://img.icons8.com/officel/48/000000/visa.png" alt="Visa" />
                            </span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="card" value="payment" />
                            <span>
                                <img width="30" src="https://img.icons8.com/ultraviolet/48/000000/amex.png" alt="Amex" />
                            </span>
                        </label>
                        <label className="radio">
                            <input type="radio" name="card" value="payment" />
                            <span>
                                <img width="30" src="https://img.icons8.com/officel/48/000000/paypal.png" alt="Paypal" />
                            </span>
                        </label>
                        <div>
                            <label className="credit-card-label">Name on card</label>
                            <input type="text" className="form-control credit-inputs" placeholder="Name" />
                        </div>
                        <div>
                            <label className="credit-card-label">Card number</label>
                            <input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="credit-card-label">Date</label>
                                <input type="text" className="form-control credit-inputs" placeholder="12/24" />
                            </div>
                            <div className="col-md-6">
                                <label className="credit-card-label">CVV</label>
                                <input type="text" className="form-control credit-inputs" placeholder="342" />
                            </div>
                        </div>
                        <hr className="line" />
                        <div className="d-flex justify-content-between information">
                            <span>Subtotal</span>
                            <span>$3000.00</span>
                        </div>
                        <div className="d-flex justify-content-between information">
                            <span>Shipping</span>
                            <span>$20.00</span>
                        </div>
                        <div className="d-flex justify-content-between information">
                            <span>Total(Incl. taxes)</span>
                            <span>$3020.00</span>
                        </div>
                        <button className="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button">
                            <span>$3020.00</span>
                            <span>Checkout<i className="fa fa-long-arrow-right ml-1"></i></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
