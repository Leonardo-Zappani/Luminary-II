import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout, Button } from 'antd';
import {jwtDecode} from 'jwt-decode'; // Update import to named import
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Activities from './components/Dashboard/Activities';
import { getToken, isLoggedIn, logout } from './services/authService';
import {loadUser} from "./services/apiService";

const { Header, Content } = Layout;

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

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

    useEffect(() => {
        if (isAuthenticated && userId) {
            setUser(loadUser(userId));
        }
    }, [isAuthenticated, userId]);

    const handleLogin = (token) => {
        localStorage.setItem('token', token.auth_token);
        localStorage.setItem('userId', token.user_id); // Use consistent key 'userId'
        setUserId(token.user_id);
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
                            element={isAuthenticated ? <Activities user={user} /> : <Navigate to="/login" />}
                        />
                    </Routes>
                </Content>
            </Layout>
        </Router>
    );
};

export default App;
