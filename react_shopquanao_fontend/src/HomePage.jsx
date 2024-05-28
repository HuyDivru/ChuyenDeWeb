import Footer from "./Footer";
import Header from "./Header";
import ProductList from "./ProductList";

import './HomePage.css';

function HomePage() {
    return (
        <>
            <Header />
            <div>
                <div className="item item-owl">
                    <div className="ms-item">
                        <picture>
                            <source media="(max-width:767px)" width="600" height="600" srcSet="//theme.hstatic.net/1000333436/1001213866/14/slideshow_2_mb_grande.jpg?v=309" />
                            <source media="(min-width:768px)" width="2048" height="806" srcSet="//theme.hstatic.net/1000333436/1001213866/14/slideshow_2_master.jpg?v=309" />
                            <img className="dt-width-100" width="2048" height="806" alt="Bộ Sưu Tập Suit Adam Store" loading="lazy" />
                        </picture>
                    </div>
                    <ProductList/>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomePage;