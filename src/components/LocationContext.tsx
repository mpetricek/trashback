import React, { useState } from 'react'
/*
type GlobalContent = [
    {
        title?: string
        type?: string
        description?: string
        location?: [number, number]
        userLocation?: [number, number]
    },
    (c: string) => void
]
*/
export interface locationData {
    title?: string
    type?: string
    description?: string
    location?: [number, number]
    userLocation?: [number, number]
}
const LocationContext = React.createContext<{
    locationData: locationData
    setLocationData(state: locationData): void
}>({
    locationData: null,
    setLocationData: () => {},
})

const LocationProvider = (props) => {
    const [locationData, setLocationData] = useState<locationData>({
        title: null,
        type: null,
        description: null,
        location: [null, null],
        userLocation: [null, null],
    })

    return (
        <LocationContext.Provider value={{ locationData, setLocationData }}>{props.children}</LocationContext.Provider>
    )
}

export { LocationContext, LocationProvider }
