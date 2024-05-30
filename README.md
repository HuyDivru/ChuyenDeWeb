
Trang web bán quần áo được xây dựng với Spring Boot và React là một giải pháp mạnh mẽ và linh hoạt, mang đến trải nghiệm mua sắm trực tuyến mượt mà và bảo mật.
Dưới đây là mô tả chi tiết về kiến trúc và các công nghệ được sử dụng trong việc phát triển trang web này, đặc biệt là về bảo mật, JSON Web Token (JWT), chức 
năng gửi email, và việc sử dụng React cho giao diện người dùng.

<h2>Kiến Trúc và Công Nghệ Sử Dụng</h2>
<h3>BackEnd</h3>
<h4>1. Spring Boot</h4>
<p>Spring Boot là nền tảng chính để xây dựng ứng dụng backend, cung cấp cấu trúc MVC (Model-View-Controller) mạnh mẽ để quản lý các yêu cầu HTTP và xử lý dữ liệu.</p>
<br>
<h4>2. Spring Security</h4>
<p>Spring Security được tích hợp để đảm bảo an toàn và bảo mật, quản lý xác thực và phân quyền người dùng. Nó bảo vệ các API và trang web khỏi các tấn công như SQL Injection, Cross-Site Scripting (XSS) và Cross-Site Request Forgery (CSRF).</p>
<br>
<h4>3. JSON Web Token (JWT)</h4>
<p>JWT được sử dụng để quản lý xác thực và phiên người dùng. Khi người dùng đăng nhập, hệ thống sẽ phát hành một token JWT chứa thông tin xác thực của người dùng. Token này được gửi kèm trong các yêu cầu HTTP để xác thực và ủy quyền các hành động của người dùng.</p>
<br>
<h4>4. SendMail</h4>
<p>Chức năng gửi email được sử dụng để xác thực email, gửi thông báo, và quản lý quá trình đặt lại mật khẩu. Spring Boot Mail Integration giúp dễ dàng cấu hình và gửi email thông qua các dịch vụ SMTP như Gmail, SendGrid..</p>
<br>
<h4>5. JPA/Hibernate</h4>
<p>JPA (Java Persistence API) cùng với Hibernate được sử dụng để quản lý cơ sở dữ liệu. Chúng hỗ trợ việc lưu trữ và truy xuất dữ liệu từ các bảng trong cơ sở dữ liệu MySQL một cách hiệu quả và dễ dàng.</p>
<br>
<h4>6. MySQL</h4>
<p>MySQL là hệ quản trị cơ sở dữ liệu được sử dụng, cung cấp khả năng lưu trữ dữ liệu ổn định và mạnh mẽ. Cơ sở dữ liệu này lưu trữ thông tin sản phẩm, người dùng, đơn đặt hàng, và các chi tiết khác.</p>
<br>
<h4>7. RESTful API</h4>
<p>Các API RESTful được xây dựng để phục vụ cho việc tương tác giữa frontend và backend. Chúng giúp ứng dụng linh hoạt và dễ mở rộng, đồng thời hỗ trợ tích hợp với các dịch vụ bên thứ ba.</p>
<hr>
<h3>FontEnd</h3>
<h4>React</h4>
<p>React.js được sử dụng để xây dựng giao diện người dùng. React giúp tạo ra các thành phần giao diện tương tác, nhanh chóng và động. Nó cũng giúp cải thiện hiệu suất và trải nghiệm người dùng.</p>
