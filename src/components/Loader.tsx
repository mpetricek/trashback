import React from 'react'

export default function Loader(props) {
    const size = props.size
    const className = props.className
    return (
        <div
            style={{ borderTopColor: 'rgb(34, 197, 94)' }}
            className={`inline-block animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-${
                size ? size : 12
            } w-${size ? size : 12}
            ${className ? className : ''}`}
        />
    )
}
