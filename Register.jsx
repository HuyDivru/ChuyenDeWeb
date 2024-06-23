import { useState } from "react";
import { httpPost } from "./httpConfig";
import { useNavigate } from "react-router-dom";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        let errors = {};
        if (!formData.name) errors.name = 'Vui lòng nhập họ và tên';
        if (!formData.mobile) errors.mobile = 'Vui lòng nhập số điện thoại';
        if (!formData.email) errors.email = 'Vui lòng nhập email';
        if (!formData.password) errors.password = 'Vui lòng nhập mật khẩu';
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Mật khẩu không khớp';

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess('');
        const validateErrors = validate();
        if (Object.keys(validateErrors).length !== 0) return setErrors(validateErrors);

        try {
            const response = await httpPost('signup/user', formData);
            setSuccess('Đăng Ký Thành Công');
            console.log('User Register: ', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Register error: ', error.response?.data?.message || error.message);
            setErrors({ api: error.response?.data?.message || 'Đăng Ký Thất Bại, Vui Lòng Thử Lại' });
        }
    };

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Đăng Ký</p>
                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="text" id="nameInput" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="nameInput">Họ Và Tên</label>
                                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="text" id="phoneInput" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="phoneInput">Số điện thoại</label>
                                                    {errors.mobile && <div className="text-danger">{errors.mobile}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="email" id="emailInput" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="emailInput">Email</label>
                                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="password" id="passwordInput" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="passwordInput">Mật Khẩu</label>
                                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    <input type="password" id="confirmPasswordInput" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                                    <label className="form-label" htmlFor="confirmPasswordInput">Nhập Lại Mật Khẩu</label>
                                                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                                                </div>
                                            </div>
                                            <div className="form-check d-flex justify-content-center mb-5">
                                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Tôi đồng ý tất cả các tuyên bố trong <a href="#!">Điều khoản dịch vụ</a>
                                                </label>
                                            </div>
                                            {errors.api && <div className="text-danger text-center mb-3">{errors.api}</div>}
                                            {success && <div className="text-success text-center mb-3">{success}</div>}
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Đăng Ký</button>
                                            </div>
                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <p>Bạn đã có tài khoản? <a href="/login">Đăng nhập</a></p>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
