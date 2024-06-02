import React, { useState } from 'react';
import { httpPost_m } from './httpConfig';
import { Button, Card, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [mobile, setMobile] = useState('');
    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');

    const [show, setShow] = useState(false);
    const [status, setStatus] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await httpPost_m('forgot-password', null, {
                params: { email }
            });
            setMessage(response.data);
            setStatus(true);
        } catch (error) {
            setMessage(error.response.data);
            setStatus(false);
        }
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await httpPost_m('reset-password', null, {
                params: { mobile, oldPassword, newPassword }
            });
            setMessage(response.data);
            setStatus(true);
        }
        catch (error) {
            setMessage(error.response.data);
            setStatus(false);
        }
    };

    return (
        <>
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
                    {message && <div className={`mt-3 alert ${status ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                    <div className="d-flex justify-content-between mt-3">
                        <Link to="/login">Đăng Nhập</Link>
                        <Link to="#" onClick={handleShow}>Reset Mật Khẩu</Link>
                    </div>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Đặt Lại Mật Khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    {message && <div className={`mt-3 alert ${status ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                id='mobile'
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Mật khẩu cũ</Form.Label>
                            <Form.Control
                                type="text"
                                id='oldPassword'
                                value={oldPassword}
                                onChange={(e) => setoldPassword(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>mật khẩu mới</Form.Label>
                            <Form.Control
                                type="text"
                                id='newPassword'
                                value={newPassword}
                                onChange={(e) => setnewPassword(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleResetPassword}>
                        Lưu thay đổi
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </div>
        </>
    );
}

export default ForgotPassword;