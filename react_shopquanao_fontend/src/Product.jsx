import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { httpGet } from "./httpConfig";

import './Product.css';
import Header from "./Header";
import Footer from "./Footer";

function Product(){

    const {cat_id} =useParams();
    const [products,setProducts] =useState([]);

    useEffect(() => {
        const fetchProductsByCategory = async (cat_id) => {
            try {
                const response = await httpGet(`api/product/getProductsByCategory?cat_id=${cat_id}`);
                setProducts(response.data);
            } catch (error) {
                console.error("There was an error fetching the products!", error);
            }
        };

        fetchProductsByCategory(cat_id);
    }, [cat_id]);

    return (
       <>
        <Header/>

        <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="wrap-collection-title row">
                <h1>Quần Áo</h1>
            </div>
            <div className="row-filter-here">
                <div className="content-product-list">
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
        </div>
       
        <Footer/>
       </>
    );
}

export default Product;