import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function List() {
    const [entries, setEntries] = useState([])
    useEffect(() => {
        const fetchEntries = async () => {
            await fetch('/api/entries', { method: 'GET' })
                .then((res) => res.json())
                .then((json) => setEntries(json.entriesData))
        }
        fetchEntries()
    }, [])
    console.log(entries)
    return (
        <div>
            <h1>Entries</h1>
            {entries.map((entry) => (
                <div key={entry.id}>
                    <Link href={`/admin/edit/${entry.id}`}>
                        <a>{entry.title}</a>
                    </Link>
                    <br />
                </div>
            ))}
        </div>
    )
}
