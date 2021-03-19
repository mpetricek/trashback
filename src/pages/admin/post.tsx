import { useState } from 'react'
import dashify from 'dashify'

export default function Post() {
    const [content, setContent] = useState({
        title: undefined,
        type: undefined,
        description: undefined,
        location: undefined,
    })

    const onChange = (e) => {
        const { value, name } = e.target
        setContent((prevState) => ({ ...prevState, [name]: value }))
    }
    const onSubmit = async () => {
        const { title, type, description } = content
        await fetch('/api/entry', {
            method: 'POST',
            body: JSON.stringify({ title: title, slug: dashify(title), type, description, location }),
            credentials: 'include',
            headers: {
                accept: 'application/json',
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
            },
        })
    }
    return (
        <div>
            <div className="flex items-center h-screen w-full bg-green-400">
                <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                    <h1 className="block w-full text-center text-grey-darkest mb-6">Add trash location</h1>
                    <form className="mb-4 md:flex md:flex-wrap md:justify-between" action="/" method="post">
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
                                value={content.title}
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
                                value={content.type}
                                onChange={onChange}
                            >
                                <option value="light">Light pollution</option>
                                <option value="medium">Medium pollution</option>
                                <option value="high">Heavy pollution</option>
                            </select>
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                className="border py-2 px-3 text-grey-darkest border-grey-200"
                                name="description"
                                id="description"
                                value={content.description}
                                onChange={onChange}
                            />
                        </div>
                        <div className="flex flex-col mb-4 w-full">
                            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest " htmlFor="location">
                                Location
                            </label>

                            <div className="flex items-center">
                                <input type="radio" value="user-location" id="user-location" name="location" />
                                <label htmlFor="user-location" className="uppercase font-bold ml-2 text-grey-500">
                                    Use my location
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" value="pinpoint" id="pinpoint" name="location" />
                                <label htmlFor="pinpoint" className="uppercase font-bold ml-2 text-grey-500">
                                    Pinpoint location
                                </label>
                            </div>
                        </div>
                        <button
                            className="block bg-green-500 hover:bg-green-600 text-white uppercase text-lg mx-auto p-4 rounded"
                            type="submit"
                            onClick={onSubmit}
                        >
                            Add location
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
