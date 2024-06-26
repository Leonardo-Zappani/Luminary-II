import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import { jwtDecode } from 'jwt-decode'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Activities from './components/Dashboard/Activities'
import { getToken, isLoggedIn, logout } from './services/authService'
import { loadUser } from "./services/apiService"
import HeaderPage from "./components/Header/header"
import ArtifactPage from './components/Artifacts/page'
import ItemsPage from './components/Items/page'

const { Header, Content } = Layout

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn())
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(localStorage.getItem('userId'))

    useEffect(() => {
        const token = getToken()
        if (token) {
            const decodedToken = jwtDecode(token)
            if (decodedToken.exp * 1000 < Date.now()) {
                logout()
                setIsAuthenticated(false)
            }
        }
    }, [])

    useEffect(() => {
        if (isAuthenticated && userId) {
            loadUser(userId).then((response) => setUser(response.data))
        }
    }, [isAuthenticated, userId])

    const handleLogin = (token) => {
        localStorage.setItem('token', token.auth_token)
        localStorage.setItem('userId', token.user_id)
        setUserId(token.user_id)
        setIsAuthenticated(true)
    }

    const handleLogout = () => {
        logout()
        setIsAuthenticated(false)
    }

    return (
        <Router>
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Layout style={{ flex: 1 }}>
                    <Header>
                        {isAuthenticated && (<HeaderPage user={user} onLogout={handleLogout} />)}
                    </Header>
                    <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '50px', flex: 1 }}>
                        <Routes>
                            <Route path="/login" element={!isAuthenticated ? <Login setToken={handleLogin} /> : <Navigate to="/" />} />
                            <Route path="/register" element={!isAuthenticated ? <Register setToken={handleLogin}/> : <Navigate to="/" />} />
                            <Route path="/artifacts/*" element={isAuthenticated ? <ArtifactPage /> : <Navigate to="/login" />} />
                            <Route path="/items/*" element={isAuthenticated ? <ItemsPage /> : <Navigate to="/login" />} />
                            <Route path="/" element={isAuthenticated ? <Activities user={user} /> : <Navigate to="/login" />} />
                        </Routes>
                    </Content>
                </Layout>
            </div>
        </Router>
    )
}

export default App
