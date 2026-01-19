import React from 'react'

const VerifyEmail = () => {
    return (
        <div className='relative w-full  overflow-hidden'>
            <div className='min-h-screen flex items-center justify-center bg-green-100 px-4'>
                <div className='bg-white p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
                    <h2 className='text-2xl font-semibold text-green-700 mb-4'>
                        ✅Check Your Email
                    </h2>
                    <p className='text-gray-400 text-sm'>Check your email for a verification link to complete your registration.</p>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail