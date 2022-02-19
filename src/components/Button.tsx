import React from 'react'
export type Button = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    className?: string
    children: React.ReactNode
    submit?: boolean
    green?: boolean
    purple?: boolean
}

export default function Button({ onClick, className, children, submit, green, purple }: Button) {
    return (
        <button
            className={`w-full inline-flex justify-center rounded-md  shadow-sm px-4 py-2 text-base font-medium   focus:outline-none focus:ring-2 focus:ring-offset-2   sm:w-auto sm:text-sm border ${
                className ? className : ''
            } ${green ? 'bg-green-500 hover:bg-green-600 focus:ring-red-500 text-white border-transparent' : ''} ${
                purple ? 'bg-purple-500 hover:bg-purple-600 focus:ring-red-500 text-white border-transparent' : ''
            } ${
                !green && !purple
                    ? 'focus:ring-indigo-500 text-gray-700 hover:bg-gray-50 bg-white border border-gray-30'
                    : ''
            }`}
            type={submit ? 'submit' : null}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
