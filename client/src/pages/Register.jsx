import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="w-full max-w-md bg-white p-8 rounded shadow">
                <RegisterForm
                    onSwitchToLogin={() => navigate('/login')}
                    onSubmit={() => navigate('/login')}
                />
            </div>
        </div>
    )
}

export default Register 