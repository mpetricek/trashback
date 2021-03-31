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
    place?: string
    country_code?: string
    type?: string
    description?: string
    location?: [number, number]
    userLocation?: [number, number]
    addLocation: boolean
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
        place: null,
        country_code: null,
        type: null,
        description: null,
        location: [null, null],
        userLocation: [null, null],
        addLocation: false,
    })

    return (
        <LocationContext.Provider value={{ locationData, setLocationData }}>{props.children}</LocationContext.Provider>
    )
}

export { LocationContext, LocationProvider }
