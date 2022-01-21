import React, {useState, useEffect}  from "react"
import { useDispatch } from 'react-redux'
import { login } from "../../store/authSession"

export const LoginForm = () => {
    const [fields, setFields] = useState({
        'email': '',
        'password': '',
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        setErrors({})
        setFields({
            'email': '',
            'password': '',
        })
    },[])

    const dispatch = useDispatch()

    const handleField = (field, event) => {
        setFields((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await dispatch(login(fields))
            if (response) {
                setErrors(response)
            } else {
                setErrors({})
            }
    }


    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="splashImg"></div>  

                        <div className="container">
                            <form onSubmit={handleSubmit}>
                                <div className="row omb_row-sm-offset-3">
                                    <div className="col-3"></div>
                                    <div className="col-xs-12 col-sm-6 text-center">

                                        <h1 className="appName">The Insta</h1>
                                        <h6 className="appTagline"> ..like instagram project</h6>

                                        <div className="container">
                                            {errors.global &&
                                                <div className="py-1 my-1 alert alert-danger">
                                                    {errors.global}
                                                </div>
                                            }
                                        </div>

                                        <div className="form-group py-1">
                                            <input
                                                className="form-control"
                                                type='text'
                                                name='email'
                                                onChange={handleField.bind(this, 'email')}
                                                value={fields['email']}
                                                placeholder='Email'
                                            ></input>
                                            {errors.username && 
                                                <div className="py-1 my-1 alert alert-danger">
                                                    {errors.email}
                                                </div>    
                                            }
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
        
                                            {errors.password && 
                                                <div className="py-1 my-1 alert alert-danger">
                                                    {errors.password}
                                                </div>    
                                            }
                                        </div>

                                        <div className="form-group py-1">
                                            <button type='submit' className="btn btn-primary btn-lg btn-block">Login</button>
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