import React, {useEffect} from "react"
import { useSelector } from 'react-redux'


const Dashboard = () => {
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        document.title = 'Insta';
      }, []);

    return(
        <div className="bg-gray-background">
            Header
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                Timeline<br/>
                Sidebar<br />
            </div>
        </div>
    )
}

export default Dashboard