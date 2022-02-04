import React, {useState, useEffect}  from "react"
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from "../common/AuthService";
import { useUserContext } from "../hooks/userContext";

const Login = () => {
    const navigate = useNavigate()

    const [fields, setFields] = useState({
        'email': '',
        'password': '',
    })
    const [errors, setErrors] = useState({})
    const { userChange } = useUserContext()
    const isInvalid = fields['password'] === '' || fields['email'] === '';

    useEffect(() => {
        document.title = 'Login - Instagram';
        setErrors({})
        setFields({
            'email': '',
            'password': '',
        })
    },[])

    const handleField = (field, event) => {
        setFields((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await (new AuthService()).login(fields)
        if (response.errors) {
            setErrors(response.errors)
        } else {
            userChange(response)
            setErrors({})
            navigate('/')
        }
    }


    return (
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
                            aria-label="Enter your email address"
                            type="text"
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
                        {errors.password && <p className="mb-4 text-xs text-red-primary">{errors.password}</p>}
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                                ${isInvalid && 'opacity-50'}`}
                            >
                            Login
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Don't have an account?{` `}
                        <Link to={'/signup'} className="font-bold text-blue-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login