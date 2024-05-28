import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { httpGet } from './httpConfig';

import './HomePage.css';


function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await httpGet('api/product/getAll'); // Sử dụng endpoint phù hợp để lấy danh sách sản phẩm
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list">
            <h2>Featured Products</h2>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-3 col-sm-4 col-xs-6 pro-loop" key={product.id}>
                        <div className="product-img">
                            <Link to={`/product/${product.id}`}>
                                <picture>
                                    <img src={product.image_url} alt={product.name} />
                                </picture>
                            </Link>
                        </div>
                        <div className="box-pro-detail">
                            <Link to={`/product/${product.id}`}>{product.name}</Link>
                        </div>
                        <div className="box-pro-detail">
                            <p className="pro-price">{product.price}đ</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
