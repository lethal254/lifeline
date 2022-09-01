import React from "react"
import Layout from "../components/Layout"
import { LockClosedIcon, MailIcon, UserIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { useContext } from "react"
import { Context } from "../context/index"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Login = () => {
  const [email, setEmail] = useState("benardogutu65@gmail.com")
  const [password, setPassword] = useState("duraqueman5")

  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push(`/dashboard/${user?._id}`)
    }
  }, [user])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
      })
      if (data) {
        dispatch({ type: "LOGIN", payload: data })
        window.localStorage.setItem("user", JSON.stringify(data))
        toast.success("Login successful")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <Layout>
      <div className='w-[100%] h-[80vh]  flex items-center justify-center flex-col'>
        {/* Signup box */}
        <div className='w-[60%] min-h-[70%] bg-white rounded-sm shadow-md flex flex-col items-center justify-center'>
          <h3 className='font-bold text-3xl  text-secondary mx-auto'>
            <span className='text-primary'>Welcome</span> Back
          </h3>
          <p className='mt-4 mb-4 text-secondary'>
            Enter your credentials to access your account
          </p>
          <form className='w-[70%] flex flex-col ' onSubmit={handleLogin}>
            <div className='border w-[100%] mb-4 flex items-center py-3 px-2 border-gray rounded-md'>
              <MailIcon className='h-8 mr-4 text-primary' />
              <input
                type='email'
                className='w-full h-[100%] border-0 outline-none'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='border w-[100%] mb-4 flex items-center py-3 px-2 border-gray rounded-md'>
              <LockClosedIcon className='h-8 mr-4 text-primary' />
              <input
                type='password'
                className='w-full h-[100%] border-0 outline-none'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className=' px-4 py-3 bg-primary text-white rounded-md hover:bg-opacity-80 transition-all duration-150'>
              Submit
            </button>
            <p className=' mt-4 mb-4 text-center text-secondary'>or</p>
            <Link href='/signup'>
              <a className='mt-6 text-primary font-medium text-center'>
                Signup
              </a>
            </Link>
          </form>
        </div>

        {/* Signup Link */}
        <Link href='/forgot-password'>
          <a className='mt-6 text-secondary font-medium'>
            Forgot your password?
            <span className='text-primary'> Reset password</span>
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default Login

export const getServerSideProps = async ({ req, res }) => {
  return {
    props: {
      token: "none",
    },
  }
}
