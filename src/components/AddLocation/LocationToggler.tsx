import React from 'react'

export default function LocationToggler({ toggleMap }) {
    return (
        <div className="flex-0">
            <button
                className="focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex font-bold text-sm pr-3"
                onClick={(e) => toggleMap(e)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 mr-2"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                    />
                </svg>
                Change location
            </button>
        </div>
    )
}
