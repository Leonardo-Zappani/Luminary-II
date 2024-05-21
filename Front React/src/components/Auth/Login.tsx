import React, { useState } from 'react';
import { Form, Input, Button, Card, notification } from 'antd';
import { authenticate } from '../../services/apiService';

const Login = ({ setToken }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await authenticate(values); // Use the correct function
            setToken(response.data);
            notification.success({ message: 'Login successful!' });
        } catch (error) {
            notification.error({ message: 'Login failed', description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            background: '#f0f2f5',
        }}>
            <Card title="Login" style={{
                width: '400px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
                <Form onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Login
                            </Button>

                            <Button href="/register" type="primary" htmlType="button">
                                Registrar
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
