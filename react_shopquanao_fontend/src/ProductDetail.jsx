import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { httpGet } from './httpConfig';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await httpGet(`api/product/getProductDetails/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error("There was an error fetching the product details!", error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="row product-detail-main pr_style-01">
                <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="product-image">
                        <div className="product-image-large">
                            <img src={product.image_url} alt={product.name} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="product-detail-content">
                        <h1 className="product-title">{product.name}</h1>
                        <div className="product-price">
                            <span className="price">{product.price}đ</span>
                        </div>
                        <div className="product-description">
                            <p>{product.description}</p>
                        </div>
                        <div className="product-quantity">
                            <div className="quantity">
                                <button className="btn btn-decrease">-</button>
                                <input type="text" className="input-quantity" defaultValue="1" />
                                <button className="btn btn-increase">+</button>
                            </div>
                            <button className="btn btn-add-to-cart">Thêm vào giỏ hàng</button>
                        </div>
                        <div className="description-productDetail">
                            <h3>Thông tin sản phẩm</h3>
                            <p>{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    );
}

export default ProductDetail;
