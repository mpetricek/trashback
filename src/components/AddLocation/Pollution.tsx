import React from 'react'
import Nouislider from 'nouislider-react'
import 'nouislider/distribute/nouislider.css'

export default function Pollution() {
    return (
        <div className="flex flex-col mb-12 w-full">
            <p className="flex items-center text-lg uppercase tracking-wide font-bold mb-2">
                <span className="text-green-500 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                Pollution
            </p>
            <div className="mx-4">
                <Nouislider
                    range={{ min: 1, max: 3 }}
                    step={1}
                    start={2}
                    connect={[true, false]}
                    pips={{
                        mode: 'steps',
                        filter: function (value, type) {
                            return type === 0 ? -1 : 1
                        },
                        format: {
                            to: function (e) {
                                var pipFormats = ['light', 'medium', 'heavy']
                                return pipFormats[e - 1]
                            },
                        },
                    }}
                />
            </div>
        </div>
    )
}
