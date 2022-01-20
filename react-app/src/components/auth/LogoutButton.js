import React from "react"
import { BoxArrowRight } from "react-bootstrap-icons"
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom"
import { logout } from "../../store/session"

export const LogoutButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleOnClick = async() => {
        await dispatch(logout())
        history.push('/')
    }

    return (
        <button className="nav-link" onClick={handleOnClick} ><BoxArrowRight /></button> 
    )
}