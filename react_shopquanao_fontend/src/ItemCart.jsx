import React, { useEffect, useState } from 'react';

import './ItemCart.css';
import { useUser } from './UserContext';
import { httpPostwithToken } from './httpConfig';

function ItemCart() {

    const { user, token } = useUser();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (user && token) {
            fetchCartDetails();
        }
    }, [user, token]);

    const fetchCartDetails = async () => {
        try {
            const response = await httpPostwithToken('addtocart/getCartsByUserId', { userId: user.id });
            setCart(response.data);
        } catch (error) {
            console.error("There was an error fetching the cart details!", error);
        }
    };

    return (
        <section className="h-100 h-custom" style={{ backgroundColor: '#d2c9ff' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: '15px' }}>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Giỏ Hàng</h1>
                                                <h6 className="mb-0 text-muted">{cart.length} sản phẩm</h6>
                                            </div>
                                            <hr className="my-4" />
                                            {cart.map((item, index) => (
                                                <div key={index} className="row mb-4 d-flex justify-content-between align-items-center">
                                                    <div className="col-md-2 col-lg-2 col-xl-2">
                                                        <img
                                                            src={item.product.image_url}
                                                            className="img-fluid rounded-3" alt="Cotton T-shirt" />
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-3">
                                                        <h6 className="text-muted"></h6>
                                                        <h6 className="text-black mb-0">{item.product.name}</h6>
                                                    </div>
                                                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                                                        <h6 className="text-black mb-0">{item.qty}</h6>
                                                    </div>
                                                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                                                        <h6 className="mb-0">$ {item.product.price}</h6>
                                                    </div>
                                                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                                                        <a href="#!" className="text-muted"><i className="fas fa-times"></i></a>
                                                    </div>
                                                </div>
                                            ))}
                                            <hr className="my-4" />



                                            <div className="pt-5">
                                                <h6 className="mb-0">
                                                    <a href="#!" className="text-body"><i
                                                        className="fas fa-long-arrow-alt-left me-2"></i>Tiếp Tục Mua Hàng</a>
                                                </h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                                            <hr className="my-4" />

                                            <div className="d-flex justify-content-between mb-4">
                                                <h5 className="text-uppercase">items 3</h5>
                                                <h5>€ 132.00</h5>
                                            </div>

                                            <h5 className="text-uppercase mb-3">Shipping</h5>

                                            <div className="mb-4 pb-2">
                                                <select data-mdb-select-init>
                                                    <option value="1">Standard-Delivery- €5.00</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                    <option value="4">Four</option>
                                                </select>
                                            </div>

                                            <h5 className="text-uppercase mb-3">Give code</h5>

                                            <div className="mb-5">
                                                <div data-mdb-input-init className="form-outline">
                                                    <input type="text" id="form3Examplea2" className="form-control form-control-lg" />
                                                    <label className="form-label" htmlFor="form3Examplea2">Enter your code</label>
                                                </div>
                                            </div>

                                            <hr className="my-4" />

                                            <div className="d-flex justify-content-between mb-5">
                                                <h5 className="text-uppercase">Total price</h5>
                                                <h5>€ 137.00</h5>
                                            </div>

                                            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-block btn-lg"
                                                data-mdb-ripple-color="dark">Register</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ItemCart;
