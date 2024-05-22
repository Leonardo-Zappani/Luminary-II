import React, { useEffect, useState, useCallback } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { createArtifact, loadArtifact, updateArtifact } from '../../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';

const ArtifactForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const response = await loadArtifact(id);
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
                await updateArtifact(id, values);
                notification.success({ message: 'Artifact updated successfully' });
            } else {
                await createArtifact(values);
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
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please input the name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input the description!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please input the type!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="status" label="Status" rules={[{ required: true, message: 'Please input the status!' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} key="submit">Submit</Button>
                <Button onClick={() => navigate('/artifacts')} style={{ marginLeft: '10px' }} key="cancel">Cancel</Button>
            </Form.Item>
        </Form>
    );
};

export default ArtifactForm;
