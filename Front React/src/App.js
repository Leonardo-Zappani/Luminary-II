import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { jwtDecode } from 'jwt-decode';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Activities from './components/Dashboard/Activities';
import { getToken, isLoggedIn, logout } from './services/authService';

const { Header, Content } = Layout;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

    useEffect(() => {
        const token = getToken();
        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
                setIsAuthenticated(false);
            }
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Layout>
                <Header>
                    {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}
                </Header>
                <Content style={{ padding: '50px' }}>
                    <Routes>
                        <Route
                            path="/login"
                            element={!isAuthenticated ? <Login setToken={handleLogin} /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/register"
                            element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/"
                            element={isAuthenticated ? <Activities /> : <Navigate to="/login" />}
                        />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
