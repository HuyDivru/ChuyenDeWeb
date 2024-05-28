import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Thêm Routes vào từ import
import Login from './Login';
import Register from './Register';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
