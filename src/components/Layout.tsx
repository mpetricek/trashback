import React from 'react'
import AddLocation from './AddLocation'
import Head from 'next/head'
import { TrashbackProvider } from './TrashbackContext'
import Header from './Header'
export default function Layout({ children }) {
    return (
        <TrashbackProvider>
            <Head>
                <script src="https://apis.google.com/js/platform.js" async defer />
                <meta
                    name="google-signin-client_id"
                    content="208676231093-aso8g2o4cug6qbgc0hmommai7vgjj1in.apps.googleusercontent.com"
                />
            </Head>
            <Header />
            <main className="relative z-0">{children}</main>
            <AddLocation />
        </TrashbackProvider>
    )
}
