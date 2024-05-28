import 'mdb-ui-kit/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HomePage.css';

function Footer() {
    return (
        <div className="container">
        <footer className="py-5">
          <div className="row">
            <div className="col-6 col-md-2 mb-3">
              <h5>TRAVIS HUY</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Giới thiệu</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Kiểm tra đơn hàng</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Cách chọn size</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Thông tin liên hệ</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Hướng dẫn bảo quản</a></li>
              </ul>
            </div>
      
            <div className="col-6 col-md-2 mb-3">
              <h5>Chính Sách</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Hướng dẫn mua hàng</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Khách hàng thân thiết</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Chích sách bảo mật</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Đối tác sản xuất</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Bán hàng liên kết(Affiliate)</a></li>
              </ul>
            </div>
      
            <div className="col-6 col-md-2 mb-3">
              <h5>Thông tin của hàng</h5>
              <ul className="nav flex-column">
              <li className="nav-item mb-2 d-flex align-items-start">
                <i className="fas fa-home me-2"></i>
                <a href="#" className="nav-link p-0 text-muted">03 Đường số 1,Linh Xuân,Thủ Đức,HCM</a>
                </li>
                <li className="nav-item mb-2 d-flex align-items-start">
                <i className="fas fa-phone me-2"></i>
                <a href="#" className="nav-link p-0 text-muted">Hotline: (034) 9920 1192</a>
              </li>
              <li className="nav-item mb-2 d-flex align-items-start">
                <i className="fas fa-envelope me-2"></i>
                <a href="#" className="nav-link p-0 text-muted">Email: honhathuy098@gmail.com</a>
              </li>
              </ul>
            </div>
      
            <div className="col-md-5 offset-md-1 mb-3">
              <form>
                <h5>Mọi thắt mắt của bạn sẽ được giải đáp</h5>
                <p>Hãy nhập email chúng tôi sẽ giúp bạn</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                  <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                  <button className="btn btn-primary" type="button">Gửi</button>
                </div>
              </form>
            </div>
          </div>
      
          <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
            <p>&copy; 2024 Thiết Kế Hồ Nhật Huy, Bản Quyền Thuộc Về Công Ty TravisHuy.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3"><a className="link-dark" href="https://www.facebook.com/honhathuy.travishuy"><i className="fab fa-facebook-f"></i></a></li>
              <li className="ms-3"><a className="link-dark" href="#"><i className="fab fa-google"></i></a></li>
              <li className="ms-3"><a className="link-dark" href="#"><i className="fab fa-twitter"></i></a></li>
            </ul>
          </div>
        </footer>
      </div>
    );
  }
  export default Footer;