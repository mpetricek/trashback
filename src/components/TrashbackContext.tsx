import React, { createContext, useState } from 'react'
import { PlaceType } from '../types/plate.type'
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
export interface trashbackData {}
const TrashbackContext = createContext<{
    trashbackData: PlaceType
    setTrashbackData(state: PlaceType): void
}>({
    trashbackData: null,
    setTrashbackData: () => {},
})

const TrashbackProvider = (props) => {
    const [trashbackData, setTrashbackData] = useState<trashbackData>({
        place: null,
        country_code: null,
        type: null,
        description: null,
        location: [null, null],
        userLocation: [null, null],
        addLocation: false,
    })

    return (
        <TrashbackContext.Provider value={{ trashbackData, setTrashbackData }}>
            {props.children}
        </TrashbackContext.Provider>
    )
}

export { TrashbackContext, TrashbackProvider }
