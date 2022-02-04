import React, { createContext, useState, useEffect, useMemo, useCallback } from "react"

import { AuthService } from '../common/AuthService'


const UserContext = createContext(null)

const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(true)

    const userChange = useCallback((data) => {
            setUser(data)
    }, [])

    useEffect(() => {
        const authService = async () => {
            const response = await (new AuthService()).authenticate()
            return response
          }
        const response = authService()
        response.then((res) => {
            setUser(res)
            setLoaded(false)
        })
    }, [setUser, setLoaded])

    const contextValue = useMemo(() => ({
        user,
        userChange,
        loaded,

    }), [user, userChange, loaded])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }

