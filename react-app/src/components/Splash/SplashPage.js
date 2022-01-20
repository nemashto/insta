import React  from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'


const SplashPage = () => {
    const user = useSelector(state => state.session.user)

    if (user) {
        return <Redirect to='/feed' />
    }

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
        </div>
    )
}

export default SplashPage