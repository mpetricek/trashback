import React, { useEffect, useState } from 'react'
import { LocationContext } from './LocationContext'
import Map from './Map'
import Nouislider from 'nouislider-react'
import 'nouislider/distribute/nouislider.css'

export default function AddLocation() {
    const [LocationInputType, setLocationInputType] = useState('user')
    const [toggleDescriptionState, setToggleDescriptionState] = useState(false)
    const { locationData, setLocationData } = React.useContext(LocationContext)

    const onChange = (e) => {
        const { value, name } = e.target
        setLocationData({ ...locationData, [name]: value })
    }
    const onSubmit = async (e, cleaned?) => {
        e.preventDefault()
        const { place, country_code, type, description, location } = locationData
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
        setLocationData({ ...locationData, addLocation: !locationData.addLocation })
    }

    const toggleLocationInputType = (e, type, location) => {
        e.preventDefault()
        setLocationInputType(type)
        setLocationData({ ...locationData, location: location })
    }

    const toggleDescription = (e) => {
        e.preventDefault()
        setToggleDescriptionState(!toggleDescriptionState)
    }

    useEffect(() => {
        console.log(locationData)
    }, [locationData])

    const updatePips = (value) => {
        console.log(value)
        let label
        switch (true) {
            case value === 1:
                label = 'Light'
                break
        }
        return label
    }

    return (
        <section>
            <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold p-3 lg:py-2 lg:pr-4  rounded-full inline-flex items-center fixed bottom-4 right-4"
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

            <div className={`fixed z-30 inset-0 overflow-y-auto ${locationData.addLocation ? 'visible' : 'invisible'}`}>
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center block sm:p-0">
                    <div
                        className={`fixed inset-0 transition-opacity ${
                            locationData.addLocation ? 'opacity-100' : 'opacity-0'
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
                            locationData.addLocation
                                ? 'opacity-100 translate-y-0 sm:scale-100'
                                : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        }
                        ${LocationInputType === 'pinpoint' ? 'sm:max-w-5xl' : 'sm:max-w-lg'}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="relative">
                            <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex w-full items-center">
                                <h1 className="block w-full text-center text-gray-600 font-bold">Add trash location</h1>
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
                            <form action="/" method="post" className={`flex-1 `}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="mb-4 flex flex-wrap md:justify-between">
                                        <div className="mb-4 flex-0 w-full">
                                            <p className="flex items-center text-lg uppercase tracking-wide font-bold ">
                                                <span className="text-green-500 mr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>{' '}
                                                {locationData.place}
                                            </p>

                                            {/* <input
                                                className="border border-grey-200 py-2 px-3 text-grey-darkest"
                                                type="text"
                                                name="title"
                                                id="title"
                                                value={locationData.title || ''}
                                                onChange={onChange}
                                            /> */}
                                            <hr className="mt-2" />
                                        </div>

                                        <div className="flex flex-col mb-12 w-full">
                                            <p className="flex items-center text-lg uppercase tracking-wide font-bold mb-2">
                                                <span className="text-green-500 mr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clip-rule="evenodd"
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
                                        <div className="flex-0">
                                            <label className="relative block cursor-pointer">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    capture="environment"
                                                    className="absolute opacity-0 inset-0 box-border w-full cursor-pointer"
                                                />
                                                <span className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full block relative mr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        className="w-5 h-5"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                            </label>
                                        </div>
                                        <div className="flex-0">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full mr-2"
                                                onClick={(e) => toggleDescription(e)}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="flex-0">
                                            <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex font-bold text-sm pr-3">
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
                                        <hr className="mt-2" />
                                        {toggleDescriptionState && (
                                            <div className="w-full mt-2">
                                                <textarea
                                                    className="border py-2 px-3 text-grey-darkest border-grey-200 w-full"
                                                    name="description"
                                                    id="description"
                                                    value={locationData.description || ''}
                                                    onChange={onChange}
                                                    placeholder="Description"
                                                />
                                            </div>
                                        )}
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
                                                        toggleLocationInputType(e, 'user', locationData.userLocation)
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
                                    <button
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        type="submit"
                                        onClick={(e) => onSubmit(e, true)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5 mr-2"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        I've cleaned it
                                    </button>
                                    <button
                                        className="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        type="submit"
                                        onClick={(e) => onSubmit(e)}
                                    >
                                        Add location
                                    </button>
                                    <button
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={(e) => toggleModal(e)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                            {LocationInputType === 'pinpoint' && (
                                <div className="flex-auto w-full absolute inset-0 sm:w-3/12 flex-grow-1 sm:relative z-0 ">
                                    <Map style={{ width: '100%', height: '100%' }} addMarker className="z-0" />
                                    <button
                                        className="left-0 right-0 absolute bottom-40 mx-auto bg-green-500 hover:bg-green-600 font-medium text-white px-4 py-2 shadow-sm rounded-md"
                                        onClick={(e) => toggleLocationInputType(e, 'pinpoint', locationData.location)}
                                    >
                                        Set location
                                    </button>
                                    <button
                                        className="left-0 right-0 absolute bottom-24 mx-auto bg-white hover:bg-white font-medium text-black px-4 py-2 shadow-sm rounded-md"
                                        onClick={(e) => toggleLocationInputType(e, 'user', '')}
                                    >
                                        Back
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
