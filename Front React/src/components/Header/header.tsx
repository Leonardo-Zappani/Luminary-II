import React from 'react';
import { Layout, Avatar, Dropdown, Menu, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User } from '../../apiService';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

export const HeaderPage: React.FC<HeaderProps> = (props: HeaderProps) => {
    const { user, onLogout } = props;
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
            <div style={{ color: 'white', fontSize: '20px' }}>Luminary II</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: 'white', marginRight: '10px' }}>{user.name}</span>
                <Dropdown overlay={menu} placement="bottomRight">
                    <Avatar size="large" icon={<UserOutlined />} />
                </Dropdown>
            </div>
        </Layout.Header>
    );
};
