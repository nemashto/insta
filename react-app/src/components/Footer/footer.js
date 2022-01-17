import React from "react"

const Footer = () => {

    return(
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex align-items-right justify-content-end ">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"></link>
                    <p className="theDevs">Created By: </p>
                    <a href="https://github.com/nemashto">
                        <i className="devicon-github-original"></i>
                    </a>
                    <p>nemashto</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer