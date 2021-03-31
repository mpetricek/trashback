import React, { useState } from 'react'
import Map from '../Map'
export default function LocationMap({ toggleMapState, toggleMap }) {
    const [mapLoading, setMapLoading] = useState(true)
    return (
        toggleMapState && (
            <div className="flex-auto w-full absolute inset-0 sm:w-2/12 flex-grow-1 sm:relative z-0 ">
                <Map
                    style={{ width: '100%', height: '100%' }}
                    addMarker
                    className="z-0"
                    setMapLoaded={() => setMapLoading(false)}
                />

                <button
                    className="left-0 right-0 absolute bottom-24 mx-auto bg-white hover:bg-white font-medium text-black px-4 py-2 shadow-sm rounded-md"
                    onClick={(e) => toggleMap(e)}
                >
                    Back
                </button>
            </div>
        )
    )
}
