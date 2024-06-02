import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ProductList from "./ProductList";
import 'bootstrap/dist/css/bootstrap.css';
import './HomePage.css';
import CarouselHome from "./CarouselHome";

function HomePage() {
    return (
        <div className="homepage">
            <div className="homepage-header">
                <Header />
            </div>
            <div className="homepage-carousel">
                <CarouselHome />
            </div>
            <div className="homepage-products">
                <ProductList />
            </div>
            <div className="homepage-footer">
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;
