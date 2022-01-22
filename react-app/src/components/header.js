import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { LogoutButton } from "./auth/LogoutButton";


export const Header = () => {
    const user = useSelector(state => state.session.user)

    return(
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to={'/'} aria-label="Instagram logo">
                                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12" />
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">
                        {user ? (
                            <>
                                <Link to={'/'} aria-label="Dashboard">
                                    <svg
                                        className="w-8 mr-6 text-black-light cursor-pointer"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </Link>

                                <LogoutButton />

                                <Link to={'/'} aria-label="Dashboard">
                                    profile
                                </Link>

                            </>
                        ):(
                            <>
                                <Link to={'/'}>
                                    <button
                                        type="button"
                                        className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                    >
                                        Log In
                                    </button>
                                </Link>
                                <Link to={'/'}>
                                    <button
                                        type="button"
                                        className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}