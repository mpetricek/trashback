import Link from 'next/link'
import React from 'react'
import { Logo } from './Icons'
import UserMenu from './UserMenu'
export default function Header() {
    return (
        <header>
            <nav>
                <div>
                    <Link href="/">
                        <a className="text-white bg-white rounded-full p-5 py-2 shadow-md z-20 fixed top-6 left-6">
                            <Logo className="h-7" />
                        </a>
                    </Link>

                    <UserMenu />
                </div>
                <div className="block z-20 fixed top-6 right-6">
                    <button className="flex items-center p-3 bg-white shadow-md rounded-full text-green-500 hover:text-green-600">
                        <svg className="h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </nav>
        </header>
    )
}
