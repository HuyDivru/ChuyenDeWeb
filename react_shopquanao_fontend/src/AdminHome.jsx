
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function AdminHome() {

    return (
    <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 bg-light sidebar">
                    <h4 className="my-4">Trang Admin</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Quản Lý Đơn Hàng</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Người dùng</a>
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
                                    <a className="nav-link" href="#">Trang chủ</a>
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
                                <a className="nav-link active" data-toggle="tab" href="#tab1">Quản Lý Đơn Hàng</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tab2">Quản Lý User</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="#tab3">Quản Lý Sản Phẩm</a>
                            </li>
                        </ul>
                        <div className="tab-content mt-3">
                            <div id="tab1" className="container tab-pane active"><br />
                                <h3>Quản Lý Đơn Hàng</h3>
                                <p>Content for Tab 1.</p>
                            </div>
                            <div id="tab2" className="container tab-pane fade"><br />
                                <h3>Tab 2</h3>
                                <p>Content for Tab 2.</p>
                            </div>
                            <div id="tab3" className="container tab-pane fade"><br />
                                <h3>Tab 3</h3>
                                <p>Content for Tab 3.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminHome;