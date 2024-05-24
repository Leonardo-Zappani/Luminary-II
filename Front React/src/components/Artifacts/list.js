import React, { useEffect, useState } from 'react'
import { Table, Button, notification, Popconfirm } from 'antd'
import { fetchArtifacts, deleteArtifact } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'

const ArtifactList = () => {
    const [artifacts, setArtifacts] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadArtifacts()
    }, [])

    const loadArtifacts = async () => {
        setLoading(true)
        try {
            const response = await fetchArtifacts()
            setArtifacts(response.data)
        } catch (error) {
            notification.error({ message: 'Failed to load artifacts', description: error.message })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteArtifact(id)
            notification.success({ message: 'Artefato deleteado com sucesso!' })
            loadArtifacts()
        } catch (error) {
            notification.error({ message: 'Oops, houve uma falha.', description: error.message })
        }
    }

    const columns = [
        { title: 'Nome', dataIndex: 'name', key: 'name' },
        { title: 'Descrição', dataIndex: 'description', key: 'description' },
        { title: 'Usuários destinados', dataIndex: 'user_names', key: 'assigned_names' },
        { title: 'Items selecionados', dataIndex: 'item_grouped_names', key: 'item_names' },
        {
            title: 'Ação',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button onClick={() => navigate(`/artifacts/edit/${record.id}`)}>Editar</Button>
                    <Popconfirm title="Tem certeza?" onConfirm={() => handleDelete(record.id)}>
                        <Button type="link">Deletar</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ]

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Button style={{ marginBottom: 16 }} type="primary" onClick={() => navigate('/artifacts/create')}>
                Registrar artefato
            </Button>
            <Table dataSource={artifacts} columns={columns} rowKey="id" loading={loading} />
        </div>
    )
}

export default ArtifactList
