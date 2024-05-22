import React, { useEffect, useState, useCallback } from 'react';
import {Form, Input, Button, notification, Card} from 'antd';
import { createItem, loadItem, updateItem } from '../../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';

const ItemForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const response = await loadItem(id);
            form.setFieldsValue(response.data);
        } catch (error) {
            notification.error({ message: 'Failed to load artifact', description: error.message });
        } finally {
            setLoading(false);
        }
    }, [id, form]);

    useEffect(() => {
        if (id) {
            load();
        }
    }, [id, load]);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            if (id) {
                await updateItem(id, values);
                notification.success({ message: 'Artifact updated successfully' });
            } else {
                await createItem(values);
                notification.success({ message: 'Artifact created successfully' });
            }
            navigate('/artifacts');
        } catch (error) {
            notification.error({ message: 'Operation failed', description: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card width={400}>
            <Form style={{width: 450}} form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="name" label="Nome" rules={[{ required: true, message: 'Informe um nome!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item style={{ height: 64}} name="description" label="Descrição" rules={[{ required: true, message: 'Informe uma descrição' }]}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} key="submit">Criar</Button>
                    <Button onClick={() => navigate('/artifacts')} style={{ marginLeft: '10px' }} key="cancel">Cancelar</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ItemForm;
