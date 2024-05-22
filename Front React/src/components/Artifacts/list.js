
import React, { useEffect, useState } from 'react';
import { Table, Button, notification, Popconfirm } from 'antd';
import { fetchArtifacts, deleteArtifact } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

const ArtifactList = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadArtifacts();
    }, []);

    const loadArtifacts = async () => {
        setLoading(true);
        try {
            const response = await fetchArtifacts();
            setArtifacts(response.data);
        } catch (error) {
            notification.error({ message: 'Failed to load artifacts', description: error.message });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteArtifact(id);
            notification.success({ message: 'Artifact deleted successfully' });
            loadArtifacts();
        } catch (error) {
            notification.error({ message: 'Failed to delete artifact', description: error.message });
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Type', dataIndex: 'type', key: 'type' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => navigate(`/artifacts/edit/${record.id}`)}>Editar</Button>
                    <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="link">Deletar</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    return (
        <div style={{height: '100%', width: '100%'}}>
            <Button style={{ marginBottom: 16}} type="primary" onClick={() => navigate('/artifacts/create')}>Registrar artefato</Button>
            <Table dataSource={artifacts} columns={columns} rowKey="id" loading={loading}/>
        </div>
    );
};

export default ArtifactList;
