import Head from 'next/head'
import { useState } from 'react'
import Loader from '../components/Loader'
import Map from '../components/Map'
export default function Home() {
    const [mapLoading, setMapLoading] = useState(true)
    return (
        <div>
            <Head>
                <title>TrashBack App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Map style={{ width: '100%', height: '100vh' }} setMapLoaded={() => setMapLoading(false)} />
            {mapLoading && (
                <div className="fixed z-50 inset-0 bg-gray-100 flex items-center justify-center">
                    <Loader />
                </div>
            )}
        </div>
    )
}
