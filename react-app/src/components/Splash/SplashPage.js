import React  from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux'
import { LoginForm } from "../auth/LoginForm";


const SplashPage = () => {
    const user = useSelector(state => state.session.user)

    if (user) {
        return <Redirect to='/feed' />
    }

    return (
        <main>
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
                {/* logo */}
                <div className="col-md-5 p-lg-5 mx-auto my-5">
                <LoginForm />
                <div className="container">
                    <p className="">Don't have an account?</p>
                    <Link to={'/signup'} className="">
                        Sign up
                    </Link>
                </div>
                </div>
            </div>
        </main>
    )
}

export default SplashPage