import React  from "react";
import { Link } from "react-router-dom";


const SplashPage = () => {

    return (
        <div>
            <div className="splash-page">
                {/* logo */}
                <div className="login-container">
                    login..
                    <div className="signup-container">
                        <p className="dontAccount">Don't have an account?</p>
                        <Link to={'/signup'} className="register">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            {/* footer */}
        </div>
    )
}

export default SplashPage