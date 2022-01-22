import React from "react"
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { logout } from "../../store/authSession"

export const LogoutButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleOnClick = async() => {
        await dispatch(logout())
        history.push('/')
    }

    return (
        <button 
            type="button"
            title="LogOut"
            onClick={handleOnClick} 
            >
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
            </svg>
        </button> 
    )
}