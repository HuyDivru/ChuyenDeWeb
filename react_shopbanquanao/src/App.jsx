import './App.css';
import Home from './Home';

import Product from './Product';
import CheckoutCart from './CheckoutCart';
import Checkout from './Checkout';

import { ContextProvider, cartState, reducer } from './ContextProvider';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React from "react";
import AdminProduct from './AdminProduct';
import AddProduct from './AddProduct';


function App() {
  return (
    <ContextProvider reducer={reducer} cartState={cartState}>
      <div>
        <Router>
          <Switch> <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={Product} />

            <Route exact path="/checkoutcart" component={CheckoutCart} />



            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/listProduct" component={AdminProduct} />
            <Route exact path="/saveProduct" component={AddProduct} />
          </Switch>
        </Router>
      </div>
    </ContextProvider>
  );
}

export default App;