import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import axios from 'axios';

const Register = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axios.post('/api/register', values);
            notification.success({ message: 'Registration successful!' });
        } catch (error) {
            notification.error({ message: 'Registration failed', description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={onFinish}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Register</Button>
            </Form.Item>
        </Form>
    );
};

export default Register;
