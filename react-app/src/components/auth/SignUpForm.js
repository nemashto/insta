import React, {useState}  from "react"
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { signUp } from "../../store/session"

const SignUpForm = () => {

    const [fields, setFields] = useState({
        'username': '',
        'email': '',
        'password': '',
        'passwordRepeat': ''
    })
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    const handleField = (field, event) => {
        setFields((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const username = fields['username']
        const email = fields['email']
        const password = fields['password']
        const passwordRepeat = fields['passwordRepeat']

        if (password === passwordRepeat) {
            const data = await dispatch(signUp(fields))
            console.log(data)
            if (data === 200) {
                setErrors([])
                console.log("registred")
            } else if (data) {
                setErrors(data)
            } else {
                setErrors(["no data"])
            }
        } else {
            setErrors(["Password must match Repeat Password"])
        }
    }

    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="splashImg"></div>  

                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <div className="row omb_row-sm-offset-3">
                                    <div className="col-3"></div>
                                    <div className="col-xs-12 col-sm-6 text-center">

                                        <h1 className="appName">The insta</h1>
                                        <h6 className="appTagline"> ..like instagram project</h6>

                                        <div className="container">
                                            {errors.map((error, index) => (
                                                <div key={index} className="py-1 alert alert-danger">
                                                    {error}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="form-group py-1">
                                            <input
                                                className="form-control"
                                                type='text'
                                                name='username'
                                                onChange={handleField.bind(this, 'username')}
                                                value={fields['username']}
                                                placeholder='Username'
                                            ></input>
                                        </div>

                                        <div className="form-group py-1">
                                            <input
                                                className="form-control"
                                                type='email'
                                                name='email'
                                                onChange={handleField.bind(this, 'email')}
                                                value={fields['email']}
                                                placeholder='Email'
                                            ></input>
                                        </div>

                                        <div className="form-group py-1">
                                            <input
                                                className="form-control"
                                                type='password'
                                                name='password'
                                                onChange={handleField.bind(this, 'password')}
                                                value={fields['password']}
                                                placeholder='password'
                                            ></input>
                                        </div>

                                        <div className="form-group py-1">
                                            <input
                                                className="form-control"
                                                type='password'
                                                name='passwordRepeat'
                                                onChange={handleField.bind(this, 'passwordRepeat')}
                                                value={fields['passwordRepeat']}
                                                placeholder='password again'
                                            ></input>
                                        </div>

                                        <div className="form-group py-1">
                                            <button type='submit' className="btn btn-primary btn-lg btn-block">Sign Up</button>
                                        </div>

                                        <div className="container py-1">
                                            <p className="dontAccount">Already have an account?</p>
                                            <Link className="register" to={"/"}>Log in</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpForm