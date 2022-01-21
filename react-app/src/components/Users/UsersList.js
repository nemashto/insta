import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserService } from '../../common/UserService';


export const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const response = (new UserService()).users()
        }
        fetchUsers()
    })


    return (
        <div className="main">
            <div className="container">
                <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white" style={{width: '480;'}}>
                    
                </div>
            </div>
        </div>
    )
}