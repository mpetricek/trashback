import React from 'react'

export default function DescriptionToggler({ toggleDescription }) {
    return (
        <div className="flex-0">
            <button
                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={(e) => toggleDescription(e)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
            </button>
        </div>
    )
}
