import React from "react"
import { AppIndicator, Upload } from 'react-bootstrap-icons';
import { Link } from "react-router-dom"
import { LogoutButton } from "../auth/LogoutButton";

export const Header = () => {
    return(
        <div className="container">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <AppIndicator className="me-2" width="40" height="32"/>
                    <span className="fs-4">Insta</span>
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item"><Link to={"/"} className="nav-link active" aria-current="page">Home</Link></li>
                    <li className="nav-item"><Link to={"/"} className="nav-link"><Upload /></Link></li>
                    <li className="nav-item"><LogoutButton /></li>
                </ul>
            </header>
        </div>
    )
}