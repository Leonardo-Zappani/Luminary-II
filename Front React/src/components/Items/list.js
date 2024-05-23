import React, { useEffect, useState } from 'react'
import { Table, Button, notification, Popconfirm } from 'antd'
import { fetchItems, deleteItem } from '../../services/apiService'
import { useNavigate } from 'react-router-dom'

const ItemList = () => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        setLoading(true)
        try {
            const response = await fetchItems()
            setItems(response.data)
        } catch (error) {
            notification.error({ message: 'Failed to load items', description: error.message })
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteItem(id)
            notification.success({ message: 'Item deleted successfully' })
            loadItems()
        } catch (error) {
            notification.error({ message: 'Failed to delete item', description: error.message })
        }
    }

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name', width: 300 },
        { title: 'Description', dataIndex: 'description', key: 'description', width: 300 },
        {
            title: 'Action',
            key: 'action',
            width: 100,
            render: (text, record) => (
                <div>
                    <Button onClick={() => navigate(`/item/edit/${record.id}`)}>Edit</Button>
                    <Popconfirm title='Tem certeza?' onConfirm={() => handleDelete(record.id)}>
                        <Button type='link'>Delete</Button>
                    </Popconfirm>
                </div>
            )
        }
    ]

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Button style={{ marginBottom: 16 }} type='primary' onClick={() => navigate('/items/create')}>Register Item</Button>
            <Table dataSource={items} columns={columns} rowKey='id' loading={loading} />
        </div>
    )
}

export default ItemList
