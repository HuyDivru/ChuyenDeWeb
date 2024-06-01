import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminOrder from './AdminOrder';
import AdminUser from './AdminUser';
import AdminProduct from './AdminProduct';
import AddProduct from './AddProduct';

function AdminHome() {
    const [activeTab, setActiveTab] = useState('order');

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 bg-light sidebar">
                    <h4 className="my-4">Trang Admin</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'order' ? 'active' : ''}`} onClick={() => setActiveTab('order')} href="#order">Quản Lý Đơn Hàng</a>
                        </li>
                        <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')} href="#user">Người dùng</a>
                        </li>
                        <li className="nav-item">
                        <a className={`nav-link ${activeTab === 'product' ? 'active' : ''}`} onClick={() => setActiveTab('product')} href="#product">Sản Phẩm</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Cài đặt</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Hồ Sơ</a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-10 content">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a className="navbar-brand" href="#">Hồ Nhật Huy</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Trang chủ</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Đặc trưng</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Định giá</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="tab-container mt-4">
                        <ul className="nav nav-tabs flex-column flex-sm-row">
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'order' ? 'active' : ''}`} onClick={() => setActiveTab('order')} href="#order">Quản Lý Đơn Hàng</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')} href="#user">Quản Lý User</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'product' ? 'active' : ''}`} onClick={() => setActiveTab('product')} href="#product">Quản Lý Sản Phẩm</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'addproduct' ? 'active' : ''}`} onClick={() => setActiveTab('addproduct')} href="#addproduct">Thêm Sản Phẩm</a>
                            </li>
                        </ul>
                        <div className="tab-content mt-3">
                            {activeTab === 'order' && <div id="order" className="container tab-pane active"><br /><AdminOrder/></div>}
                            {activeTab === 'user' && <div id="user" className="container tab-pane active"><br /><AdminUser/></div>}
                            {activeTab === 'product' && <div id="product" className="container tab-pane active"><br /><AdminProduct/></div>}
                            {activeTab === 'addproduct' && <div id="addproduct" className="container tab-pane active"><br /><AddProduct/></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;