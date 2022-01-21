import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserService } from '../../common/UserService';


export const UsersList = () => {
    const [users, setUsers] = useState({});

    useEffect(() => {
        async function fetchUsers() {
            const response = await(new UserService()).users()
            if (response.ok) {
                const responseData = await response.json()
                setUsers(responseData.users)
            }

        }
        fetchUsers()
    }, [])

    const usersComponent = Object.entries(users).map(([key, user]) => {
        return(
            <li className='list-group-item' key={user.id}>
                <NavLink to={`/users/${user.id}`} className='list-group-item list-group-item-actio'>{user.username}</NavLink>
            </li>
        )
    })

    return (
        <div className="main">
            <div className="container">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style={{width: 480}}>
                    <h2>User list: </h2>
                    <ul className='list-group list-group-flush'>
                        {usersComponent}
                    </ul>
                </div>
            </div>
        </div>
    )
}