import React, { useEffect } from 'react'
import AddLocation from './AddLocation'
import { LocationProvider } from './LocationContext'
import Header from './Header'
export default function Layout({ children }) {
    return (
        <React.Fragment>
            <LocationProvider>
                <Header />
                <main className="relative z-0">{children}</main>
                <AddLocation />
            </LocationProvider>
        </React.Fragment>
    )
}
