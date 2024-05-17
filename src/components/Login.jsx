import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Input } from './index'
import services from '../appwrite/config'
import authservices from '../appwrite/authentication'
import { login as authLogin } from '../store/authSlice'
import { useForm } from 'react-hook-form'
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [err, setErr] = useState('')

    const login = async (data) => {
        setErr('')
        try {
            const session = await authservices.login(data)
            if (session) {
                const userData = await authservices.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            }

        } catch (error) {
            setErr(error)

        }


    }
    return (
        <>
        <div>Login</div>
        
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {err && <p className="text-red-600 mt-8 text-center">{err}</p>}

        <form onSubmit={handleSubmit(login)}>
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
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <button type='submit'>SignIn</button>
          

        </form>
        </>
    )
}

export default Login