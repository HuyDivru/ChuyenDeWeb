import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import { httpGet, httpDelete } from './HttpConfig';
import './Admin.css';
const AdminProduct = () => {
  const [productList, setProductList] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    httpGet("listProduct", {})
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = (id) => {
    httpDelete(`/products/${id}`, {})
      .then((data) => {
        setMsg("Đã Xóa Thành Công");
        init();
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
          <a href="/saveProduct">THÊM SẢN PHẨM </a>
        </div>
      </div>

      <div className="toi">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header fs-3 text-center">
                DANH SÁCH CÁC ĐƠN HÀNG CỦA CÔNG TY VIỆT TIẾN
                {msg && <p className="fs-4 text-center text-success">{msg}</p>}
              </div>

              <div className="card-body  tothien">
                <table className="table bang">
                  <thead>
                    <tr>
                      <th scope="col">Thứ tự </th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col"> Giá </th>
                      <th scope="col">Thời gian nhập hàng </th>
                      <th scope="col">Số lượng </th>
                      <th scope="col">Tùy chỉnh </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(productList) && productList.map((p, num) => (
                      <tr key={p.id}>
                        <td>{num + 1}</td>
                        <td>{p.name}</td>
                        <td>{p.price}</td>
                        <td>{p.added_on}</td>
                        <td>{p.category_id}</td>
                        <td>
                          <Link className="btn nut1 btn-sm btn-primary">
                            Chỉnh sửa
                          </Link>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="btn btn-sm btn-danger ms-1"
                          >
                            Xóa
                          </button>
                        </td>
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

export default AdminProduct;