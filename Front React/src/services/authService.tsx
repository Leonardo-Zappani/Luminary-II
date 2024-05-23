import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const TOKEN_KEY = 'token'

export const login = async (username: string, password: string) => {
    const { data } = await axios.post('/api/login', { username, password })
    localStorage.setItem(TOKEN_KEY, data.token)
    return data.token
}

export const register = async (username: string, password: string) => {
    await axios.post('/api/register', { username, password })
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
}

export const getUser = () => {
    try {
        const token = getToken()
        return jwtDecode(token)
    } catch (ex) {
        return null
    }
}

export const isLoggedIn = () => {
    const token = getToken()
    return !!token && !isTokenExpired(token)
}

const isTokenExpired = (token: string) => {
    const { exp } = jwtDecode(token)
    return Date.now() >= exp * 1000
}
