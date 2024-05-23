import React, { useState } from 'react'
import { Form, Input, Button, notification, Card } from 'antd'
import { register } from '../../services/apiService'

const Register = ({ setToken }) => {
    const [loading, setLoading] = useState(false)

    const onFinish = async (values) => {
        setLoading(true)
        try {
            const result = await register({ ...values, new_user: true })
            setLoading(false)
            setToken(result.data)
            window.location.reload()
            notification.success({ message: 'Registration successful!' })
        } catch (error) {
            notification.error({ message: 'Registration failed', description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            background: '#f0f2f5',
        }}>
            <Card title="Seja muito bem vindo!" style={{
                width: '400px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
                <Form onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Por favor, informe seu email!' }]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[{ required: true, message: 'Por favor, informe seu nome!' }]}
                    >
                        <Input placeholder="Nome" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor, informe sua senha!' }]}
                    >
                        <Input.Password placeholder="Senha" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Registrar!
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Register
