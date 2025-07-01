import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/userSlice'
import { loginUser as loginUserApi } from '../api/user'

const LoginForm = ({ onSwitchToRegister, onClose }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const res = await loginUserApi({ email, password })
            if (res && res.data) {
                dispatch(loginUser(res.data))
                if (onClose) onClose()
            } else {
                setError('Invalid response from server')
            }
        } catch (err) {
            setError(err?.response?.data?.message || 'Login failed')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-3xl text-center font-bold mb-2">Login</h2>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
            <button type="submit" className="bg-blue-600 cursor-pointer text-white rounded py-2 font-semibold">Login</button>
            <span className="text-sm text-center mt-2">Don't have an account? <button type="button" className="text-blue-600 underline cursor-pointer" onClick={onSwitchToRegister}>Register</button></span>
        </form>
    )
}

export default LoginForm 