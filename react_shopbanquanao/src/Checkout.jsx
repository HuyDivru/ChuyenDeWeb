import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { httpGet } from './HttpConfig';

import './Admin.css';
const Checkout = () => {
  const [checkoutList, setCheckoutList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    httpGet("checkout", {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCheckoutList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>


      <div class="tieude">

        <h1 className="hg">QUẢN TRỊ SHOP VIỆT TIẾN</h1>
        <h5 className="huy"> Chào ADMIN :Tô Thiên Hưng</h5>
        <div class="adminna">
          <a class="active" href="/">TRANG CHỦ</a>
          <a href="/listProduct">QUẢN LÝ SẢN PHẨM </a>
          <a href="/checkout">QUẢN LÝ ĐƠN HÀNG </a>
        </div>
      </div>

      <div className="toi">
        <div className="cot">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">
                DANH SÁCH CÁC ĐƠN HÀNG CỦA CÔNG TY VIỆT TIẾN
                {msg && <p className="fs-4 text-center text-success">{msg}</p>}
              </div>

              <div className="   tothien">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">Thứ tự </th>
                      <th scope="col">Mã số đặt hàng</th>
                      <th scope="col"> Hình thức Đặt </th>
                      <th scope="col">Trạng thái đặt hàng </th>

                      <th scope="col">Người dùng</th>

                      <th scope="col">Mã sản phẩm</th>
                      <th scope="col">Giá tiền </th>
                      <th scope="col">Ngày đặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(checkoutList) && checkoutList.map((p, num) => (
                      <tr key={num}>
                        <td>{num + 1}</td>
                        <td>{p.order_id}</td>
                        <td>{p.payment_type}</td>
                        <td>{p.delivery_address}</td>
                        <td>{p.user_id}</td>

                        <td>{p.qty}</td>
                        <td>{p.price}</td>
                        <td>{p.order_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;