import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { httpPost } from './httpConfig';
import { useUser } from './UserContext';

import 'mdb-ui-kit/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ mobile: '', password: '' });
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState('');
    const { login, logout } = useUser();
    
    useEffect(() => {
        const storedMobile = localStorage.getItem('mobile');
        const storedPassword = localStorage.getItem('password');
        if (storedMobile && storedPassword) {
            setFormData({ mobile: storedMobile, password: storedPassword });
            setRememberMe(true);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await httpPost('login/user', formData);
            const { token, user_profile_details } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user_id', user_profile_details.user_id);

            login(user_profile_details, token);

            if (window.PasswordCredential && response.data.success) {
                const cred = new window.PasswordCredential({
                    id: formData.mobile,
                    password: formData.password,
                });
                window.navigator.credentials.store(cred);
            }
            if (rememberMe) {
                localStorage.setItem('mobile', formData.mobile);
                localStorage.setItem('password', formData.password);
            } else {
                localStorage.removeItem('mobile');
                localStorage.removeItem('password');
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
                <input 
                    type="text" 
                    name="mobile" 
                    className="form-control" 
                    style={{ background: '#d9dbd9' }} 
                    value={formData.mobile} 
                    onChange={handleChange} 
                />
            </div>
            <div data-mdb-input-init className="form-outline mb-4">
                <label className="form-label">Mật Khẩu</label>
                <input 
                    type="password" 
                    name="password" 
                    className="form-control" 
                    style={{ background: '#d9dbd9' }} 
                    value={formData.password} 
                    onChange={handleChange} 
                />
            </div>
            <div className="row mb-4">
                <div className="col d-flex justify-content-center">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="form2Example31" 
                            checked={rememberMe} 
                            onChange={handleRememberMeChange} 
                        />
                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                    </div>
                </div>
                <div className="col">
                    <a href="/forgotpassword">Quên Mật Khẩu?</a>
                </div>
            </div>
            {errors && <div className="text-danger text-center mb-3">{errors}</div>}
            <button 
                type="submit" 
                data-mdb-button-init 
                data-mdb-ripple-init 
                className="btn btn-primary btn-block mb-4"
            >
                Đăng Nhập
            </button>
            <div className="text-center">
                <p>Không có tài khoản? <a href="/register">Đăng ký</a></p>
                <p>Hoặc đăng nhập với:</p>
                <button 
                    type="button" 
                    data-mdb-button-init 
                    data-mdb-ripple-init 
                    className="btn btn-link btn-floating mx-1"
                >
                    <i className="fab fa-facebook-f"></i>
                </button>
                <button 
                    type="button" 
                    data-mdb-button-init 
                    data-mdb-ripple-init 
                    className="btn btn-link btn-floating mx-1"
                >
                    <i className="fab fa-google"></i>
                </button>
                <button 
                    type="button" 
                    data-mdb-button-init 
                    data-mdb-ripple-init 
                    className="btn btn-link btn-floating mx-1"
                >
                    <i className="fab fa-twitter"></i>
                </button>
                <button 
                    type="button" 
                    data-mdb-button-init 
                    data-mdb-ripple-init 
                    className="btn btn-link btn-floating mx-1"
                >
                    <i className="fab fa-github"></i>
                </button>
            </div>
        </form>
    );
}

export default Login;
