import React from 'react'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <LoginForm
                    onSwitchToRegister={() => navigate('/register')}
                    onClose={() => navigate('/')}
                />
            </div>
        </div>
    )
}

export default Login 