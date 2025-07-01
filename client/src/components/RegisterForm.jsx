import React, { useState } from 'react'

const RegisterForm = ({ onSubmit, onSwitchToLogin }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({ name, email, password })
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="text-3xl text-center font-bold mb-2">Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="border rounded px-3 py-2"
                required
            />
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
            <button type="submit" className="bg-blue-600 cursor-pointer text-white rounded py-2 font-semibold">Register</button>
            <span className="text-sm text-center mt-2">Already have an account? <button type="button" className="text-blue-600 underline cursor-pointer" onClick={onSwitchToLogin}>Login</button></span>
        </form>
    )
}

export default RegisterForm 