import { useState } from "react";
import axios from 'axios';
import { httpPost_t } from "./httpConfig";

function AddProduct() {

    const getCurrentDateTime =  () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    };
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image_url: '',
        added_on:getCurrentDateTime(),
        category_id: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setProduct((preventProduct) => ({
            ...preventProduct,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        httpPost_t('saveProduct', product)
            .then(response => {
                console.log('Thêm sản phẩm thành công', response.data);
                alert('Thêm sản phẩm thành công')
                setProduct({
                    name: '',
                    price: '',
                    image_url: '',
                    added_on: getCurrentDateTime(),
                    category_id: '',
                });
            })
            .catch(error => {
                console.error('Lỗi thêm sản phẩm', error);
            });

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Nhập tên sản phẩm"
                    value={product.name}
                    onChange={handleChange}
                />
                <label htmlFor="name">Tên sản phẩm</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="price"
                    placeholder="Giá sản phẩm"
                    value={product.price}
                    onChange={handleChange}
                />
                <label htmlFor="price">Giá sản phẩm</label>
            </div>
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="image_url"
                    placeholder="Đường dẫn ảnh"
                    value={product.image_url}
                    onChange={handleChange}
                />
                <label htmlFor="image_url">Nhập ảnh</label>
            </div>

            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="category_id"
                    placeholder="Mã loại sản phẩm"
                    value={product.category_id}
                    onChange={handleChange}
                />
                <label htmlFor="category_id">Nhập mã loại sản phẩm</label>
            </div>
            <button type="submit" className="btn btn-primary">Xong</button>
        </form>
    );
}

export default AddProduct;