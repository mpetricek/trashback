import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Admin() {
    const [locations, setLocations] = useState([])
    useEffect(() => {
        const fetchEntries = async () => {
            await fetch('/api/entries', { method: 'GET' })
                .then((res) => res.json())
                .then((json) => setLocations(json.entriesData))
        }
        fetchEntries()
    }, [])
    return (
        <div className="container mx-auto p-4">
            <h1 className="font-sans text-2xl font-bold text-grey-darkest uppercase my-2">Hello user</h1>
            <h2 className="font-sans text-2xl font-bold text-grey-darkest uppercase my-2">Locations</h2>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-5">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Title
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Type
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Location
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {locations.map((location) => (
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">{location.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{location.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap">Cleaned</td>
                                <td className="px-6 py-4 whitespace-nowrap">{location.description}</td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={`/admin/edit/${location.id}`}>
                                        <span>{location.location}</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
