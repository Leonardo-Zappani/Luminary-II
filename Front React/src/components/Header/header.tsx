import React, { useEffect, useState } from 'react'
import { Layout, Avatar, Dropdown, Menu } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { User } from '../../services/apiService'
import { useNavigate, useLocation } from 'react-router-dom'

interface HeaderProps {
    user: User
    onLogout: () => void
}

const HeaderPage: React.FC<HeaderProps> = ({ user, onLogout }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedKey, setSelectedKey] = useState<string>(location.pathname.split('/')[1] || 'artifacts')

    useEffect(() => {
        if (!user) return
        setSelectedKey(location.pathname.split('/')[1])
    }, [location.pathname, user])

    if (!user) return null

    const menu = (
        <Menu>
            <Menu.Item key="logout" onClick={onLogout}>
                Logout
            </Menu.Item>
        </Menu>
    )

    const handleMenuClick = (e) => {
        setSelectedKey(e.key)
        navigate(`/${e.key}`)
    }

    return (
        <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: '20px', marginRight: '20px' }}>Luminary II</div>
                <Menu
                    onClick={handleMenuClick}
                    selectedKeys={[selectedKey]}
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px', width: '400px' }}
                >
                    <Menu.Item key="artifacts">Artifacts</Menu.Item>
                    <Menu.Item key="items">Items</Menu.Item>
                </Menu>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'white', marginRight: '10px' }}>{user.name}</span>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Layout.Header>
    )
}

export default HeaderPage
