import React, { createContext, useState, useEffect, useMemo, useCallback } from "react"

import { AuthService } from '../common/AuthService'


const UserContext = createContext(null)

const UserContextProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(true)

    const logout = useCallback((data) => {
            setUser(data)
    }, [])

    useEffect(() => {
        const authService = async () => {
            const response = await (new AuthService()).authenticate()
            const data = await response.json()
            return data
          }
        const response = authService()
        response.then((res) => {
            setUser(res)
            setLoaded(false)
        })
    }, [setUser, setLoaded])

    const contextValue = useMemo(() => ({
        user,
        logout,
        loaded,

    }), [user, logout, loaded])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider }

