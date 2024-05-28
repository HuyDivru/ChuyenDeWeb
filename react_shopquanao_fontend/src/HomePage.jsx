import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import ProductList from "./ProductList";
import 'bootstrap/dist/css/bootstrap.css';
import './HomePage.css';
import Carousel from "./Carousel";

function HomePage() {
    return (
        <React.Fragment>
            <Header />
            <Carousel/>
            <ProductList />
            <Footer />
        </React.Fragment>
    );
}

export default HomePage;