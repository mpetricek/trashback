import React from 'react'

export default function Description({ toggleDescriptionState, locationData, onInputChange }) {
    return (
        toggleDescriptionState && (
            <div className="w-full mt-2">
                <textarea
                    className="border py-2 px-3 text-grey-darkest border-grey-200 w-full"
                    name="description"
                    id="description"
                    value={locationData.description || ''}
                    onChange={onInputChange}
                    placeholder="Description"
                />
            </div>
        )
    )
}
