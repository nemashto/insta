import React from "react"
import { AppIndicator } from 'react-bootstrap-icons';

export const Header = () => {
    return(
        <div className="className">
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                    <AppIndicator className="me-2" width="40" height="32"/>
                    <span className="fs-4">Simple header</span>
                </a>
            </header>
        </div>
    )
}