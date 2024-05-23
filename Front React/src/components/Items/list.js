
import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Popconfirm } from 'antd';
import { fetchItems, deleteItem } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const ItemList = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        setLoading(true);
        try {
            const response = await fetchItems();
            setArtifacts(response.data);
        } catch (error) {
            notification.error({ message: 'Failed to load artifacts', description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteItem(id);
            notification.success({ message: 'Artifact deleted successfully' });
            loadItems();
        } catch (error) {
            notification.error({ message: 'Failed to delete artifact', description: error.message });
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', width: 300 },
        { title: 'Description', dataIndex: 'description', key: 'description', width: 300 },
        {
            title: 'Ação',
            key: 'action',
            width: 25,
            render: (text, record) => (
                <div>
                    <Button onClick={() => navigate(`/item/edit/${record.id}`)}>Editar</Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="link">Deletar</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Button style={{ marginBottom: 16}} type="primary" onClick={() => navigate('/items/create')}>Registrar Item</Button>
            <Table dataSource={artifacts} columns={columns} rowKey="id" loading={loading} />
        </div>
    );
};

export default ItemList;