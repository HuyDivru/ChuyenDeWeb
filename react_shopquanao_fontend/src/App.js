
import './App.css';
import HomePage from './HomePage';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Thêm Routes vào từ import
import Login from './Login';
import Register from './Register';
import ProductDetail from './ProductDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CartItem from './CartItem';
import AdminHome from './AdminHome';
import { UserProvider } from './UserContext';
import ForgotPassword from './ForgotPassword';


function App() {
  return (
    <div className="App">
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/cartItem" element={<CartItem />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </Router>
    </UserProvider>
  </div>
  );
}

export default App;
