import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpPost } from './httpConfig';
import { useUser } from './UserContext';

import 'mdb-ui-kit/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';


let inactivityTimer =null;

function setInactivityTimeout(){
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        window.location.reload();
    }, 15*60*1000); //15 phút

}


function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ mobile: '', password: '' });
    const [errors, setErrors] = useState('');
    const { login } = useUser();
    

    useEffect(() => {
        setInactivityTimeout();
        window.addEventListener('mousemove', setInactivityTimeout);
        window.addEventListener('keydown', setInactivityTimeout);
        window.addEventListener('scroll', setInactivityTimeout);

        return () => {
            window.removeEventListener('mousemove', setInactivityTimeout);
            window.removeEventListener('keydown', setInactivityTimeout);
            window.removeEventListener('scroll', setInactivityTimeout);
        };
    },[]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await httpPost('login/user', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_id', response.data.user_profile_details.user_id);

            login(response.data.user_profile_details); // Lưu thông tin người dùng vào UserContext
            
            if (window.PasswordCredential && response.data.success) {
                const cred = new window.PasswordCredential({
                    id: formData.mobile,
                    password: formData.password,
                });
                window.navigator.credentials.store(cred);
            }

            navigate('/');
        } catch (error) {
            setErrors(error.response?.data?.message || 'Đăng Nhập Thất Bại');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label">Số điện thoại</label>
                <input type="text" name="mobile" className="form-control" style={{ background: '#d9dbd9' }} value={formData.mobile} onChange={handleChange} />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label">Mật Khẩu</label>
                <input type="password" name="password" className="form-control" style={{ background: '#d9dbd9' }} value={formData.password} onChange={handleChange} />
            </div>
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                    </div>
                </div>
                <div className="col">
                    <a href="#!">Quên Mật Khẩu?</a>
                </div>
            </div>
            {errors && <div className="text-danger text-center mb-3">{errors}</div>}
            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">Đăng Nhập</button>
            <div className="text-center">
                <p>Không có tài khoản? <a href="/register">Đăng ký</a></p>
                <p>Hoặc đăng nhập với:</p>
                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                </button>
                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-google"></i>
                </button>
                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                </button>
                <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                    <i className="fab fa-github"></i>
                </button>
            </div>
        </form>
    );
}

export default Login;
