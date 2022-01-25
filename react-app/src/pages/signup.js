import React, {useState, useEffect, useRef}  from "react"
import { Link, Redirect } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { signUpAction } from '../state/authSlice'

const SignUp = () => {
    const componentMounted = useRef(true);
    const [fields, setFields] = useState({
        'username': '',
        'email': '',
        'password': '',
        'passwordRepeat': ''
    })
    const [errors, setErrors] = useState({})
    const isInvalid = fields['password'] === '' || fields['email'] === '';

    useEffect(() => {
        document.title = 'Sign Up - Instagram'
        setErrors({})
        setFields({
            'username': '',
            'email': '',
            'password': '',
            'passwordRepeat': ''
        })
        return (
            componentMounted.current = false
        )
    },[])

    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const handleField = (field, event) => {
        setFields((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const password = fields['password']
        const passwordRepeat = fields['passwordRepeat']

        if (password === passwordRepeat) {
            const data = await dispatch(signUpAction(fields))
            if (data) {
                setErrors(data)
            } else {
                setErrors({})
            }
        } else {
            setErrors({"password":"Password must match Repeat Password"})
        }
    }

    if (user) {
        return <Redirect to='/' />
    }

    return(
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                    </h1>

                    {errors.global && <p className="mb-4 text-xs text-red-primary">{errors.global}</p>}

                    <form onSubmit={handleSubmit}>
                        <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={handleField.bind(this, 'username')}
                            value={fields['username']}
                            />
                        <input
                            aria-label="Enter your email address"
                            type="email"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={handleField.bind(this, 'email')}
                            value={fields['email']}
                            />
                        {errors.email && <p className="mb-4 text-xs text-red-primary">{errors.email}</p>}
                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={handleField.bind(this, 'password')}
                            value={fields['password']}
                            />
                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password again"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={handleField.bind(this, 'passwordRepeat')}
                            value={fields['passwordRepeat']}
                            />
                        {errors.password && <p className="mb-4 text-xs text-red-primary">{errors.password}</p>}
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                            ${isInvalid && 'opacity-50'}`}
                            >
                            Sign Up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to={'/login'} className="font-bold text-blue-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp