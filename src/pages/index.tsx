import Head from 'next/head'
import Map from '../components/Map'
export default function Home() {
    return (
        <div>
            <Head>
                <title>TrashBack App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Map style={{ width: '100%', height: '100vh' }} />
        </div>
    )
}
