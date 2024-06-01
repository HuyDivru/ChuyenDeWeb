import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { httpGet, httpPostwithToken } from './httpConfig';
import Header from './Header';
import Footer from './Footer';

import './ProductDetail.css';
import { useUser } from './UserContext';

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const { user, token } = useUser();
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await httpGet(`api/product/getProductDetails/${productId}`);
                setProduct(response.data);
                setTotalPrice(response.data.price); // Initialize total price
            } catch (error) {
                console.error("There was an error fetching the product details!", error);
            }
        };

        fetchProductDetails();
    }, [productId]);

    useEffect(() => {
        if (product) {
            setTotalPrice(product.price * quantity); // Update total price whenever quantity changes
        }
    }, [quantity, product]);

    const handleQuantityChange = (change) => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + change;
            return newQuantity > 0 ? newQuantity : 1;
        });
    };
    const getCurrentDateTime =  () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    };
    const handleAddToCart = async () => {
        if (!user) {
            alert("Lỗi Kết Nối Api! Vui lòng đăng nhập!");
            navigate('/login');
            return;
        }

        if (!product) return;

        try {
            const updateCartRequest = {
                productId: product.id,
                cartId: product.cartId || 0, // Assuming cartId is fetched from product or set to 0 if not available
                userId: user.id, // Ensure userId is correctly set here
                qty: quantity,
                price: totalPrice,
                added_date:getCurrentDateTime(),
            };

            const response = await httpPostwithToken('addtocart/addOrUpdateProduct', updateCartRequest, token);
            alert('Thêm Sản Phẩm Vào Giỏ Hàng Thành Công.');
        } catch (error) {
            console.error("Đã xảy ra lỗi khi cập nhật số lượng giỏ hàng!", error);
            alert("Failed to add product to cart.");
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
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
                                <span className="price">{totalPrice}$</span>
                            </div>
                            <div className="product-description">
                                <p>{product.description}</p>
                            </div>
                            <div className="product-quantity">
                                <div className="quantity">
                                    <button className="btn btn-decrease" onClick={() => handleQuantityChange(-1)}>-</button>
                                    <input type="text" className="input-quantity" value={quantity} readOnly />
                                    <button className="btn btn-increase" onClick={() => handleQuantityChange(1)}>+</button>
                                </div>
                                <button className="btn btn-add-to-cart" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                            </div>
                            <div className="description-productDetail">
                                <h3>Thông tin sản phẩm</h3>
                                <p>TravisHuy tự hào giới thiệu bộ sưu tập quần áo thời trang dành cho cả nam và nữ, được thiết kế tinh tế và sản xuất với chất lượng cao. Sản phẩm của chúng tôi mang đến sự thoải mái, phong cách và sự tự tin cho người mặc trong mọi hoàn cảnh, từ công sở, dạo phố cho đến các buổi tiệc tùng.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetail;
