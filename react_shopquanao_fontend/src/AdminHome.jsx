import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminOrder from './AdminOrder';
import AdminUser from './AdminUser';
import AdminProduct from './AdminProduct';

function AdminHome() {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 bg-light sidebar">
                    <h4 className="my-4">Trang Admin</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => setActiveTab('tab1')} href="#tab1">Quản Lý Đơn Hàng</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => setActiveTab('tab2')} href="#tab2">Người dùng</a>
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
                                <a className={`nav-link ${activeTab === 'tab1' ? 'active' : ''}`} onClick={() => setActiveTab('tab1')} href="#tab1">Quản Lý Đơn Hàng</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`} onClick={() => setActiveTab('tab2')} href="#tab2">Quản Lý User</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`} onClick={() => setActiveTab('tab3')} href="#tab3">Quản Lý Sản Phẩm</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeTab === 'tab4' ? 'active' : ''}`} onClick={() => setActiveTab('tab4')} href="#tab4">Thêm Sản Phẩm</a>
                            </li>
                        </ul>
                        <div className="tab-content mt-3">
                            {activeTab === 'tab1' && <div id="tab1" className="container tab-pane active"><br /><AdminOrder/></div>}
                            {activeTab === 'tab2' && <div id="tab2" className="container tab-pane active"><br /><AdminUser/></div>}
                            {activeTab === 'tab3' && <div id="tab3" className="container tab-pane active"><br /><AdminProduct/></div>}
                            {activeTab === 'tab4' && <div id="tab4" className="container tab-pane active"><br /><AdminProduct/></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;