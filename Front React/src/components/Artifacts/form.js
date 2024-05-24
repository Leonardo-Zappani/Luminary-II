import React, { useEffect, useState, useCallback } from 'react'
import { Form, Input, Button, notification, Card, Select } from 'antd'
import { createArtifact, loadArtifact, updateArtifact, loadUsers, fetchItems } from '../../services/apiService'
import { useNavigate, useParams } from 'react-router-dom'

const { Option } = Select

const ArtifactForm = () => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const [users, setUsers] = useState([])
    const [items, setItems] = useState([])

    const load = useCallback(async () => {
        setLoading(true)
        try {
            const response = await loadArtifact(id)
            form.setFieldsValue({
                ...response.data,
                users: response.data.user_ids.map(id => id.toString()),
                items: response.data.item_ids.map(id => id.toString()),
            })
        } catch (error) {
            notification.error({ message: 'Oops, houve uma falha.', description: error.message })
        } finally {
            setLoading(false)
        }
    }, [id, form])

    useEffect(() => {
        if (id) {
            load()
        }
    }, [id, load])

    useEffect(() => {
        loadUsers().then(response => setUsers(response.data))
        fetchItems().then(response => setItems(response.data))
    }, [])

    const onFinish = async (values) => {
        setLoading(true)
        try {
            if (id) {
                await updateArtifact(id, values)
                notification.success({ message: 'Artefato atualizado com sucesso!' })
            } else {
                await createArtifact(values)
                notification.success({ message: 'Artifato criado com sucesso!' })
            }
            navigate('/artifacts')
        } catch (error) {
            notification.error({ message: 'Oops, a operação falhou', description: error.message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card width={400}>
            <Form style={{ width: 450 }} form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: 'Adicione um nome!' }]}
                >
                    <Input placeholder="Dê um bom nome" />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input placeholder="Adicione uma descrição" />
                </Form.Item>
                <Form.Item
                    name="users"
                    label="Atribuir para"
                    rules={[{ required: true, message: 'Selecione um usuario!' }]}
                >
                    <Select mode="multiple" placeholder="Selecione os usuarios">
                        {users.length > 0 && users.map(user => (
                            <Option key={user.id} value={user.id.toString()}>
                                {user.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="items"
                    label="Selecione os items"
                    rules={[{ required: true, message: 'Selecione um item!' }]}
                >
                    <Select mode="multiple" placeholder="Selecione os items">
                        {items.length > 0 && items.map(item => (
                            <Option key={item.id} value={item.id.toString()}>
                                {item.name}: {item.description}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} key="submit">Enviar</Button>
                    <Button onClick={() => navigate('/artifacts')} style={{ marginLeft: '10px' }} key="cancel">Cancelar</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default ArtifactForm
