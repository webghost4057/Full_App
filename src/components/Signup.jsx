import React, { useState } from 'react'
import authservices from '../appwrite/authentication'
import {Input} from './index'
import {useNavigate} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import{useDispatch} from 'react-redux'
import { login as authLogin } from '../store/authSlice'



const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register , handleSubmit} = useForm()
    const [err , setErr] = useState('')

    const Signup = async(data)=>{
        setErr('')
        try {
            const session = await authservices.createAccount(data)
            if(session){
                const UserData = await authservices.getCurrentUser()
                if(UserData) dispatch(authLogin(UserData))
                navigate('/')
            }
            
        } catch (error) {
            setErr(error.message)
        }
    }

  return (
    <>
        <div>SignUP</div>
        
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        login
                    </Link>
        </p>
        {err && <p className="text-red-600 mt-8 text-center">{err}</p>}

        <form onSubmit={handleSubmit(Signup)}>
        <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
        <Input
                label="Full Name: "
                placeholder="Enter your Full Name "
                type="text"
                {...register("name", {
                    required: true,
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <button type='submit'>Create Account</button>
          

        </form>
        </>
  )
}

export default Signup