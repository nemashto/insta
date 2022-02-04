import {useEffect, useState} from 'react';
import { AuthService } from '../common/AuthService';

export const useAuthListener = () => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
  
    useEffect(() => {
      const authService = async () => {
        const response = await (new AuthService()).authenticate()
        const data = await response.json()
        return data
      }
      const response = authService()
      response.then((res) => {
        setUser(res)
        setLoader(false)
      })
    }, [setUser, setLoader])

    return {user, loader}
}