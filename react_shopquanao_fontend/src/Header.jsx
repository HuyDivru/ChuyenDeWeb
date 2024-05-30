import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

import './HomePage.css';
import { httpPost_t, httpPostwithToken } from './httpConfig';

function Header() {
    const navigate = useNavigate();
    const { user, logout,token } = useUser();
    const [cart, setCart] = useState([]);


    useEffect(() => {
        if (user && token) {
            fetchCartDetails();
        }
    }, [user, token]);

    const fetchCartDetails = async () => {
        try {
            const response = await httpPostwithToken(`addtocart/getCartsByUserId`, { userId: user.id }, token);
            setCart(response.data);
        } catch (error) {
            console.error("There was an error fetching the cart details!", error);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/'); // Redirect to home page after logout
    };

    const handleCartItem = () => {
        if (!user) {
            alert("Lỗi Kết Nối Api! Vui lòng đăng nhập!");
            navigate('/login');
            return;
        }
        navigate("/cartItem");
    }

    const handleAdmin = () => {
        navigate('/admin'); // Redirect to home page after logout
    };

    const handleHome = () => {
        navigate('/'); // Redirect to home page after logout
    };
    const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

    return (
        <header className="p-3 bg-primary text-white">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src="/logo192.png" alt="logo" width="40" height="32" />
                    <span className="ms-2">TravisHuy</span>
                </a>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        <li><a href="/" className="nav-link px-2 text-white">Trang Chủ</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">Quần</a></li>
                        <li><a href="#"  className="nav-link px-2 text-white">Áo</a></li>
                        <li><a href="/admin"  className="nav-link px-2 text-white">Truy Cập Admin</a></li>
                        <li>
                            <div className="header-icon-cart position-relative">
                                <div className="header-icon-cart__header cursor-pointer">
                                    <i className="fas fa-shopping-cart" onClick={handleCartItem}></i>
                                    <span className="count-holder">
                                        <span className="count">{cartItemCount}</span>
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search" />
                    </form>

                    <div className="text-end">
                        {user ? (
                            <div className="dropdown">
                                <button className="btn btn-outline-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-user"></i> {user.name}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button className="dropdown-item" onClick={handleLogoutClick}>Logout</button></li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <button type="button" className="btn btn-outline-light me-2" onClick={handleLoginClick}>Login</button>
                                <button type="button" className="btn btn-warning" onClick={handleRegisterClick}>Sign-up</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
