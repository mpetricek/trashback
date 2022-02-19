import React, { useEffect, useState, useContext } from 'react'
import Button from '../Button'
import { TrashbackContext } from '../TrashbackContext'

import Description from './Description'
import DescriptionToggler from './DescriptionToggler'
import Location from './Location'
import LocationMap from './LocationMap'
import LocationToggler from './LocationToggler'
import Photo from './Photo'

import Pollution from './Pollution'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function AddLocation() {
    const [LocationInputType, setLocationInputType] = useState('user')
    const [toggleDescriptionState, setToggleDescriptionState] = useState(false)
    const [toggleMapState, setToggleMapState] = useState(false)
    const { trashbackData, setTrashbackData } = useContext(TrashbackContext)

    const onInputChange = (e) => {
        const { value, name } = e.target
        setTrashbackData({ ...trashbackData, [name]: value })
    }
    const onSubmit = async (e, cleaned?) => {
        e.preventDefault()
        const { place, country_code, type, description, location } = trashbackData
        await fetch('/api/entry', {
            method: 'POST',
            body: JSON.stringify({
                place: place,
                type,
                country_code: country_code,
                description: description,
                location: location,
                cleaned: cleaned,
            }),
            credentials: 'include',
            headers: {
                accept: 'application/json',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
            },
        })
    }

    const toggleModal = (e) => {
        e.preventDefault()
        setTrashbackData({ ...trashbackData, addLocation: !trashbackData.addLocation })
    }

    const toggleLocationInputType = (e, type, location) => {
        e.preventDefault()
        setLocationInputType(type)
        setTrashbackData({ ...trashbackData, location: location })
    }

    const toggleDescription = (e) => {
        e.preventDefault()
        setToggleDescriptionState(!toggleDescriptionState)
    }
    const toggleMap = (e) => {
        e.preventDefault()
        setToggleMapState(!toggleMapState)
    }
    useEffect(() => {
        console.log(trashbackData)
    }, [trashbackData])

    return (
        <section>
            <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold p-3 lg:py-2 lg:pr-4  rounded-full inline-flex items-center fixed bottom-4 right-4 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={(e) => toggleModal(e)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 lg:mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="hidden lg:inline-block">Add Location</span>
            </button>

            <div
                className={`fixed z-30 inset-0 overflow-y-auto ${trashbackData.addLocation ? 'visible' : 'invisible'}`}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block sm:p-0">
                    <div
                        className={`fixed inset-0 transition-opacity ${
                            trashbackData.addLocation ? 'opacity-100' : 'opacity-0'
                        }`}
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <div
                        className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full ${
                            trashbackData.addLocation
                                ? 'opacity-100 translate-y-0 sm:scale-100'
                                : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        }
                        ${toggleMapState ? 'sm:max-w-5xl' : 'sm:max-w-lg'}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="relative flex">
                            <form action="/" method="post" className={`flex-1 `}>
                                <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex w-full items-center justify-center">
                                    <h1 className="block text-center text-gray-600 font-bold">Add trash location</h1>
                                    <button
                                        className="text-green-500 hover:text-green-600 absolute right-4 top-3 z-10"
                                        onClick={(e) => toggleModal(e)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            className="w-6 h-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="mb-4">
                                        <Location locationData={trashbackData} />
                                        <Pollution />
                                        <div className="flex flex-wrap">
                                            <hr className="flex-auto w-full mb-5" />
                                            <Photo />
                                            <DescriptionToggler toggleDescription={toggleDescription} />
                                            <LocationToggler toggleMap={toggleMap} />
                                            <hr className="flex-auto w-full mt-5" />
                                        </div>

                                        <Description
                                            toggleDescriptionState={toggleDescriptionState}
                                            locationData={trashbackData}
                                            onInputChange={onInputChange}
                                        />

                                        {/* <div className="flex flex-col mb-4 w-full">
                                            <label
                                                className="mb-2 uppercase font-bold text-lg text-grey-darkest "
                                                htmlFor="location"
                                            >
                                                Location
                                            </label>

                                            <div className="flex items-center">
                                                <button
                                                    className={` px-3 rounded py-2 border  font-medium ${
                                                        LocationInputType === 'user'
                                                            ? 'border-green-500 text-green-500'
                                                            : 'border-gray-400 text-gray-400'
                                                    }`}
                                                    onClick={(e) =>
                                                        toggleLocationInputType(e, 'user', trashbackData.userLocation)
                                                    }
                                                >
                                                    Use my location
                                                </button>
                                                <button
                                                    className={` px-3 rounded py-2 border  font-medium ml-2 ${
                                                        LocationInputType === 'pinpoint'
                                                            ? 'border-green-500 text-green-500'
                                                            : 'border-gray-400 text-gray-400'
                                                    }`}
                                                    onClick={(e) => toggleLocationInputType(e, 'pinpoint', '')}
                                                >
                                                    Pinpoint location
                                                </button>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <Button onClick={(e) => onSubmit(e, true)} className="sm:ml-3" purple>
                                        <FontAwesomeIcon icon={solid('heart')} className="w-5 h-5 mr-2" />
                                        I've cleaned it
                                    </Button>
                                    <Button onClick={(e) => onSubmit(e)} green className="sm:ml-3 mt-3 sm:mt-0 " submit>
                                        Add location
                                    </Button>
                                    <Button onClick={(e) => toggleModal(e)} className=" mt-3 sm:mt-0">
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                            <LocationMap toggleMapState={toggleMapState} toggleMap={toggleMap} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
