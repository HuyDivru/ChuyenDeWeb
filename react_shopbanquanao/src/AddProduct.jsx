
import React, { useEffect, useState } from "react";
import './Admin.css';
import { httpPost_t } from './HttpConfig';
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    added_on: "",
    category_id: "",
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setProduct({ ...product, [e.target.name]: value });
  };

  const ProductRegsiter = (e) => {
    e.preventDefault();

    httpPost_t('saveProduct', product)
      .then((res) => {
        if (res.ok) {
          console.log('Thêm sản phẩm thành công');
          setMsg('Thêm sản phẩm thành công');
          setProduct({
            name: '',
            price: '',
            added_on: '',
            category_id: '',
          });
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-header fs-3 text-center">Thêm Sản Phẩm</div>
              {msg && <p className="fs-4 text-center text-success">{msg}</p>}

              <div className="card-body">
                <form onSubmit={(e) => ProductRegsiter(e)}>
                  <div className="mb-3 toilahung">
                    <label>Nhập tên sản phẩm :</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.name}
                    />
                  </div>

                  <div className="mb-3 toilahung">
                    <label>Nhập giá sản phẩm :</label>
                    <input
                      type="text"
                      name="price"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.price}
                    />
                  </div>
                  <div className="mb-3 toilahung">
                    <label>Nhập thông tin ngày nhập:</label>
                    <input
                      type="text"
                      name="added_on"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.added_on}
                    />
                  </div>

                  <div className="mb-3 toilahung">
                    <label>Nhập mã hàng sản phẩm :</label>
                    <input
                      type="text"
                      name="category_id"
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                      value={product.category_id}
                    />
                  </div>
                  <button className="btn btn-primary col-md-12 hungnguyen">Xong </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;