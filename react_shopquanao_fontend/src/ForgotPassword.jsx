import React, { useState } from 'react';
import { httpPost_m } from './httpConfig';
import { Button, Card, Container, FloatingLabel, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';


function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await httpPost_m('forgot-password', null, {
                params: { email }
            });
            setMessage(response.data);
        } catch (error) {
            setMessage(error.response.data);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card style={{ width: '25rem' }}>
                <Card.Header as="h5">Quên Mật Khẩu</Card.Header>
                <Card.Body className="text-center">
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Địa Chỉ Email"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" 
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                    </FloatingLabel>
                    <Button variant="primary" onClick={handleSubmit}>Gửi</Button>
                    {message && <div className="mt-3 alert alert-info">{message}</div>}
                    <div className="d-flex justify-content-between mt-3">
                        <Link to="/login">Đăng Nhập</Link>
                        <Link to="#">Reset Mật Khẩu</Link>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ForgotPassword;