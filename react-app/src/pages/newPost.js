import React, {useState} from "react";
import { Header } from "../components/header";
import { useDispatch } from 'react-redux'
import { newPost } from "../store/postSession";


const NewPost = () => {
    const dispatch = useDispatch()
    const [fields, setFields] = useState({
        'caption': '',
        'photoUrl': '',
    })
    const [errors, setErrors] = useState({})
    const [isImage, setIsImage] = useState(false)
    const isInvalid = fields['caption'] === '' || fields['photoUrl'] === '';

    const handleField = (field, event) => {
        setFields((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const data = await dispatch(newPost(fields))

    }

    return (
        <div className="bg-gray-background">
            <Header />
            <div className="mx-auto max-w-screen-lg">
                <div className="items-center w-3/5">
                    <h1 className="w-full text-center py-2 ">Create A Post</h1>

                    {errors.global && <p className="mb-4 text-xs text-red-primary">{errors.global}</p>}

                    <form onSubmit={handleSubmit}>
                        <textarea
                                rows="5"
                                cols="30"
                                aria-label="Title"
                                placeholder="Title"
                                className="text-sm text-gray-base w-full mr-3 py-2 px-4 border border-gray-primary rounded mb-2"
                                onChange={handleField.bind(this, 'caption')}
                                value={fields['caption']}
                                />
                            {errors.caption && <p className="mb-4 text-xs text-red-primary">{errors.caption}</p>}

                        <input
                                aria-label="Image URL"
                                type="text"
                                placeholder="Image URL"
                                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                onChange={handleField.bind(this, 'photoUrl')}
                                value={fields['photoUrl']}
                                />
                            {errors.photoUrl && <p className="mb-4 text-xs text-red-primary">{errors.photoUrl}</p>}

                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                                ${isInvalid && 'opacity-50'}`}
                            >
                            Submit
                        </button>

                    </form>

                    <img src={fields['photoUrl']} alt="post"  hidden={true} onLoad={() =>
                        setIsImage(true)
                        }/>

                </div>
            </div>
        </div>
    )
}

export default NewPost