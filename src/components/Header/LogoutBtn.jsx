import React from 'react'
import { useDispatch } from 'react-redux';
import {logout} from '../../store/authSlice'
import authservices from '../../appwrite/authentication';
const LogoutBtn = () => {

    const dispatch = useDispatch()
    const logoutHandler = ()=>{
        authservices.logout()
        .then(()=>{
            dispatch(logout())
        })
        .catch((err)=>{
            console.log("Found Error : ",err);

        })
    }
    return (
        <button onClick={logoutHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300 ease-in-out">
            Logout
        </button>

    )
}

export default LogoutBtn