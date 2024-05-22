import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '../../services/apiService';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

export const HeaderPage: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { user, onLogout } = props;
    const [selectedKey, setSelectedKey] = useState<string | null>('artifacts');

    useEffect(() => {
        if (!user || !selectedKey) return;

        const currentPath = window.location.pathname;
        const targetPath = `/${selectedKey}`;

        if (currentPath !== targetPath) {
            window.history.pushState({}, '', targetPath);
        }
    }, [selectedKey, user]);

    if (!user) return null;

    const menu = (
        <Menu>
            <Menu.Item key="logout" onClick={onLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ color: 'white', fontSize: '20px', marginRight: '20px' }}>Luminary II</div>
                <Menu
                    onClick={(e) => setSelectedKey(e.key)}
                    selectedKeys={[selectedKey]}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[selectedKey]}
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
    );
};
