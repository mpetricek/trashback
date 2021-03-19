import React, { useEffect, useState } from 'react'
import { LocationContext } from './LocationContext'
import Map from './Map'

export default function AddLocation() {
    const [LocationModal, setLocationModal] = useState(false)
    const [LocationInputType, setLocationInputType] = useState('user')

    const { locationData, setLocationData } = React.useContext(LocationContext)
    const [content, setContent] = useState({
        title: undefined,
        type: undefined,
        description: undefined,
        location: undefined,
    })

    const onChange = (e) => {
        const { value, name } = e.target
        setLocationData({ ...locationData, [name]: value })
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        const { title, type, description, location } = locationData
        await fetch('/api/entry', {
            method: 'POST',
            body: JSON.stringify({ title: title, slug: title, type, description: description, location: location }),
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
        setLocationModal(!LocationModal)
    }

    const toggleLocationInputType = (e, type, location) => {
        e.preventDefault()
        setLocationInputType(type)
        setLocationData({ ...locationData, location: location })
    }

    useEffect(() => {
        console.log(locationData)
    }, [locationData])
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

            <div className={`fixed z-30 inset-0 overflow-y-auto ${LocationModal ? 'visible' : 'invisible'}`}>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center block sm:p-0">
                    <div
                        className={`fixed inset-0 transition-opacity ${LocationModal ? 'opacity-100' : 'opacity-0'}`}
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <div
                        className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full ${
                            LocationModal
                                ? 'opacity-100 translate-y-0 sm:scale-100'
                                : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        }
                        ${LocationInputType === 'pinpoint' ? 'sm:max-w-5xl' : 'sm:max-w-lg'}`}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-headline"
                    >
                        <div className="flex relative">
                            <button
                                className="text-green-500 hover:text-green-600 absolute right-5 top-5 z-10"
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
                            <form action="/" method="post" className={`flex-1 `}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <h1 className="block w-full text-center text-grey-darkest mb-6">
                                        Add trash location
                                    </h1>
                                    <div className="mb-4 md:flex md:flex-wrap md:justify-between">
                                        <div className="flex flex-col mb-4 w-full">
                                            <label
                                                className="mb-2 uppercase tracking-wide font-bold text-lg text-grey-darkest"
                                                htmlFor="title"
                                            >
                                                Title
                                            </label>
                                            <input
                                                className="border border-grey-200 py-2 px-3 text-grey-darkest"
                                                type="text"
                                                name="title"
                                                id="title"
                                                value={locationData.title || ''}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="flex flex-col mb-4 w-full">
                                            <label
                                                className="mb-2 uppercase tracking-wide font-bold text-lg text-grey-darkest"
                                                htmlFor="type"
                                            >
                                                Type of pollution
                                            </label>
                                            <select
                                                id="type"
                                                name="type"
                                                className="border  border-grey-200 py-2 px-3 text-grey-darkest"
                                                value={locationData.type || ''}
                                                onChange={onChange}
                                            >
                                                <option value="light">Light pollution</option>
                                                <option value="medium">Medium pollution</option>
                                                <option value="high">Heavy pollution</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col mb-4 w-full">
                                            <label
                                                className="mb-2 uppercase font-bold text-lg text-grey-darkest"
                                                htmlFor="description"
                                            >
                                                Description
                                            </label>
                                            <textarea
                                                className="border py-2 px-3 text-grey-darkest border-grey-200"
                                                name="description"
                                                id="description"
                                                value={locationData.description || ''}
                                                onChange={onChange}
                                            />
                                        </div>
                                        <div className="flex flex-col mb-4 w-full">
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
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
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
