import { useContext } from "react"
import { UserContext } from "../context/userContext"


export const useUserContext = () => {
    const context = useContext(UserContext)

    if (context === undefined) {
        throw new Error("useUserContext was used outside of its Provider")
    }

    return context
}