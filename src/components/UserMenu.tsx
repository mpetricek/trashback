import React, { useState, useEffect, useContext } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { TrashbackContext } from './TrashbackContext'
type User = {
    data: {
        user?: {
            image: string
            name: string
            email: string
        }
    }
}
export default function Component() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { data: session } = useSession() as User
    const { trashbackData, setTrashbackData } = useContext(TrashbackContext)
    useEffect(() => {
        if (session) {
            setTrashbackData({ ...trashbackData, userEmail: session.user.email })
        }
        console.log(session)
    }, [session])

    const rows = session && [
        {
            title: <FontAwesomeIcon icon={solid('user')} className="w-4 h-4 mr-2 text-green-500" />,
            content: session.user.name,
        },
        {
            title: <FontAwesomeIcon icon={solid('envelope')} className="w-4 h-4 mr-2 text-green-500" />,
            content: session.user.email,
        },
        {
            title: <b>Reported places:</b>,
            content: 123,
        },
        {
            title: <b>Cleaned places:</b>,
            content: 123,
        },
        {
            title: <b>Points:</b>,
            content: 123,
        },
    ]

    const LogoutButton = () => (
        <button onClick={() => signOut()} className="text-green-500 flex items-center text-sm ml-auto mt-2">
            Sign out <FontAwesomeIcon icon={solid('right-from-bracket')} className="w-4 h-4 ml-2" />
        </button>
    )
    const LoginButton = () => (
        <button
            onClick={() => signIn()}
            className="bg-white shadow-md rounded-full h-11 w-11 overflow-hidden p-1 flex items-center justify-center"
        >
            <FontAwesomeIcon icon={solid('right-to-bracket')} className="w-5 h-5 text-green-500" />
        </button>
    )
    return (
        <div className="fixed top-6 right-20 z-20">
            {session ? (
                <>
                    <button
                        className="bg-white shadow-md rounded-full h-11 w-11 overflow-hidden p-1"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <img
                            src={session.user.image}
                            alt={session.user.name}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </button>
                    {menuOpen && (
                        <div className="bg-white rounded-2xl shadow-md  fixed left-3 right-3 top-20 overflow-hidden md:w-72 md:left-auto">
                            <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex w-full items-center justify-center">
                                <h1 className="block text-center text-gray-600 font-bold">User Menu</h1>
                            </div>
                            <div className="py-3 px-4">
                                {rows.map((row) => (
                                    <h4 className="flex items-center border-b border-gray-100 py-2">
                                        {row.title}&nbsp;{row.content}
                                    </h4>
                                ))}
                                <LogoutButton />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <LoginButton />
            )}
        </div>
    )
}
