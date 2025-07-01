import React from 'react'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 min-w-[350px] relative">
                <button className="absolute top-2 right-2 text-gray-500 cursor-pointer" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    )
}

export default Modal 